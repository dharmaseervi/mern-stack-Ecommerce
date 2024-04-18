import razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { amountInPaise, currency, orderId } = await request.json();
    console.log(amountInPaise, currency, orderId, 'amount, currency, orderId in razorpay route');

    const instance = new razorpay({
        key_id: process.env.RAZOR_SECRET_ID,
        key_secret: process.env.RAZOR_SECRET_KEY,
    });

    const options = {
        amount: amountInPaise,
        currency,
        receipt: orderId,
    };

    try {
        const response = await instance.orders.create(options);
        console.log('Razorpay order created:', response);

        // Extract relevant properties from the Razorpay response
        const { id, amount, currency, status } = response;


        return NextResponse.json({
            orderId: id,
            amount,
            currency,
            status
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.error('Failed to create Razorpay order', { status: 500 });
    }
}


