'use client'
import { getProduct } from '@/lib/action';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartProvider';
import Spinner from '../Spinner';

const DealsOfDay = () => {
    const { addToCart } = useContext(CartContext)
    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProduct()
            const resJson = JSON.parse(res)
            setDeals(resJson)
            setIsLoading(false)

        }
        fetchProduct()
    }, [])


    return (
        <>
            {isLoading ? (<Spinner />) :
                (<section className="bg-slate-400 m-6 py-6 flex flex-col justify-between  items-center rounded">
                    <h2 className="text-3xl font-semibold  mb-8">Deals of the Day</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-10 ">
                        {deals.slice(10, 14).map((deal) => (
                            <div key={deal.id} className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col ">
                                <div className="aspect-w-3 aspect-h-4 mb-4">
                                    <img loading="lazy" src={deal?.photo?.[0]} alt={deal.productname} className="object-cover w-full h-full rounded" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold">{deal.productname}</h3>
                                    <div className="flex justify-center items-center mt-2">
                                        <span className="text-gray-500 text-sm line-through mr-2">&#x20b9;{deal.productmrpprice}</span>
                                        <span className="text-red-500 font-semibold">&#x20b9;{deal.productprice}</span>
                                    </div>
                                    <button onClick={() => addToCart(deal)} className="bg-blue-500 text-white rounded-full py-2 px-4 mt-4 hover:bg-blue-600 transition duration-300 ease-in-out">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>)}
        </>
    );
};

export default DealsOfDay;
