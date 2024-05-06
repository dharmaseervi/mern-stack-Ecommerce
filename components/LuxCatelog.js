'use client'
import React, { useEffect, useState, useRef } from 'react';
import Spinner from './Spinner';

const LuxCatalog = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState(true);
    const [isLoaded, setIsLoaded] = useState(true);

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
                    return item.subcategory.includes("clothing/lux/men");
                });
                setCategoryData(filteredItems);
                setIsLoaded(false)
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);

    const handleHorizontalScroll = (scrollOffset) => {
        const container = containerRef.current;
        if (container) {
            const newPosition = container.scrollLeft + scrollOffset;
            container.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newPosition);
            setArrowDisable(newPosition === 0);
        }
    };

    return (
        <div>
            {isLoaded ? (<Spinner />) : (<section className="bg-slate-100 my-3 py-6 flex flex-col justify-between items-center m-6 rounded-md ">
                <h2 className="text-3xl font-semibold mb-8">Luxury Catalog</h2>
                <div className="relative w-full">
                    <div className="overflow-x-auto" ref={containerRef} style={{ overflowX: 'hidden' }}>
                        <div className="flex">
                            {categoryData.map((category) => (
                                <div key={category.id} className="flex-shrink-0 w-72 bg-gray-100 rounded-lg shadow-md p-6 flex flex-col justify-between mr-4">
                                    <div className="aspect-w-3 aspect-h-4 mb-4">
                                        <img  src={category?.photo?.[0]} alt={category.productname} className="object-cover w-full h-full rounded mix-bv" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-sm font-semibold">{category.productname}</h3>
                                        <div className="flex  items-center mt-2">
                                            <span className="text-gray-500 text-sm line-through mr-2">&#x20b9;{category.productmrpprice}</span>
                                            <span className="text-red-500 font-semibold">&#x20b9;{category.productprice}</span>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-blue-600 transition duration-300 ease-in-out">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => handleHorizontalScroll(-500)}
                        disabled={arrowDisable}
                        className="bg-gray-200 text-gray-600 rounded-full absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 p-6 z-20"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => handleHorizontalScroll(500)}
                        className="bg-gray-200 text-gray-600 rounded-full absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 p-6 z-20"
                    >
                        &gt;
                    </button>
                </div>
            </section>)}
        </div>
    );
};

export default LuxCatalog;

