import UserRegister from "@/modules/userregister";
import connectDB from "@/util/mongodbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    connectDB();
    const { email, newPass, confirmNewPass } = await request.json();
    console.log(email);
    try {
        // Find the user by email
        const user = await UserRegister.findOne({ email });

        // Check if the user exists
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Validate input data
        if (!newPass || !confirmNewPass || newPass !== confirmNewPass) {
            return NextResponse.json({ error: "New password and confirm password do not match" }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
