'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page({ params }) {
    const { mernluxid } = params
    console.log(mernluxid, 'mernluxid');
    const [mernlux, setMernlux] = useState([]);
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

                    const brandWithoutSpaces = item.productbrand.replace(/\s/g, '');
                    return brandWithoutSpaces.toLowerCase().includes(mernluxid.toLowerCase());
                });
                setMernlux(filteredItems);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);
    console.log(mernlux, 'mernlux');
    return (
        <div className='mx-auto  max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {mernlux.map((product) => (
                    <Link key={product.id} href={'/luxoverview/' + product._id} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={product.photo[0]}
                                alt={product.productname}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{product.productname}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{product.productprice}</p>
                    </Link>
                ))}
            </div>

        </div>
    )
}
