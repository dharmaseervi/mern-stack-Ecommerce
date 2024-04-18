'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const ConfirmationPage = () => {
    const { data: session } = useSession();
    const userId = session?.user?._id;
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await fetch('/api/orders/savePayment');
                const data = await res.json();
                setOrderDetails(data.latestOrder);
                console.log(data, 'data in order route');
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [userId]);


    console.log(orderDetails, 'orderDetails in confirmation page');

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-100 ">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full gap-4 flex flex-col">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                    <p><span className="font-semibold">Order ID:</span> {orderDetails?.order?._id}</p>
                    <p><span className="font-semibold">Total Amount:</span> ₹{orderDetails?.order?.amount}</p>
                    <p><span className="font-semibold">Payment Method:</span> {orderDetails?.paymentMethod}</p>
                    <p><span className="font-semibold">Delivery Address:</span> {orderDetails?.address?.address},{orderDetails?.address?.town},{orderDetails?.address?.city},{orderDetails?.address?.state}-{orderDetails?.address?.pincode}</p>
                    <p><span className="font-semibold">Delivery Date:</span>{'12/03/2024'}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Items</h2>
                    {orderDetails?.order?.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-2 border p-2 shadow-md rounded-md ">
                            <img className='w-14 h-14' src={item?.product?.photo?.[0]} alt="" />
                            <p className='font-medium'>{item?.product?.productname}</p>
                            <p>₹{item?.product?.productprice}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
                    <p><span className="font-semibold">Name:</span> {orderDetails?.address?.name}</p>
                    <p><span className="font-semibold">Email:</span> {session?.user?.email}</p>
                    <p><span className="font-semibold">Phone:</span> {orderDetails?.address?.mobileno}</p>
                </div>
                <div className="flex justify-between">
                    <button className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                        <Link href={'/'}>Continue Shopping</Link>
                    </button>

                    <button className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                        <Link href={''}>Track Order</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
