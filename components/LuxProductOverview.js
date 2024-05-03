'use client'
import { useGSAP } from "@gsap/react";
import React, { useEffect, useState, useRef, useContext } from "react";
import gsap from 'gsap';
import { CartContext } from "./CartProvider";
import { useSession } from "next-auth/react";
import { RadioGroup } from "@headlessui/react";

export default function LuxProductOverview({ luxproduct }) {
  const [productData, setProductData] = useState([]);
  const [selectedSize, setselectedSize] = useState();
  const [imgIndex, setImgIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const sideContainerRef = useRef(null);
  const pointRef = useRef(null);
  const { addToCart } = useContext(CartContext);


  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(selectedSize, 'selected size');


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


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="grid lg:grid-cols-2  mt-1 relative">
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

      <div className="col-span-1 h-screen lg:h-[85vh] ">
        <img src={productData?.photo?.[imgIndex]} className="w-full h-full object-cover" />
      </div>

      <div className="col-span-1  h-[85vh] hidden lg:block">
        <img src={productData?.photo?.[imgIndex + 1] || productData?.photo?.[0]} className="w-full h-full object-cover" />
      </div>

      <div className='lg:col-span-2 border'>
        <div className=" absolute lg:top-1/2 lg:left-1/2 top-full left-1/2 w-full lg:w-96 lg:h-96 transform -translate-x-1/2 -translate-y-1/2 bg-white  flex items-start pt-10 justify-center lg:rounded-md lg:opacity-75 ">
          <div className=" flex flex-col items-center justify-center gap-2 ">
            <h1 className=" font-semibold mb-2 text-center">{productData.productname}</h1>
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
              <RadioGroup
                value={selectedSize}
                onChange={setselectedSize}
                className="mt-4"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a size
                </RadioGroup.Label>
                <div className="flex gap-4 justify-center ">
                  {productData.variants?.map((variant) => (
                    variant.value.split(',').flatMap((sizes) => (
                      sizes.split('/').map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-5 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size}
                              </RadioGroup.Label>
                              {size ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))
                    ))
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className='mb-4 px-5 w-full'>
              {selectedSize || !productData?.variants?.some(variant => variant.name === 'size') ? (
                <button onClick={() => addToCart(productData, selectedSize)} className='border px-4 w-full py-3 rounded bg-black text-white font-serif text-md'>Add to cart</button>
              ) : (
                <button disabled={true} className='border px-4 w-full py-3 rounded bg-gray-300 text-gray-500 font-serif text-md cursor-not-allowed'>Select a size</button>
              )}
            </div>


          </div>
        </div>

      </div>

      {
        open && (
          <div className="side-container absolute right-0 bg-white h-[80vh] lg:h-full border lg:w-2/6 p-2 gap-2 flex flex-col " ref={sideContainerRef}>
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
        )
      }

    </div >
  );
}
