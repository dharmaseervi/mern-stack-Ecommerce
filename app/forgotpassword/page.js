'use client'
// Frontend (PasswordResetPage.js)
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PasswordResetPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setSatus] = useState('')


    const handleRequestOTP = async () => {
        // Call backend API to send OTP to user's email
        const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        console.log(res);
        if (res.ok) {
            // Redirect user to enter OTP
            router.push(`/verify-reset/${email}`);
            setSatus('OTP sent successfully')

        } else {
            // Handle error
            console.error('Failed to send OTP');
        }
    };

    const handleResetPassword = async () => {
        // Call backend API to verify OTP and reset password
        const res = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword }),
        });
        if (res.ok) {
            // Redirect user to login page or home page
            router.push('/login');
        } else {
            // Handle error
            console.error('Failed to reset password');
        }
    };

    return (
        <div className='mx-auto max-w-md min-h-screen space-y-6 py-12 flex justify-center items-center '>
            <div className='w-full max-w-md p-8 space-y-8  rounded-lg'>
                <div className='space-y-2 text-center'>
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input className='rounded' id="email" placeholder="m@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button onClick={handleRequestOTP} className="rounded bg-black text-white p-3 w-full" type="submit">
                        Send OTP
                    </button>
                    <p className='text-green-500'>{status}</p>
                </div>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Remember your password?
                    <Link className="font-medium underline" href="/signin">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
