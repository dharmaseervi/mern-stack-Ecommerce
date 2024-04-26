'use client'
import { useGSAP } from "@gsap/react";
import React, { useEffect, useState, useRef, useContext } from "react";
import gsap from 'gsap';
import { CartContext } from "./CartProvider";
import { useSession } from "next-auth/react";

export default function LuxProductOverview({ luxproduct }) {
  const [productData, setProductData] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const sideContainerRef = useRef(null);
  const pointRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  const { data: session } = useSession();
    const userId = session?.user?.id;

  const next = () => {
    setImgIndex((prevIndex) =>
      prevIndex === productData.photo.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? productData.photo.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (luxproduct) {
      setProductData(JSON.parse(luxproduct));
    }
  }, [luxproduct]);
  console.log(productData);

  const handleToggle = () => {
    setOpen(!open)
  }
  const handleToggleClose = () => {
    gsap.fromTo(
      sideContainerRef.current,
      { x: '0%' },
      { x: '100%', duration: 0.5, ease: 'power2.inOut' }
    );
    gsap.fromTo(
      pointRef.current,
      { x: '0%', },
      { x: '100%', duration: 0.3, ease: 'power2.inOut' }
    );
  }

  // Animation for showing/hiding product details
  useGSAP(() => {
    gsap.fromTo('.side-container',
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power2.inOut' });
  }, [open]);

  // Animation for showing/hiding product description
  useGSAP(() => {
    gsap.fromTo('.desc-line',
      { x: '100%' },
      { x: '0%', duration: 1, ease: 'power2.inOut' });
  }, [open]);

  return (
    <div className="grid grid-cols-2 mt-1 relative">
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 p-6" onClick={prev}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2  p-6 " onClick={next}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="col-span-1 h-[85vh] ">
        <img src={productData?.photo?.[imgIndex]} className="w-full h-full object-cover" />
      </div>

      <div className="col-span-1  h-[85vh] ">
        <img src={productData?.photo?.[imgIndex + 1] || productData?.photo?.[0]} className="w-full h-full object-cover" />
      </div>


      <div className="absolute top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 bg-white  flex items-start pt-10 justify-center  rounded-md opacity-75 ">
        <div className=" flex flex-col items-center justify-center gap-2 ">
          <h1 className=" font-semibold mb-2">{productData.productname}</h1>
          <div className="flex items-center justify-between mb-4 gap-2">
            <span className="text-gray-900 font-semibold">₹{productData?.productprice?.toLocaleString('en-IN')}</span>
            <span className="text-gray-500 line-through">₹{productData?.productmrpprice?.toLocaleString('en-IN')}</span>
          </div>
          <div className=' flex mb-4 font-serif gap-2' onClick={handleToggle}>
            <p className='cursor-pointer'>product details</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {productData.variants?.map(variant => (
              variant.value.split(',').map(size => (
                <span key={size} className="inline-block px-4 py-2 bg-gray-200 rounded capitalize ">{size}</span>
              ))
            ))}
          </div>
          <div className='mb-4 w-full'>
            <button onClick={() => addToCart(productData, userId)} className='border px-4 w-full py-3 rounded bg-black text-white font-serif text-md'>Add to cart</button>
          </div>
        </div>
      </div>


      {open && (
        <div className="side-container absolute right-0 bg-white h-full w-2/6 p-2 gap-2 flex flex-col " ref={sideContainerRef}>
          <div className='flex justify-between px-4'>
            <h1 className="font-semibold text-xl ">Product Description</h1>
            <svg onClick={handleToggleClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </div>
          <ul className="desc-line  pl-4" ref={pointRef}>
            {productData.productdescription.split("\r\n").map((point) => (
              <div className='flex gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
                <li className='font-serif' key={point}>{point.trim(' ')}</li>
              </div>

            ))}
          </ul>
        </div>
      )}

    </div >
  );
}
