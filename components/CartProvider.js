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
  const [cartmerger, setCartMerger] = useState([])
  const [notification, setNotification] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?._id;

  const fetchCartItems = async () => {
    try {
      if (userId) {
        const res = await fetch(`/api/cart?userId=${userId}`);
        const data = await res.json();
        setCartItems(data.pendingItems || []);
        const ids = data?.pendingItems?.map((item) => item?.product?._id);
        setProductIds(ids || []);
        setCartId(data?.cartId?._id);
      } else {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };



  const mergeGuestCartWithUser = async (userId, guestCartItems) => {
    try {
      const response = await fetch('/api/cartmerge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, guestCartItems })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to merge cart items');
      }
      const responseData = await response.json();
      return responseData.cart;
    } catch (error) {
      // Handle any network errors or other exceptions
      console.error('Error merging cart:', error);
      throw new Error('Failed to merge cart items');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    if (userId && localStorage.getItem('cartmerge')) {
      const guestCartItems = JSON.parse(localStorage.getItem('cartmerge'));
      console.log(guestCartItems, 'guest');
      mergeGuestCartWithUser(userId, guestCartItems)
        .then((mergedCart) => {
          setCartItems(mergedCart.pendingItems || []);
          localStorage.removeItem('cartmerge'); // Remove the guest cart items
          localStorage.removeItem('cartItems'); // Remove the existing cart items
        })
        .catch((error) => {
          console.error('Error merging cart items:', error);
        });
    }
  }, [userId]); // Only depend on userId here


  useEffect(() => {
    if (!userId && cartmerger.length > 0) {
      localStorage.setItem("cartmerge", JSON.stringify(cartmerger));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartmerger, userId]);


  const addToCart = async (item, size) => {
    // If there is a no logged-in user
    if (!userId) {
      console.log('hello loggin');
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.product._id == item._id
      );
      console.log(existingItemIndex);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity++;

        const data = {
          userId: userId ? userId : 'guest user',
          product: item,
          quantity: updatedCartItems[existingItemIndex].quantity,
          size: size?.name || size || 'null',
          price: item.productprice,
        };
        setCartItems([...cartItems, data]);

        const cartmerge = {
          userId: userId ? userId : 'guest user',
          productId: item._id,
          quantity: updatedCartItems[existingItemIndex].quantity,
          total: item.productprice,
        };
        setCartMerger([...cartmerger, cartmerge])
      } else {
        const data = {
          userId: userId ? userId : 'guest user',
          product: item,
          quantity: 1,
          size: size?.name || size || 'null',
          price: item.productprice,
        };
        setCartItems([...cartItems, data]);
        console.log(cartItems);

        const cartmerge = {
          userId: userId ? userId : 'guest user',
          productId: item._id,
          quantity: 1,
          size: size?.name || size || 'null',
          total: item.productprice,
        };
        setCartMerger([...cartmerger, cartmerge])
        console.log(cartmerge);
        return;
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("cartmerge", JSON.stringify(cartmerger));
    }


    // If there is a logged-in user
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
      const newItem = { ...item, quantity: 1, };
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

    setNotification(`${item.productname} added to cart`);

    setTimeout(() => {
      setNotification(null);
    }, 3000);

    await fetchCartItems();

  };

  const removeItem = async (itemId) => {
    try {
      // If there is a not logged-in user
      if (!userId) {
        // If user is not logged in, remove item from local state
        const updatedCartItems = cartItems.filter(
          (cartItem) => cartItem.product._id !== itemId
        );
        setCartItems(updatedCartItems);


        const updatedCartMerger = cartmerger.filter(
          (cartItem) => cartItem.productId !== itemId
        );
        setCartMerger(updatedCartMerger);
        // Update local storage after removing the item
        localStorage.setItem("cartmerge", JSON.stringify(updatedCartMerger));
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return;
      }


      // If there is a logged-in user
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

    // If there is a not logged-in user
    if (!userId) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product._id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);

      const existingItemIndex = cartmerger.findIndex(
        (item) => item.productId === itemId
      );
      if (existingItemIndex !== -1) {
        const updatedCartMerger = [...cartmerger];
        updatedCartMerger[existingItemIndex].quantity++;

        setCartMerger(updatedCartMerger);
      } else {
        const newItem = {
          userId: 'guest user',
          productId: itemId,
          quantity: 1,
          size: 'null',
          total: 0,
        };
        setCartMerger([...cartmerger, newItem]);
      }
      // Update local storage with cart items and cart merger
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      localStorage.setItem("cartmerge", JSON.stringify(cartmerger));
      return;
    }


    // If there is a logged-in user
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

    // If there is a not logged-in user
    if (!userId) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product._id === itemId && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);

      const existingItemIndex = cartmerger.findIndex(
        (item) => item.productId === itemId
      );
      if (existingItemIndex !== -1) {
        const updatedCartMerger = [...cartmerger];
        updatedCartMerger[existingItemIndex].quantity--;

        setCartMerger(updatedCartMerger);
      }
      // Update local storage with cart items and cart merger
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      localStorage.setItem("cartmerge", JSON.stringify(cartmerger));
      return;
    }


    // If there is a logged-in user
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
    <CartContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div style={{ position: "fixed", top: 130, right: 20, backgroundColor: "green", color: "white", padding: 10, borderRadius: 5 }}>
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
}
