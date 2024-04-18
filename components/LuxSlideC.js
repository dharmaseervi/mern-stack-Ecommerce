'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function LuxSlideC() {
    const [categoryData, setCategoryData] = useState([]);

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
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);

   

    return (
        <div className='m-6 rounded'>
            <div className="grid grid-cols-3 gap-6">
                {categoryData.map((category, index) => (
                    <div key={category.id} className="lux-card bg-gray-100 rounded-lg shadow-md p-6 flex flex-col justify-between">
                        <div className="aspect-w-3 aspect-h-4 mb-4">
                            <img src={category?.photo?.[0]} alt={category.productname} className="object-cover w-full h-full rounded mix-bv" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">{category.productname}</h3>
                            <div className="flex items-center mt-2">
                                <span className="text-gray-500 text-sm line-through mr-2">&#x20b9;{category.productmrpprice}</span>
                                <span className="text-red-500 font-semibold">&#x20b9;{category.productprice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
