import mongoose from "mongoose";
import UserCheckout from "@/modules/usercheckout";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, cartId, paymentId, addressId, status, order } = await request.json();
        console.log(userId, cartId, paymentId, addressId, status, order, 'data in savePayment route');

        const addressObj = mongoose.Types.ObjectId.createFromHexString(addressId);
        const userCheckout = new UserCheckout({
            user: userId,
            cart: cartId,
            order: order,
            payment: paymentId,
            address: addressObj,
            status: status

        });
        const savedUserCheckout = await userCheckout.save();
        console.log(savedUserCheckout, 'savedUserCheckout');
        return NextResponse.json({ userCheckout: savedUserCheckout });

    } catch (error) {
        console.error('Error creating payment:', error);
        return NextResponse.error('Failed to save payment', { status: 500 });
    }
}

export async function GET(request) {
    try {


        if (request.headers.get("Referer")?.includes("/confirmation")) {
            const userCheckout = await UserCheckout
                .find()
                .sort({ createdAt: -1 })
                .limit(1)
                .populate({
                    path: 'order',
                    populate: {
                        path: 'items',
                        populate: {
                            path: 'product'
                        }
                    }
                }).populate('address');
            console.log(userCheckout, 'userCheckout in confirmation route');
            return NextResponse.json({ latestOrder: userCheckout[0] });
        } else {
            const { searchParams } = new URL(request.url);
            const userId = searchParams.get('query');
            const id = mongoose.Types.ObjectId.createFromHexString(userId);
            const userCheckout = await UserCheckout
                .find({ user: id })
                .populate({
                    path: 'order',
                    populate: {
                        path: 'items',
                        populate: {
                            path: 'product'
                        }
                    }
                }).populate('address');
            console.log(userCheckout, 'check in order history route');
            return NextResponse.json({ orders: userCheckout });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.error('Failed to fetch orders', { status: 500 });
    }
}
