import cartModel from "@/modules/cart";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, guestCartItems } = await request.json();
        console.log(userId, guestCartItems, 'items merge');

        // Fetch the user's cart from the database
        const userCart = await cartModel.findOne({ user: userId });

        if (!userCart) {
            // If the user doesn't have a cart, create a new one
            const newCart = new cartModel({
                user: userId,
                items: [{
                    product: guestCartItems.productId,
                    quantity: guestCartItems.quantity,
                    price: guestCartItems.total,
                    size: guestCartItems.size
                }],
                modifiedOn: new Date()
            });
            await newCart.save();
            return NextResponse.json({
                message: 'Cart created and items merged',
                cart: newCart
            });
        }

        // Merge the guest cart items into the user's cart
        guestCartItems.forEach(guestItem => {
            const existingItem = userCart.items.find(item => item.product === guestItem.productId);
            if (existingItem) {
                // If the item already exists, update its quantity or other fields
                existingItem.quantity += guestItem.quantity;
                existingItem.price += guestItem.total; // Update the price if needed
            } else {
                // If the item doesn't exist, add it to the cart
                userCart.items.push({
                    product: guestItem.productId,
                    quantity: guestItem.quantity,
                    price: guestItem.total,
                    size: guestItem.size
                });
            }
        });

        // Update the modifiedOn field
        userCart.modifiedOn = new Date();

        // Save the updated cart to the database
        await userCart.save();

        return NextResponse.json({
            message: 'Items merged into user cart',
            cart: userCart
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
