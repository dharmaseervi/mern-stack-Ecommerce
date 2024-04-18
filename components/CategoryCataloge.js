
'use client'
import { getProduct } from '@/lib/action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CategoryCataloge() {
  const [callouts, setCallouts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct()
      const resJson = JSON.parse(res)
      setCallouts(resJson)

    }
    fetchProduct()
  }, [])
  return (
    <div className="bg-slate-100 rounded m-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.slice(6, 9).map((callout) => (
              <div key={callout.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.photo?.[0]}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link href={'/'}>
                    <span className="absolute inset-0" />
                    {callout.productbrand}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.productname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
