import mongoose from "mongoose";

const razorpayidSchema = new mongoose.Schema({
    paymentid: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

const Razorpayid = mongoose.models.Razorpayid || mongoose.model('Razorpayid', razorpayidSchema);

export default Razorpayid;

