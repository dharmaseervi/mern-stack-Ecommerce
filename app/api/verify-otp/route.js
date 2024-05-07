import UserRegister from "@/modules/userregister";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import Otp from "@/modules/otp";



export async function POST(request) {
    try {
        const { email, otp } = await request.json();

        // Find the user by email
        const user = await UserRegister.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Find the OTP document by email
        const otpDocument = await Otp.findOne({ email });
        if (!otpDocument) {
            return NextResponse.json({ error: 'OTP not found' }, { status: 404 });
        }

        // Compare the entered OTP with the hashed OTP from the database
        const isMatch = await bcrypt.compare(otp.toString(), otpDocument.otp);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // Delete the OTP record from the database
        await Otp.findOneAndDelete({ email });
        
        // If OTP is verified successfully, you can proceed with password reset logic here
        // For example: allow the user to reset their password

        return NextResponse.json({ msg: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
