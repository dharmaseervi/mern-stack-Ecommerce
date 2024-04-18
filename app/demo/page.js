import * as React from 'react';
import { Tailwind } from "@react-email/components";

export default function Email(props) {
  const { order, productDetails, address, email } = props;

  // Function to generate fake product details
  const generateFakeProductDetails = () => {
    return Array.from({ length: 5 }, (_, index) => ({
      name: `Product ${index + 1}`,
      price: Math.floor(Math.random() * 1000) + 100, // Random price between 100 and 1000
      quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
      photo: `https://via.placeholder.com/150`, // Placeholder image URL
    }));
  };

  // Generate fake product details if not provided
  const fakeProductDetails = productDetails || generateFakeProductDetails();

  // Generate fake address if not provided
  const fakeAddress = address || {
    firstname: "John",
    address: "123 Fake Street",
    city: "City",
    state: "State",
    zip: "12345",
    country: "Country",
  };

  // Generate fake order if not provided
  const fakeOrder = order || {
    amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000 and 6000
  };

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <div className='mx-auto bg-white shadow-md p-4 border rounded-md my-3 w-2/3'>
        <h1 className="text-3xl font-bold text-brand mb-4">Order Confirmation</h1>
        <p className="text-black  font-serif font-medium">Hi {fakeAddress.firstname},</p>
        <p className="mb-2">Thank you for your order. Here are the details:</p>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Shipping Address</h2>
          <p>{fakeAddress.address}</p>
          <p>{fakeAddress.city}, {fakeAddress.state} {fakeAddress.zip}</p>
          <p>{fakeAddress.country}</p>
        </div>
        <h2 className="text-xl font-bold mb-2">Order Details</h2>
        <table className="w-full mb-4">
          <thead className="border-b bg-blue-200">
            <tr>
              <th className="text-left py-2 px-1">Image</th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Quantity</th>
            </tr>
          </thead>
          <tbody className='bg-slate-100 shadow-md p-3 '>
            {fakeProductDetails.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-1 px-1"><img className='w-14 h-14 ' src={product.photo} alt="" /></td>
                <td className="py-1 px-1">{product.name}</td>
                <td className="py-1 px-1">&#8377;{product.price}</td>
                <td className="py-1 px-1">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-bold">Order Total: &#8377;{fakeOrder.amount}</h2>
      </div>
    </Tailwind>
  );
}
