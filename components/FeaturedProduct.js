'use client'
import { useContext, useEffect, useState } from 'react'
import { getProduct } from '../lib/action';
import { CartContext } from './CartProvider';
import Spinner from './Spinner';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


export default function FeaturedProduct() {

    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [product, setProduct] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const { addToCart } = useContext(CartContext);

    const productFetch = async () => {
        try {
            const res = await fetch('/api/newarrival/');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setProduct(data.allNewArrivals);
            setIsLoaded(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        productFetch();
    }, []);


    const handleClick = (item) => {
        const id = item._id;
    }

    return (

        <div className='flex justify-center items-center  rounded m-6 '>

            {isLoaded ? <Spinner /> : (
                <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8  w-full'>
                    {product.slice(0, 4).map((item, index) => (
                        <div onClick={() => handleClick(item)} key={index} className='group border rounded-md flex flex-col justify-between'>
                            <Link href={'/productoverview/' + item._id} >
                                <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-6 xl:aspect-w-8'>
                                    <img className='h-full w-full object-cover object-center group-hover:opacity-75' src={item.photo[0]} alt={item.productname} />
                                </div>
                                <div className='p-4'>
                                    <h2 className='text-lg font-semibold mb-1'>{item.productname}</h2>
                                    <p className='text-sm text-gray-600 mb-2'>MRP Price: ₹{parseFloat(item.productmrpprice).toLocaleString()}</p>
                                    <p className='text-sm text-green-900 font-medium mb-2'>Product Price: ₹{parseFloat(item.productprice).toLocaleString()}</p>
                                </div>
                            </Link>
                            <div className='p-4 flex justify-between '>

                                <div>
                                    <button className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700' onClick={() => addToCart(item, userId)}>Add to Cart</button>
                                </div>
                                {/* <div className="flex items-center mb-2 border">
                                            <button onClick={() => decreaseQuantity(item._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 mr-2">-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 ml-2">+</button>
                                        </div> */}
                                <div>
                                    <button className='bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600'>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}

        </div>

    )
}
