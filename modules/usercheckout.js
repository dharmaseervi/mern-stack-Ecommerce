import mongoose from "mongoose";
import Cart from "./cart";
import Address from "./address";
import Order from "./order";
import ProductModel from "./products";




const userCheckoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    payment: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});


const UserCheckout = mongoose.models.UserCheckout || mongoose.model('UserCheckout', userCheckoutSchema);

export default UserCheckout;