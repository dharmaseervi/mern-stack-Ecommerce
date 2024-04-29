'use client'
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useInstantSearch, useSearchBox, PoweredBy, Hits, } from 'react-instantsearch';
import { GlobalContext } from './GlobalContex';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

export default function CustomSearchBox(props) {
    const { query, refine } = useSearchBox(props);
    const { status } = useInstantSearch();
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef(null);
    const resultsRef = useRef(null);
    const searchContainerRef = useRef(null);
    const searchBarRef = useRef(null);
    const { isSearchOpen, setIsSearchOpen } = useContext(GlobalContext);
    const [product, setProduct] = useState([])
    const isSearchStalled = status === 'stalled';

    function setQuery(newQuery) {
        setInputValue(newQuery);
        refine(newQuery);
    }

    const toggleSearch = () => {
        // setIsSearchOpen(!isSearchOpen);

        gsap.fromTo(
            searchContainerRef.current,
            { y: '0%', height: '50vh' },
            { y: '-100%', height: '', duration: 0.5, ease: 'power2.inOut' }
        );
        gsap.fromTo(
            searchBarRef.current,
            { y: '-0%', height: 0 },
            { y: '-100%', height: '', duration: 0.3, ease: 'power2.inOut' }
        );

    };

    useGSAP(() => {
        gsap.fromTo(
            '.search-container',
            { y: '-100%', height: 0 },
            { y: '0%', height: '50vh', duration: 0.5, ease: 'power2.inOut' }
        );
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            '.search-bar',
            { y: '-100%', height: 0 },
            { y: '0%', height: '', duration: 1, ease: 'power2.inOut' }
        );
    }, []);
    useGSAP(() => {
        gsap.fromTo(
            '.product',
            { y: '-100%', height: 0 },
            { y: '0%', height: '', duration: 1, ease: 'power2.inOut' }
        );
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                resultsRef.current &&
                !resultsRef.current.contains(event.target) &&
                !event.target.closest('.search-bar')
            ) {
                setIsSearchOpen(false);
                setInputValue('');
            }
        }
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`/api/category?query=${'fashion'}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch category data');
                }
                const data = await response.json();
                // Filter items with the specified subcategory
                const filteredItems = data.filterData.filter(item => {
                    return item.subcategory.includes("clothing/lux");
                });
                setProduct(filteredItems);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);
    console.log(product);
    return (
        <div ref={searchContainerRef} className='search-container w-full  h-full xl:h-[70vh] left-0 top-0 bg-white p-4 absolute z-10'>
            <form
                ref={searchBarRef}
                className='w-5/6 mx-auto flex flex-col search-bar '
                action=''
                role='search'
                noValidate
                onClick={(event) => event.stopPropagation()}
                onSubmit={(event) => event.preventDefault()}
            >
                <div className='flex items-center gap-2 search-bar'>
                    <input
                        ref={inputRef}
                        autoComplete='#autocomplete'
                        autoCorrect='off'
                        autoCapitalize='off'
                        placeholder='Search for products'
                        spellCheck={false}
                        maxLength={512}
                        type='search'
                        value={inputValue}
                        onChange={(event) => {
                            setQuery(event.currentTarget.value);
                        }}
                        className={`flex-grow px-6 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent`}
                        autoFocus
                    />
                    <button onClick={toggleSearch} className='text-center border px-4 py-3 border-red-800 text-red-400 rounded'>
                        close
                    </button>
                </div>
                <PoweredBy hidden={inputValue.length} className='mt-3 w-24 h-24' />
            </form>

            {inputValue.length === 0 && (
                <div className='w-5/6 mx-auto grid xl:grid-cols-5 grid-cols-5  gap-3 product'>
                    {product.slice(0, 10).map((category) => (
                        <Link href={'/productoverview/' + category._id} key={category.id} className="lg:w-24 lg:h-24 w-16 h-16 flex justify-center items-center">
                            <img src={category?.photo?.[0]} alt={category.productname} className="object-cover w-full h-full rounded mix-bv" />
                        </Link>
                    ))}
                </div>
            )}

            <div
                ref={resultsRef}
                className={`w-5/6 mx-auto  bg-transparent `}
                style={{ maxHeight: 'calc(50vh - 100px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <EmptyQueryBoundary fallback={null}>
                    <Hits hitComponent={props.hit} />
                </EmptyQueryBoundary>
            </div>
        </div>
    );
}

function EmptyQueryBoundary({ children, fallback }) {
    const { indexUiState } = useInstantSearch();
    if (!indexUiState.query) {
        return fallback;
    }

    return children;
}
