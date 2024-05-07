'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

export default function ResetPasswordPage({ params }) {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const refs = useRef([...Array(6)].map(() => React.createRef()));
    const router = useRouter();
    const { emailid } = params
    const decodedEmail = decodeURIComponent(emailid);
    const [operationStatus, setOperationStatus] = useState('');
    const [isPasswordUpdateEnabled, setIsPasswordUpdateEnabled] = useState(false)
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')
    const [error, setError] = useState('')
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

    useEffect(() => {
        // Call your backend API to check if OTP has been generated
        const checkIfOTPGenerated = async () => {
            try {
                const response = await fetch('/api/check-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: decodedEmail }),
                });
                const data = await response.json();
                if (!data.otpGenerated) {
                    router.push('/');
                    return;  // Redirect to home page if OTP has not been generated
                }
            } catch (error) {
                console.error('Error checking OTP:', error);
            }
        };

        checkIfOTPGenerated();
    }, [decodedEmail, router]);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time left for display
    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeLeftClassName = seconds <= 30 ? 'text-red-500' : 'text-green-900'; // Change color to red when time left is less than 30 seconds
        return <span className={timeLeftClassName}>Time left: {minutes}m : {remainingSeconds < 10 ? '0' : ''}{remainingSeconds}s</span>;
    };


    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            refs.current[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            refs.current[index - 1].current.focus();
        }
    };


    const handleVerifyOtp = async () => {
        // Call backend API to verify OTP 
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: decodedEmail, otp: otp.join('') }),
        });
        if (res.ok) {
            setOperationStatus('otp successfully verified!!')
            setIsPasswordUpdateEnabled(true);
        } else {
            // Handle error
            setOperationStatus('invalid otp!!')
            console.error('Failed to reset password');
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            const res = await fetch('/api/reset-password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: decodedEmail, newPass, confirmNewPass }),
            });
            if (res.ok) {
                router.push('/signin');
            } else {
                setError('Failed to update password');
                console.error('Failed to update password');
            }
        } catch (error) {
            setError('Server error');
            console.error('Failed to update password:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 rounded-lg">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Update Password</h1>
                    <p className='text-slate-500'>Enter your email and the OTP sent to your email to update your password.</p>
                </div>
                <div className="space-y-2">
                    <label htmlFor="otp">OTP</label>
                    <div className="flex justify-between">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                maxLength={1}
                                ref={refs.current[index]}
                                value={otp[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <button className={`${timeLeft <= 0 ? 'bg-gray-400' : 'bg-black'} rounded text-white py-3 w-full`} onClick={handleVerifyOtp} disabled={timeLeft <= 0}>
                        Verify OTP
                    </button>
                    <p className='mt-1'>{formatTimeLeft(timeLeft)}</p>
                    <p className={`${operationStatus === 'invalid otp!!' ? 'text-red-600' : 'text-green-700'} mt-2`}>{operationStatus}</p>
                </div>
                <div className="space-y-6">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password">New Password</label>
                        <input
                            autoComplete="new-password"
                            id="password"
                            name="password"
                            placeholder="Enter a new password"
                            required
                            type="password"
                            className={`rounded border border-gray-300 px-3 py-2 ${!isPasswordUpdateEnabled ? 'bg-gray-100 text-gray-500' : ''}`}
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            disabled={!isPasswordUpdateEnabled}

                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            autoComplete="new-password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm your new password"
                            required
                            type="password"
                            className={`rounded border border-gray-300 px-3 py-2 ${!isPasswordUpdateEnabled ? 'bg-gray-100 text-gray-500' : ''}`}
                            value={confirmNewPass}
                            onChange={(e) => setConfirmNewPass(e.target.value)}
                            disabled={!isPasswordUpdateEnabled}
                        />
                    </div>
                    <button disabled={!isPasswordUpdateEnabled} className={`rounded py-3 w-full ${!isPasswordUpdateEnabled ? 'bg-gray-400 text-gray-700' : 'bg-black text-white'}`} onClick={handlePasswordUpdate}>
                        Update Password
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
}
