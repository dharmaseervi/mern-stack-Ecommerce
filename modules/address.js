import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    mobileno: { type: Number, required: true },
    isDefault: {
        type: Boolean,
        default: false // Default value is false
    }

});

const addressModel = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default addressModel;
