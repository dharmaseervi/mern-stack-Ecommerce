'use client'
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContex';

const SearchedProductCard = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { forceUpdate } = useContext(GlobalContext);

    useEffect(() => {
        const results = JSON.parse(localStorage.getItem('searchResults')) || [];
        setSearchResults(results);
    }, [forceUpdate]);
    return (
        <div className='grid grid-cols-1  gap-4'>
            {searchResults.map(item => (
                <div key={item.id} className='bg-white shadow-md rounded-lg flex h-56'>
                    <div className='flex-none w-56 h-56 '>
                        <img className='w-full h-full object-cover rounded-l-lg' src={item?.photo?.[0]} alt='' />
                    </div>
                    <div className='flex-auto p-4'>
                        <h1 className='text-xl font-semibold text-gray-800'>{item.productname}</h1>
                        <p className='text-gray-600'>{item.productbrand}</p>
                        <p className='text-red-600 font-bold mt-2'>MRP: ₹{item.productmrpprice}</p>
                        <p className='font-bold mt-1'>Sale Price: ₹{item.productprice}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchedProductCard;
