import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'orderPlaced'
    }
}, {
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
