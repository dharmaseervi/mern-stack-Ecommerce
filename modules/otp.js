import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure each user has only one OTP at a time
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Set expiration time for OTP documents (in seconds)
    },
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);

export default Otp;