import * as React from 'react';
import { Tailwind } from "@react-email/components";

export default function Email(props) {
    const { order, productDetails, address, email } = props;
    return (
        <Tailwind>
            <div className='bg-slate-200 shadow-md p-4 border rounded-md my-3 mx-2'>
                <h1 className="text-3xl font-bold  mb-4">Order Confirmation</h1>
                <p className="text-black  font-serif font-medium">Hi {address.name},</p>
                <p className="mb-2">Thank you for your order. Here are the details:</p>

                <div className="mb-4">
                    <h2 className="text-xl font-bold">Shipping Address</h2>
                    <p>
                        {address.address},
                        {address.city}, {address.town},{address.state} - {address.pincode}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Contact Details</h2>
                    <p>Name:{address.name}</p>
                    <p>Mobile No:{address.mobileno}</p>
                    <p>Email Id:{email}</p>
                </div>
                <h2 className="text-xl font-bold mb-2">Order Details</h2>
                <table className="w-full mb-4">
                    <thead className=" bg-blue-200">
                        <tr>
                            <th className="text-left py-2 px-1">Image</th>
                            <th className="text-left py-2">Product</th>
                            <th className="text-left py-2">Price</th>
                            <th className="text-left py-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className='bg-slate-100 shadow-md p-3 '>
                        {productDetails.map((product, index) => (
                            <tr key={index} className="">
                                <td className="py-1 px-1"><img className='w-14 h-14 object-fill border rounded-md ' src={product.photo} alt="" /></td>
                                <td className="py-1 px-1">{product.name}</td>
                                <td className="py-1 px-1">&#8377;{product.price}</td>
                                <td className="py-1 px-1">{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="text-xl font-bold text-green-400">Order Total: &#8377;{order.amount}</h2>
            </div>

        </Tailwind>

    );
}
