'use client'
import { CartContext } from '@/components/CartProvider';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import RazorpayButton from './Razorpay';
import Spinner from './Spinner';
import EmptyCart from './EmptyCart';
import { useRouter } from 'next/navigation';



const CartPage = ({ path }) => {
    const { cartItems, removeItem, increaseQuantity, decreaseQuantity, cartId, setRazorpayOrder, orderId, setOrderId } = useContext(CartContext);
    const { data: session } = useSession();
    const userId = session?.user?._id;
    console.log(session);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const amount = cartItems?.reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0);
    const amountInPaise = amount * 100;
    console.log(cartItems);
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

            if (!session) {
                router.push('/signup');
                return; 
            }

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
        <div className="xl:container xl:mx-auto mx-auto lg:mx-2  py-8 sm:flex-col sm:flex  xl:px-8 lg:px-8 ">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4 ml-10 lg:ml-10">Your Cart</h1>
                    <div className={`${path === '/shippinginfo' ? 'lg:grid lg:grid-cols-2' : 'grid lg:grid-cols-3 xl:grid-cols-3  '}`}>
                        <div className={`${path === '/shippinginfo' ? 'lg:col-span-2 lg:w-full p-2 ' : 'mx-2  lg:col-span-2 xl:col-span-2 p-2 '}`} >
                            {cartItems?.map((cartItem, index) => (
                                <div>
                                    <div className='border border-slate-200 my-5'></div>
                                    <div key={index} className="flex items-start justify-between p-4 rounded  mb-4 ">
                                        <div className="flex ">
                                            <img src={cartItem?.product?.photo?.[0]} alt={cartItem?.product?.productname} className="xl:w-36 xl:h-36 w-20 h-20 object-cover mr-4 rounded-md" />
                                            <div >
                                                <h2 className="mb-1">{cartItem?.product?.productname}</h2>
                                                {cartItem?.size !== 'null' && (<p className="text-gray-500 mb-1">Size: {cartItem?.size}</p>)}
                                                <p className="text-gray-500 mb-2">Price: ₹{parseFloat(cartItem?.price).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center  border">
                                                <button onClick={() => decreaseQuantity(cartItem?.product?._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 mr-2">-</button>
                                                <span>{cartItem?.quantity}</span>
                                                <button onClick={() => increaseQuantity(cartItem?.product?._id)} className="bg-gray-200 text-gray-600 px-3 py-1 hover:bg-gray-300 ml-2">+</button>
                                            </div>
                                            <button onClick={() => removeItem(cartItem?.product?._id)} className="text-red-500 border border-red-700 hover:text-red-700 px-3 py-1 rounded   hover:border-red-700">Remove</button>
                                        </div>

                                    </div>

                                </div>

                            ))}
                            <div className='border border-gray-200 my-5'></div>
                        </div>
                        <div className={`${path === '/shippinginfo' ? 'lg:col-span-2 lg:w-full bg-slate-100 p-10  rounded-md  ' : 'lg:col-span-1 xl:col-span-1  px-10 mx-4 py-6 bg-gray-100 rounded-md h-96  '}`}>
                            <h1 className='mb-5 text-xl'>order summary</h1>
                            <div className="mb-6">
                                <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">Amount</p>
                                    <p className="text-sm text-gray-500">₹{parseFloat((amount / 1.18).toFixed(2)).toLocaleString()}</p>
                                </div>
                                <div className='border  border-slate-200 my-3'></div>
                                <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">SGST</p>
                                    <p className="text-sm text-gray-500">₹{parseFloat(((amount / 1.18) * 0.09).toFixed(2)).toLocaleString()}</p>
                                </div>
                                <div className='border border-slate-200 my-3'></div>
                                <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">CGST</p>
                                    <p className="text-sm text-gray-500">₹{parseFloat(((amount / 1.18) * 0.09).toFixed(2)).toLocaleString()}</p>
                                </div>
                                <div className='border border-slate-200 my-3'></div>
                                <div className='flex justify-between'>
                                    <p className="text-sm text-gray-500">Shipping</p>
                                    <p className="text-sm text-gray-500">
                                        <strike className='text-red-500'>₹200</strike> {amount > 1000 ? 'Free' : '₹200'}
                                    </p>
                                </div>
                                <div className='border border-slate-200 my-3'></div>
                                <div className='flex justify-between'>
                                    <p className="">Total Amount</p>
                                    <p className="">₹{parseFloat(amount.toFixed(2)).toLocaleString()}</p>
                                </div>
                            </div>
                            {path === '/shippinginfo' ?
                                <div>
                                    <RazorpayButton />
                                </div> :
                                <button onClick={() => handleOrder()} className="w-full bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                                    <Link href={'/shippinginfo'}>Checkout</Link>
                                </button>}

                            <div className="mt-20">
                                <h1 className='text-gray-600 text-lg font-medium mb-2'>payment accepted</h1>
                                <div className="flex flex-wrap gap-2 ">
                                    <img className='w-14 h-14' src="/mastercard.svg" alt="mastercard" />
                                    <img className='w-14 h-14' src="/visa.svg" alt="visa" />
                                    <img className='w-14 h-14' src="/paypal.svg" alt="paypal" />
                                    <img className='w-14 h-14' src="/google-pay.svg" alt="google-pay" />
                                    <img className='w-14 h-14' src="/apple-pay.svg" alt="apple-pay" />
                                </div>
                            </div>

                        </div>

                    </div>

                </>
            )
            }

        </div >
    );
};

export default CartPage;

