import { NextResponse } from 'next/server';
import crypto from 'crypto';
export async function POST(request) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();
        const secret = process.env.RAZOR_SECRET_KEY;

        const shasum = crypto.createHmac("sha256", secret);

        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction not legit!" });
        }

        return NextResponse.json({
            success: true,
            msg: "Payment was successful",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id
        });
        

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.error('Failed to create order', { status: 500 });
    }
}