'use client'
import ShippingAddress from '@/components/ShippingAddress'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './CartProvider';
import Spinner from './Spinner';


export default function ShippinginfoPage() {
    const { selectedAddressId, setSelectedAddressId } = useContext(CartContext);
    const [addresses, setAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [otherAddresses, setOtherAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/address');
                if (!response.ok) {
                    throw new Error('Failed to fetch address data');
                }
                const data = await response.json();
                setAddresses(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching address data:', error);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        const defaultAddr = addresses.find(address => address.isDefault);
        setDefaultAddress(defaultAddr);
        setOtherAddresses(addresses.filter(address => !address.isDefault));
    }, [addresses]);


    const handleRemoveAddress = async (id) => {
        console.log("Removing address with id:", id);
        try {
            const response = await fetch(`/api/address/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // If deletion is successful, fetch the updated list of addresses
                const updatedAddressesResponse = await fetch('/api/address');
                if (!updatedAddressesResponse.ok) {
                    throw new Error('Failed to fetch updated address data');
                }
                const updatedAddressesData = await updatedAddressesResponse.json();
                setAddresses(updatedAddressesData);
            } else {
                throw new Error('Failed to delete address');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            // Display an error message to the user
        }
    };




    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    }



    return (
        <div className='container mx-auto py-8 flex flex-col gap-2  overflow-auto ' style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>

                    <div className='flex md:justify-between justify-start md:items-center w-full flex-col md:flex-row gap-3 h-full '>
                        <div>
                            <h1 className='text-2xl font-medium '>
                                select delivery address
                            </h1>
                        </div>
                        <div>
                            <Link href={'/editaddress'} className=' border px-4 py-2 border-black   rounded hover:bg-black hover:text-white '>
                                Add address
                            </Link>
                        </div>
                    </div>

                    <h1 className='font-medium text-red-600 capitalize'>default address</h1>
                    {defaultAddress && (
                        <label
                            className={`border p-2 flex items-center ${selectedAddressId === defaultAddress._id ? 'border-indigo-500' : 'border-gray-300'} rounded-md bg-gray-200 shadow-md`}
                            htmlFor={defaultAddress._id}
                        >
                            <div key={defaultAddress._id} className='  w-full h-44 gap-2 flex flex-col p-2 justify-between'>

                                <input
                                    className="sr-only"
                                    type="radio"
                                    id={defaultAddress._id}
                                    name="selectedAddress"
                                    checked={selectedAddressId === defaultAddress._id}
                                    onChange={() => handleSelectAddress(defaultAddress._id)}
                                />

                                <div className="w-4 h-4 border rounded-full mr-2 bg-indigo-500 flex-shrink-0"></div>
                                <div>
                                    <p className='font-medium capitalize'>{defaultAddress?.name}</p>
                                    <p>{defaultAddress?.address}, {defaultAddress?.town}, {defaultAddress?.city}, {defaultAddress?.state}</p>
                                    <p>{defaultAddress?.mobileno}</p>
                                </div>

                                <div className='flex gap-2 '>
                                    <Link href={'/editaddress/' + defaultAddress._id} className='w-32 text-center border px-4 py-2 border-black text-red-black rounded hover:bg-black hover:text-white'>Edit</Link>
                                    <button onClick={() => handleRemoveAddress(defaultAddress._id)} className='w-32 text-center border px-4 py-2 border-red-500 text-red-700 rounded hover:bg-red-600 hover:text-white' >Remove</button>
                                </div>
                            </div>
                        </label>
                    )
                    }
                    <h1 className='font-medium text-red-600 capitalize'>other address</h1>
                    {
                        otherAddresses?.map((item) => (
                            <label key={item._id} className={`border p-2 flex items-center ${selectedAddressId === item._id ? 'border-indigo-500' : 'border-gray-300'} rounded-md bg-gray-100 shadow-md`} htmlFor={item._id}>
                                <div key={item._id} className='  w-full h-44 gap-2 flex flex-col p-2 justify-between'>
                                    <input
                                        type="radio"
                                        id={item._id}
                                        name="selectedAddress"
                                        checked={selectedAddressId === item._id}
                                        onChange={() => handleSelectAddress(item._id)}
                                    />
                                    <div key={item._id}>
                                        <p className='font-medium capitalize'>{item?.name}</p>
                                        <p>{item?.address}, {item?.town}, {item?.city}, {item?.state}</p>
                                        <p>{item?.mobileno}</p>
                                    </div>

                                    <div className='flex gap-2 '>
                                        <Link href={'/editaddress/' + item._id} className='w-32 text-center border px-4 py-2 border-black text-red-black rounded hover:bg-black hover:text-white '>Edit</Link>
                                        <button onClick={() => handleRemoveAddress(item._id)} className='w-32 text-center border px-4 py-2 border-red-500 text-red-700 rounded  hover:bg-red-600 hover:text-white'>Remove</button>
                                    </div>
                                </div>
                            </label>
                        ))

                    }
                </>
            )}
        </div >

    )
}
