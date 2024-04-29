"use client";
import Layout from "@/app/useraccounts/page";
import React, { useState, useEffect } from "react";

export default function OrderPage({ params }) {
  const { orderid } = params;

  const [orderPlaced, setOrderPlaced] = useState([]);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState("orderPlaced");
  const steps = [
    { status: "orderPlaced", label: "Order Placed" },
    { status: "shipped", label: "Shipped" },
    { status: "outForDelivery", label: "Out for Delivery" },
    { status: "delivered", label: "Delivered" },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/adminorder?orderid=${orderid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order data");
        }

        const data = await response.json();
        setOrderPlaced(data.orderItems);
        setOrderStatus(data.orderItems[0].status);
        console.log(data.orderItems[0].status, "order");
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrder();
  }, []);
  console.log(orderPlaced);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Order Progress</h1>

        <div className="border-b border-gray-300 pb-4 mb-6">
          <div className="flex border-y-0  border justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`border border-x-0 w-full flex justify-center items-center gap-2 py-2 ${
                  index <= steps.findIndex((s) => s.status === orderStatus)
                    ? "text-black bg-green-700"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= steps.findIndex((s) => s.status === orderStatus)
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="mt-1">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {orderPlaced?.map((order, index) => (
          <div
            key={index}
            className="border mb-6 rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-4 bg-gray-50 border-b">
              <p className="text-gray-900">Order ID: {order._id}</p>
              <p className="text-gray-900">User ID: {order.user}</p>
              <p className="text-gray-900">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="p-4">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center mb-4">
                  <img
                    className="w-16 h-16 mr-4 rounded"
                    src={item?.product?.photo?.[0]}
                    alt={item?.product?.productname}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item?.product?.productname}
                    </h3>
                    <p className="">Quantity: {item?.quantity}</p>
                    <p className="">Price: {item?.price}</p>
                  </div>
                </div>
              ))}
            </div>
              <div className="flex  bg-slate-200 h-10 items-center p-2">
                <h1 className="text-xl font-semibold text-black">Total: {order?.amount}</h1>
              </div>
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}
      </Layout>
    </div>
  );
}
