import { NextResponse } from "next/server";
import Otp from "@/modules/otp";

export async function POST(request) {
    try {
        const { email } = await request.json();

        const otp = await Otp.findOne({ email });
        if (!otp) {
            return NextResponse.json({ error: 'OTP not found for the given email' });
        }
        return NextResponse.json({ msg: 'OTP verified successfully', otpGenerated: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'An error occurred while checking OTP' }, { status: 500 });
    }
}
