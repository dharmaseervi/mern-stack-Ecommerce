"use client";
import React, { useEffect, useState } from "react";
import Layout from "../useraccounts/page";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order
  const { data: session } = useSession();
  const userId = session?.user?._id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/orders/savePayment?query=${userId}`);
        const data = await res.json();
        setOrderDetails(data.orders);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [userId]);
  console.log(orderDetails, "orderDetails");

  const filteredOrders = orderDetails
    .map((order) => {
      const filteredItems = order.order.items.filter((item) =>
        item?.product?.productname.toLowerCase().includes(query.toLowerCase())
      );
      return {
        ...order,
        order: {
          ...order.order,
          items: filteredItems,
        },
      };
    })
    .filter((order) => order.order.items.length > 0);

  const allItems = filteredOrders.flatMap((order) => order.order.items);

  const sortedFilteredOrders = [...filteredOrders]; // Copy the filteredOrders array

  // Sort all items based on the selected sorting criteria
  sortedFilteredOrders.forEach((order) => {
    order.order.items.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        // Default sorting by product name (ascending)
        const productNameA = a.product.productname.toLowerCase();
        const productNameB = b.product.productname.toLowerCase();
        return sortOrder === "asc"
          ? productNameA.localeCompare(productNameB)
          : productNameB.localeCompare(productNameA);
      }
    });
  });

  return (
    <Layout>
      <div className="border shadow-md rounded-md p-4 h-screen overflow-auto">
        <h1 className="font-medium text-xl mb-2">Order History</h1>
        <div className="bg-gray-200 rounded-md px-4 py-2 mb-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent rounded-md outline-none px-4 py-2"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-32 bg-white font-medium rounded-md outline-none px-2 py-1 mx-2"
            >
              <option value="createdAt">Date</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="min-w-44 bg-white font-medium rounded-md outline-none px-2 py-1 mx-2"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {sortedFilteredOrders.length === 0 && (
          <h1 className="text-center text-xl font-medium">No Orders Found</h1>
        )}
        {sortedFilteredOrders.map((order) => (
          <Link href={"/order/" + order.order._id} key={order._id}>
            {order.order.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center bg-white shadow-md rounded-md p-4 mb-4"
              >
                <div className="col-span-1">
                  <img
                    className="w-24 h-24 rounded-md object-cover mr-4"
                    src={item.product.photo[0]}
                    alt="Product"
                  />
                </div>
                <div className="col-span-2 h-full">
                  <p className="text-gray-600">Order ID: {order._id}</p>
                  <h1 className="font-medium">{item.product.productname}</h1>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-green-600">Order Successful</p>
                  <p className="text-gray-700 font-semibold">₹{item.price}</p>
                  <p className="text-gray-700 font-semibold">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </Link>
        ))}
      </div>
    </Layout>
  );
}
