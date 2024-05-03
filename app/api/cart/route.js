import mongoose from 'mongoose';
import cartModel from '@/modules/cart';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { userId, productId, quantity, total, size } = await request.json();

        const id = mongoose.Types.ObjectId.createFromHexString(userId);

        let cart = await cartModel.findOne({ user: id });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new cartModel({
                user: userId,
                items: [{ product: productId, quantity, price: total, size }],
                modifiedOn: new Date()
            });
        } else {
            // Check if the product already exists in the cart
            const existingItem = cart.items.find(item => item.product === productId);

            if (existingItem) {
                // If the product already exists, update its quantity and price
                existingItem.quantity += quantity;
                existingItem.price += total;
            } else {
                // If the product doesn't exist, add it to the cart
                cart.items.push({ product: productId, quantity, price: total, size });
            }

            // Update the modifiedOn field
            cart.modifiedOn = new Date();
        }

        await cart.save();
        console.log('Item(s) added to cart', cart);
        return NextResponse.json({
            message: 'Item(s) added to cart',
            cart
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { userId, productId, quantity, total, status } = await request.json();
        console.log(userId, productId, quantity, total, 'userId, productId, quantity, total');
        const id = mongoose.Types.ObjectId.createFromHexString(userId);
        const cart = await cartModel.findOne({ user: id });
        console.log(cart, 'cart');

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        const cartItem = cart.items.find(item => item.product == productId);
        console.log(cartItem, 'cartItem');

        if (!cartItem) {
            return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
        }
        cartItem.quantity = quantity;
        cart.modifiedOn = new Date();

        cart.status = status;


        await cart.save();
        console.log('Item updated in cart', cart);
        return NextResponse.json({
            message: 'Item updated in cart',
            cart
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const { userId, productIds, status } = await request.json();
        console.log(userId, productIds, status, 'userId, productIds, status');
        const id = mongoose.Types.ObjectId.createFromHexString(userId);
        const cart = await cartModel.findOne({ user: id });
        console.log(cart, 'cart');

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        for (const productId of productIds) {
            // Use $[<identifier>] syntax with arrayFilters for more complex updates
            const updateResult = await cartModel.updateOne(
                { _id: cart._id },
                { $set: { "items.$[item].status": status } },
                { arrayFilters: [{ "item.product": productId }] }
            );

            if (updateResult.nModified === 0) {
                console.error(`Item with productId ${productId} not found in cart`);
            }
        }

        cart.modifiedOn = new Date();

        await cart.save();
        console.log('Items updated in cart', cart);
        return NextResponse.json({
            message: 'Items updated in cart',
            cart
        });
    } catch (error) {
        console.error('Error:', error);

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // Extract the request body
        const { userId, productId } = await request.json();
        console.log(userId, productId);

        // Find the cart for the user
        const id = mongoose.Types.ObjectId.createFromHexString(userId);
        const cart = await cartModel.findOne({ user: id });

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        // Find the index of the item to remove
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        await cart.save();
        console.log('Item removed from cart', cart);
        return NextResponse.json({
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        const id = mongoose.Types.ObjectId.createFromHexString(userId);

        // Find the cart for the user
        const cart = await cartModel.findOne({ user: id }).populate('items.product');


        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }
        const pendingItems = cart.items.filter(item => item.status === 'pending');

        let cartId = null;
        if (id) {
            cartId = await cartModel.findOne({ user: id })
        }
        return NextResponse.json({ pendingItems, cartId });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

