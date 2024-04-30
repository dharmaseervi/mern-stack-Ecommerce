'use client'
import CartPage from '@/components/CartPage'
import ShippinginfoPage from '@/components/ShippingInfo'
import React from 'react'
import { usePathname } from 'next/navigation'
export default function page() {
    const pathname = usePathname()
    console.log(pathname);
    return (
        <div className='grid grid-cols-1  gap-4 md:gap-8 mx-4 md:mx-auto xl:grid-cols-2 lg:grid-cols-1 '>
            <div className='col-span-1 mx-2 lg:mx-20'>
                <ShippinginfoPage />
            </div>
            <div className='col-span-1 mx-2 lg:mx-20 '>
                <CartPage path={pathname} />
            </div>
        </div>
    )
}
