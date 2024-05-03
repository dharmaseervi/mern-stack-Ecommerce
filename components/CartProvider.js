"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext({});

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [razorpayOrder, setRazorpayOrder] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const { data: session } = useSession();
  const userId = session?.user?._id;

  const fetchCartItems = async () => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      setCartItems(data.pendingItems || []);
      const ids = data?.pendingItems?.map((item) => item?.product?._id);
      setProductIds(ids || []);
      setCartId(data?.cartId?._id);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);


  const addToCart = async (item, size) => {

    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.product._id == item._id
    );

    console.log(existingItemIndex, "existingItemIndex from cartProvider");
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;

      const data = {
        userId,
        productId: item._id,
        quantity: updatedCartItems[existingItemIndex].quantity,
        total: item.productprice,
      };

      const res = await fetch("/api/cart/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log(response);
    } else {
      console.log(size, 'size');
      const newItem = { ...item, quantity: 1 };
      const updatedCartItems = [...cartItems, newItem];

      const data = {
        userId,
        productId: item._id,
        quantity: 1,
        size: size?.name || size || 'null',
        total: item.productprice,
      };

      const res = await fetch("/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
    }
    setProductIds([...productIds, item._id]);
    await fetchCartItems();
  };

  const removeItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.product._id !== itemId
      );

      const data = {
        userId,
        productId: itemId,
      };
      const updatedProductIds = productIds.filter((id) => id !== itemId);
      setProductIds(updatedProductIds);
      const res = await fetch("/api/cart/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log(response); // Log the response data
    } catch (error) {
      console.error("Error removing item:", error);
    }
    await fetchCartItems();
  };

  const increaseQuantity = async (itemId) => {
    console.log(itemId, "itemId from increaseQuantity");
    const updatedCartItems = cartItems.map((cartItem) => {
      console.log(cartItem.quantity, "cartItem from increaseQuantity");
      if (cartItem?.product?._id === itemId) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    console.log(updatedCartItems, "updatedCartItems from increaseQuantity");

    const updatedItem = updatedCartItems.find(
      (item) => item.product._id == itemId
    );

    console.log("Updated Item:", updatedItem);

    const quantity = updatedItem ? updatedItem.quantity : 0;
    console.log("Quantity:", quantity);
    const data = {
      userId,
      productId: itemId,
      quantity,
    };

    console.log("Data:", data);

    const res = await fetch("/api/cart/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log("Response:", response);

    await fetchCartItems();
  };

  const decreaseQuantity = async (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.product._id === itemId && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    const data = {
      userId,
      productId: itemId,
      quantity: updatedCartItems.find((item) => item.product._id === itemId)
        .quantity,
    };

    const res = await fetch("/api/cart/", {
      method: "PUT", // Use PUT method for updating the quantity
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log(response); // Log the response data
    await fetchCartItems();
  };

  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,

      selectedAddressId,
      setSelectedAddressId,
      cartId,
      razorpayOrder,
      setRazorpayOrder,
      productIds,
      fetchCartItems,
      orderId,
      setOrderId,
    }),
    [
      addToCart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      selectedAddressId,
      setSelectedAddressId,
      cartId,
      razorpayOrder,
      setRazorpayOrder,
      productIds,
      fetchCartItems,
      orderId,
      setOrderId,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
