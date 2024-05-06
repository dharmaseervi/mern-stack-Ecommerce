'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@material-tailwind/react';
import Spinner from './Spinner';

const LuxFP = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setisLoading] = useState(true);
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
                setProducts(filteredItems);
                setisLoading(false)
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);

    return (
        <>
            {isLoading ? (<Spinner />) : (<section className="rounded m-6 bg-slate-100  p-6 ">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                <div className="grid lg:grid-cols-3  grid-cols-1 gap-8 border">
                    {products.slice(1, 4).map((product) => (
                        <div key={product._id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:translate-y-3 ">
                            <Link href={`/luxoverview/${product._id}`}>
                                <div className="relative overflow-hidden transition-all duration-300 ease-in-out ">
                                    <img src={product?.photo?.[0]} alt={product.productname} className="object-cover w-full h-full" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 md:p-6">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">New Arrival</Badge>
                                        <Badge className="text-gray-500 dark:text-gray-400" variant="outline">Limited Stock</Badge>
                                    </div>
                                    <h3 className="font-bold text-xl md:text-2xl">{product.productname}</h3>
                                    <p className="text-sm text-gray-500">{product.productdescription}</p>
                                    <h4 className="font-semibold text-lg md:text-xl">₹{product.productprice.toFixed(2)}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>)}
        </>
    );
};

export default LuxFP;
