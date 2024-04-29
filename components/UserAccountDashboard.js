'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserAccountDashboard() {
    const { data: session } = useSession();
    const userId = session?.user?._id;

    return (
        <div className='container mx-auto py-8 '>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* User Profile */}
                <Link  href={'/register/' + userId} className='bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-md p-8 text-center'>
                    <img className='w-32 h-32 mx-auto rounded-full mb-4' src={session?.user?.image || '/user.png'} alt="User Avatar" />
                    <h1 className='text-2xl font-bold text-white'>{session?.user?.name}</h1>
                    <p className='text-lg font-medium text-gray-200'>{session?.user?.email}</p>
                </Link>

                {/* Shopping Section */}
                <Link href='/order' className='bg-gray-100 rounded-lg shadow-md p-8 text-center'>
                    <img className='w-24 h-24 mx-auto mb-4' src='/shopping.png' alt="Shopping Icon" />
                    <h2 className='text-lg font-bold text-gray-800 mb-2'>My Orders</h2>
                    <p className='text-gray-600'>View and track your orders</p>
                </Link>

                {/* Payment Section */}
                <div className='bg-gray-100 rounded-lg shadow-md p-8 text-center'>
                    <img className='w-24 h-24 mx-auto mb-4' src='/online-payment.png' alt="Payment Icon" />
                    <h2 className='text-lg font-bold text-gray-800 mb-2'>Payment Methods</h2>
                    <p className='text-gray-600'>Manage your payment methods</p>
                </div>

                {/* Shipping Section */}
                <Link href='/address' className='bg-gray-100 rounded-lg shadow-md p-8 text-center'>
                    <img className='w-24 h-24 mx-auto mb-4' src='/truck-moving.png' alt="Shipping Icon" />
                    <h2 className='text-lg font-bold text-gray-800 mb-2'>Shipping Information</h2>
                    <p className='text-gray-600'>Update your shipping address</p>
                </Link>
            </div>
        </div>
    );
}
