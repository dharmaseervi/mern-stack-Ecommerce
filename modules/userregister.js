import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Use mongoose.model method directly to define the model
const UserRegister = mongoose.models.userregister || mongoose.model('userregister', userRegisterSchema);

export default UserRegister;
