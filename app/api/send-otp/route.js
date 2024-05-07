import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Otp from "@/modules/otp";
import UserRegister from "@/modules/userregister";

export async function POST(request) {
    try {
        const { email } = await request.json();

        // Check if the user exists
        const user = await UserRegister.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Generate a random OTP and hash it
        const otp = crypto.randomInt(100000, 999999);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);

        // Save the OTP in the database
        await Otp.findOneAndUpdate(
            { email },
            { otp: hashedOtp },
            { upsert: true }
        );

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // Configure email message
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Log email response
        console.log('Email sent:', info.response);

        // Return success response
        return NextResponse.json({ msg: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
    }
}
