'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../../useraccounts/layout';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const { editid } = params;
    const userId = editid;
    const router = useRouter();
    const [registerform, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = registerform;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/register?query=${editid}`);
                if (!res.ok) {
                    const errorMessage = await res.text();
                    throw new Error(errorMessage);
                }
                const data = await res.json();
                console.log(data);
                setRegisterForm(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [editid]);

    const handleChangePassword = async () => {
        setIsPasswordChange(!isPasswordChange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isPasswordChange) {
                if (newPassword !== confirmPassword) {
                    setError('New password and confirm password do not match');
                    throw new Error('New password and confirm password do not match');
                } else if (!isPasswordValid(newPassword)) {
                    setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                    throw new Error('Password validation failed');
                }
            }
            setError(null);
            const res = await fetch(`/api/register/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, userId, oldPassword, newPassword, confirmPassword })
            });
            if (!res.ok) {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
            const data = await res.json();
            setSuccessful(true);
            handleChangePassword();
            console.log(data); // Log the response data
            // Redirect the user to the profile page or any other page after successful update
            router.push('/useraccount'); // Replace '/profile' with the desired destination
        } catch (error) {
            console.error('Error updating user data:', error);
        }
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const isPasswordValid = (password) => {
        // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Layout>
            <div className='w-full h-full rounded-md flex'>
                <div className="w-full mt-8">
                    <form className=" lg:grid lg:grid-cols-2 gap-2" onSubmit={handleSubmit}>
                        <div className='lg:col-span-1 border rounded-md p-3 mb-3'>
                            <h1 className="text-xl font-semibold mb-4">Personal Information</h1>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Update your personal information below:</p>
                            </div>
                        </div>
                        <div className='lg:col-span-1 border rounded-md p-3 h-4/3'>
                            {isPasswordChange ? (
                                <div>
                                    <div>
                                        <label htmlFor="old-password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Old Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="old-password"
                                                name="old-password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
                                            New Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="new-password"
                                                name="new-password"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm-password"
                                                name="confirm-password"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <div>
                                            <p className="mt-2 text-sm text-red-500">{error}</p>
                                        </div>
                                        <div>
                                            <button type='button' className="my-2 text-sm text-blue-500" onClick={handleChangePassword}>
                                                Back
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className=''>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            full name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={registerform.name}
                                                onChange={(e) => setRegisterForm({ ...registerform, name: e.target.value })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={registerform.email}
                                                onChange={(e) => setRegisterForm({ ...registerform, email: e.target.value })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                value={registerform.password}
                                                onChange={(e) => setRegisterForm({ ...registerform, password: e.target.value })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <button type='button' className="mb-2 text-sm text-blue-500" onClick={handleChangePassword}>
                                                change password?
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    save
                                </button>
                            </div>
                            <div>
                                <p className="mt-2 text-sm text-green-500">{successful ? 'Successfully updated' : null}</p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Layout>

    );
};

export default Page;
