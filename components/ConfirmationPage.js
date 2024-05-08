"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ConfirmationPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch("/api/orders/savePayment");
        const data = await res.json();
        setOrderDetails(data.latestOrder);
        setLoading(false);
        console.log(data, "data in order route");
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [userId]);

  const currentDate = new Date();
  const deliveryDate = new Date(orderDetails.createdAt);
  const estimatedDelivery = new Date(deliveryDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  console.log(orderDetails, "orderDetails in confirmation page");

  return (
    <>
      {isLoading ? (
        <div className=" w-full flex justify-center items-center ">
          <Spinner />
          <p>fetching order confirmation..</p>
        </div>
      ) : (
        <div className="h-full w-full items-center justify-center bg-gray-100 lg:grid lg:grid-cols-2 ">
          <div className="lg:col-span-1 h-full ">
            <img
              className="w-full h-full object-cover"
              src={'/orderconf.jpg'}
              alt="image"
            />
          </div>

          <div className="bg-white  p-8  w-full h-full  col-span-1 gap-2 ">

            <div className='flex flex-col '>
              <p className='text-indigo-500 mb-1'>Payment successful</p>
              <h1 className="text-4xl font-bold mb-2  ">
                Thanks for ordering
              </h1>
              <p className='text-gray-500'>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
            </div>

            <div className='mt-5 flex flex-col gap-1'>
              <p className='text-indigo-500'>Order ID</p>
              <p>{orderDetails?.order?._id}</p>
            </div>

            <div>
              {orderDetails?.order?.items?.map((item, index) => (
                <div>
                  <div className='border border-slate-200 my-5'></div>
                  <div
                    key={index}
                    className="flex items-start justify-between mb-2  p-2  "
                  >
                    <div className='flex gap-2'>
                      <img
                        className="w-24 h-24 rounded-md"
                        src={item?.product?.photo?.[0]}
                        alt=""
                      />
                      <p className="font-medium">{item?.product?.productname}</p>
                    </div>
                    <p>₹{item?.product?.productprice}</p>
                  </div>

                </div>
              ))}
            </div>


            <div className="mb-6">
              <div className='border border-slate-200 my-5'></div>
              <div className='flex justify-between'>
                <p className="font-semibold">Amount</p>
                <p className="">₹{(orderDetails?.order?.amount / 1.18).toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className="font-semibold">SGST</p>
                <p className="">₹{((orderDetails?.order?.amount / 1.18) * 0.09).toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className="font-semibold">CGST</p>
                <p className="">₹{((orderDetails?.order?.amount / 1.18) * 0.09).toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className="font-semibold">Shipping</p>
                <p className="">
                  <strike className='text-red-500'>₹200</strike> {orderDetails?.order?.amount > 1000 ? 'Free' : '₹200'}
                </p>
              </div>
              <div className='border border-slate-200 my-5'></div>
              <div className='flex justify-between'>
                <p className="font-semibold">Total Amount</p>
                <p className="">₹{orderDetails?.order?.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className='border border-slate-200 my-5'></div>
            <p>
              <span className="font-semibold">Estimated Delivery:</span>
              {estimatedDelivery.toLocaleDateString('en-US', options)}
            </p>

            <div className='border border-slate-200 my-5'></div>

            <div className='grid grid-cols-2 justify-between'>

              <div className='col-span-1'>
                <p className="font-semibold">Delivery Address</p>
                {orderDetails?.address?.address},{orderDetails?.address?.town},
                {orderDetails?.address?.city},{orderDetails?.address?.state}-
                {orderDetails?.address?.pincode}
              </div>

              <div className='col-span-1 flex flex-col justify-center items-end '>
                <div className='flex flex-col justify-end'>
                  <p className="font-semibold">Customer Details</p>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {orderDetails?.address?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {session?.user?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {orderDetails?.address?.mobileno}
                  </p>
                </div>
              </div>

            </div>
            <div className='border border-slate-200 my-5'></div>
            <div className="flex justify-between">
              <button className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                <Link href={"/"}>Continue Shopping</Link>
              </button>
              <button className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">
                <Link href={"/userorder/" + orderDetails?.order?._id}>Track Order</Link>
              </button>
            </div>
          </div>
        </div>)}
    </>
  );
};

export default ConfirmationPage;
