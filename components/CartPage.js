'use client'
import { CartContext } from '@/components/CartProvider';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import RazorpayButton from './Razorpay';
import Spinner from './Spinner';
import EmptyCart from './EmptyCart';



const CartPage = ({ path }) => {
    const { cartItems, removeItem, increaseQuantity, decreaseQuantity, cartId, setRazorpayOrder, orderId, setOrderId } = useContext(CartContext);
    const { data: session } = useSession();
    const userId = session?.user?._id;

    const [isLoading, setIsLoading] = useState(true);
    const amount = cartItems?.reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0);
    const amountInPaise = amount * 100;

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log()
        const fetchLatestOrder = async () => {
            try {
                const res = await fetch('/api/order');
                const data = await res.json();
                setOrderId(data.latestOrder._id || []);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchLatestOrder();
    }, []);


    const handleOrder = async () => {
        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, cartItems, amount })
            });
            const razorpayRes = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amountInPaise, currency: 'INR', orderId })

            }
            );
            if (!razorpayRes.ok) {
                throw new Error('Failed to fetch Razorpay order');
            }

            const dataresponse = await razorpayRes.json();
            setRazorpayOrder(dataresponse);
            // console.log(dataresponse, 'data in razorpay order');

            if (!res.ok) {
                console.error('Error:', res.statusText);
            } else {
                const data = await res.json();
                console.log('Order placed successfully:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto py-8 px-8 text-center">
                <EmptyCart />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 sm:flex-col sm:flex  xl:px-8 lg:px-8">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    {cartItems?.map((cartItem, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-4 rounded shadow mb-4">
                            <div className="flex items-center">
                                <img src={cartItem?.product?.photo?.[0]} alt={cartItem?.product?.productname} className="w-20 h-20 object-cover mr-4" />
                                <div>
                                    <h2 className="xl:text-lg sm:text-sm font-semibold">{cartItem?.product?.productname}</h2>
                                    <p className="text-gray-600">Size: {cartItem?.product?.variants?.[1]?.value}</p>
                                    <p className="text-gray-600">Color: {cartItem?.product?.variants?.[0]?.value}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center mb-2 border">
                                    <button onClick={() => decreaseQuantity(cartItem?.product?._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 mr-2">-</button>
                                    <span>{cartItem?.quantity}</span>
                                    <button onClick={() => increaseQuantity(cartItem?.product?._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 ml-2">+</button>
                                </div>
                                <p className="text-gray-600 mb-2">₹{parseFloat(cartItem?.price).toLocaleString()}</p>
                                <button onClick={() => removeItem(cartItem?.product?._id)} className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:border-red-700">Remove</button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <p className="text-lg font-semibold mr-4">Total Items:</p>
                            <p className="text-gray-700">{cartItems?.length}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold mr-4">Total Price:</p>
                            <p className="text-gray-700">₹{cartItems?.reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0).toLocaleString()}</p>
                        </div>
                    </div>
                    {path === '/shippinginfo' ?
                        <div>
                            <RazorpayButton />
                        </div> :
                        <button onClick={() => handleOrder()} className="max-w-96 bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                            <Link href={'/shippinginfo'}>Checkout</Link>
                        </button>}

                </>
            )}
            <div className="mt-10">
                <h1 className='text-gray-600 text-lg font-medium mb-2'>payment accepted</h1>
                <div className="flex space-x-4">
                    <img className='w-14 h-14' src="/mastercard.svg" alt="mastercard" />
                    <img className='w-14 h-14' src="/visa.svg" alt="visa" />
                    <img className='w-14 h-14' src="/paypal.svg" alt="paypal" />
                    <img className='w-14 h-14' src="/google-pay.svg" alt="google-pay" />
                    <img className='w-14 h-14' src="/apple-pay.svg" alt="apple-pay" />
                </div>
            </div>
        </div>
    );
};

export default CartPage;

