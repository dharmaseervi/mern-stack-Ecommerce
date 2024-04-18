import Email from '@/components/email';
import addressModel from '@/modules/address';
import Order from '@/modules/order';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';


export async function POST(request) {
    try {
        const { email, subject, message, orderId, userId, selectedAddressId } = await request.json();
        console.log(email, 'email in email', subject, 'subject in email', message, 'message in email');

        const orderid = mongoose.Types.ObjectId.createFromHexString(orderId);

        const address = await addressModel.findById(selectedAddressId);
        const order = await Order.findById(orderid).populate({
            path: 'items',
            populate: {
                path: 'product',
                select: 'productname productprice photo' 
            }
        });

        console.log(order, 'order in email');

        // Extract product details from order items
        const productDetails = order.items.map(item => ({
            name: item.product.productname,
            price: item.product.productprice,
            quantity: item.quantity,
            photo: item.product.photo[0]
        }));

        console.log(productDetails, 'product details');

        // Create a transporter using Gmail's SMTP server
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
        const emailHtml = render(<Email order={order} productDetails={productDetails} address={address} email={email} />);

        // Prepare email data
        const mailData = {
            from: 'rajsharma@gmail.com',
            to: email,
            subject: subject,
            html: emailHtml
        };

        // Send the email
        await transporter.sendMail(mailData);

        // Return success response
        return NextResponse.json(200, { message: 'Email sent successfully', productDetails });
    } catch (error) {
        // Log and return error response
        console.error('Error sending email:', error);
        return NextResponse.json(500, { error: 'Failed to send email' });
    }
}

