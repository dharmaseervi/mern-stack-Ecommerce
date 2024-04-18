import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // This is where you reference the model for the product
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }

});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This references the User model
        required: true
    },
    items: [cartItemSchema],
    modifiedOn: {
        type: Date,
        default: Date.now
    }
});

const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel;
