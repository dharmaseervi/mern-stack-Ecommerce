'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useInstantSearch, useSearchBox, PoweredBy, Hits } from 'react-instantsearch';

export default function CustomSearchBox(props) {
    const { query, refine } = useSearchBox(props);
    const { status } = useInstantSearch();
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    const isSearchStalled = status === 'stalled';

    function setQuery(newQuery) {
        setInputValue(newQuery);
        refine(newQuery);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target) &&
                resultsRef.current && !resultsRef.current.contains(event.target)) {
                setInputValue('');
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                refine(inputValue);
            }
        }

        const buttonElement = document.querySelector('.reset-button');
        buttonElement.addEventListener('keydown', handleKeyDown);

        return () => {
            buttonElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue]);

    return (
        <div className="relative  ">
            <form
                className="relative flex gap-2 mb-2 "
                action=""
                role="search"
                noValidate
                onClick={(event) => event.stopPropagation()}
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    ref={inputRef}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Search for products"
                    spellCheck={false}
                    maxLength={512}
                    type="search"
                    value={inputValue}
                    onChange={(event) => {
                        setQuery(event.currentTarget.value);
                    }}
                    className={`border border-dark-300 text-black rounded-lg px-4 py-2 w-full focus:outline-none focus:border-transparent  mt-1.5 ${inputValue && !isSearchStalled ? 'rounded-b-none border-none' : ''}`}
                    autoFocus
                />

                <PoweredBy hidden={inputValue.length} className='w-32 mt-5 absolute inset-y-0 right-0 mr-2' />

                <button
                    type="reset"
                    hidden={inputValue.length === 0 || isSearchStalled}
                    className="text-red-900 px-6 mt-3 rounded absolute inset-y-0 right-0 mr-2 reset-button"
                >
                    Reset
                </button>

                <span
                    hidden={!isSearchStalled}
                    className="absolute right-0 top-0 mr-4 mt-2"
                >
                    Searching…
                </span>
            </form>

            <div
                ref={resultsRef}
                className={`absolute top-full left-0 right-0 h-96 bg-white p-3 shadow-lg z-20 rounded-b-lg ${!inputValue && !isSearchStalled ? 'hidden' : 'block'}`}
                style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
