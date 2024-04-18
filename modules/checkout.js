import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'canceled'],
        default: 'pending'
    },

    createdAt: Date,
    updatedAt: Date,
});



export default mongoose.models.Checkout || mongoose.model('Checkout', checkoutSchema);




