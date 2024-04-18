'use client'
import React from 'react'
import Layout from '../useraccount/layout'
import { useSession } from 'next-auth/react'

export default function Page() {
    const { data: session } = useSession();
    return (
        <Layout>
            <div className='gird grid-cols-4  gap-2'>
                <div className='gird-span-4 bg-gray-100 rounded-md w-full py-3  gap-2 flex flex-col items-center justify-center'>
                    {session?.user?.image ? < img className='w-44 h-44 rounded-full' src={session?.user?.image} alt="" /> : null}
                    <h1 className='text-2xl font-bold'>{session?.user?.name}</h1>
                    <p className='text-lg font-medium'>{session?.user?.email}</p>
                </div>
            </div>
        </Layout>
    )
}
