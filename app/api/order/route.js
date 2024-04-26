import Order from "@/modules/order";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, cartItems, amount } = await request.json();
        console.log(userId, cartItems, amount, 'userId, cartItems, amount');
        // Check if all required fields are present
        if (!userId || !cartItems || !amount) {
            return res.status(400).json({ error: 'userId, cartItems, and amount are required' });
        }

        // Create an array to hold the items for the order
        const orderItems = cartItems.map(cartItem => ({
            product: cartItem.product._id,
            quantity: cartItem.quantity,
            price: cartItem.price
        }));
        console.log(orderItems, 'orderItems');

        // Create a new order instance and save it
        const userOrder = new Order({
            user: userId,
            items: orderItems,
            amount: amount,
        });
        console.log(userOrder, 'userOrder in order route');
        await userOrder.save();
       
        // Return the created order
        return NextResponse.json({ userOrder });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Fetch the latest order
        const latestOrder = await Order.findOne().sort({ _id: -1 });
        console.log(latestOrder, 'latestOrder in order route');
        return NextResponse.json({ latestOrder });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

