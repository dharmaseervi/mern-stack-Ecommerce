import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="lg:h-96 h-full bg-slate-500 flex justify-center items-center  m-6 rounded p-4">
            <div className="flex flex-col lg:flex-row w-full h-full lg:w-full justify-center ">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 h-full  overflow-hidden flex justify-center items-center   ">
                    <Image
                        src='/macbook.png'
                        alt="Hero Image"
                        width={400}
                        height={400}
                        className='fill ' 
                        loading="lazy"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:px-10 ">
                    <h1 className="text-4xl md:text-5xl text-white font-bold tracking-wide mb-4 text-center">
                        Welcome to Our Store
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 text-center">
                        Explore our latest collection and enjoy exclusive discounts.
                    </p>
                    <Link
                        href="/category/electronic#"
                        className="bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
