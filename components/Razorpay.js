'use client'
import { useSession } from 'next-auth/react';
import { CartContext } from './CartProvider';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const RazorpayButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { razorpayOrder, selectedAddressId, cartId, productIds, fetchCartItems, orderId } = useContext(CartContext);
  console.log(cartId, 'cartId in razorpay');
  console.log(session?.user?._id, 'userId in razorpay');
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  console.log(razorpayOrder, 'razorpayOrder in razorpay');

  const handleCartUpdate = async () => {

    try {
      const res = await fetch('/api/cart/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'success', userId: session.user._id, productIds, })
      });
      console.log(res, 'data in cart update');
    } catch (error) {
      console.error('Error removing cart items:', error);
    }
    await fetchCartItems();
  }

  const hanldeEmail = async () => {
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'dharmaseervijb18239@gmail.com',
          subject: 'Order Confirmation',
          message: 'Your order has been placed successfully',
          orderId,
          userId: session.user._id,
          selectedAddressId
        })
      });
      console.log(res, 'data in email');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }


  const handlePaymentSuccess = async (response) => {
    const paymentDetails = {
      userId: session.user._id,
      cartId: cartId?._id,
      addressId: selectedAddressId,
      order: orderId,
      paymentId: response.razorpay_payment_id,
      status: true,
    };

    try {
      const savePaymentResponse = await fetch('/api/orders/savePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentDetails)
      });

      if (!savePaymentResponse.ok) {
        throw new Error('Failed to save payment details');
      }

      handleCartUpdate()
      hanldeEmail();
      console.log('Payment details saved successfully');
      // Optionally, you can redirect the user to a confirmation page or perform any other actions
    } catch (error) {
      console.error('Error saving payment details:', error);
      // Handle error and display an error message to the user
    }
  };

  const handleClick = async () => {
    const options = {
      key: process.env.RAZOR_SECRET_ID, // Enter
      amount: razorpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: razorpayOrder.currency,
      name: 'MERN STACK',
      description: 'Test Transaction',
      image: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
      order_id: razorpayOrder.orderId, // Replace with your order ID
      handler: async function (response) {
        const body = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        }
          ;
        console.log(response, 'paymentMethod');
        try {
          const validatePayment = await fetch('/api/orders/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          const data = await validatePayment.json();
          console.log(data, 'data in razorpay button');

          handlePaymentSuccess(response);
          handleCartUpdate(response);
          router.push('/confirmation');

        } catch (error) {
          console.error('Error validating payment:', error);
        }

      },
      prefill: {
        name: session?.user?.name,
        email: session?.user?.email,
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#fff',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.success', handlePaymentSuccess);
    paymentObject.open();

  };

  return (
    <button className="bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105" type='button' id="rzp-button1" onClick={handleClick}>Continue to payment</button>
  )

}



export default RazorpayButton;
