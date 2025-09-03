'use client'
import { toast } from "sonner";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/lib/api';
import { useAuthStore } from '@/app/lib/store';

import Link from 'next/link';

const page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.post('/signup', { name, email, password });

            // save user globally in store
            setUser(res.data.user);
            toast.success("Signup successfull");
            router.push('/'); // redirect home
        } catch (err: any) {
            const backendData = err.response?.data;
            let errorMessage = '';

            if (backendData?.error) {
                errorMessage = backendData.error[0]?.msg || 'Signup failed';
            } else if (backendData?.message) {
                errorMessage = backendData.message;
            } else {
                errorMessage = 'Signup failed';
            }

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
                            <div className="mt-2">
                                <input id="name" type="string"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required autoComplete="name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                            <div className="mt-2">
                                <input id="email" type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">
                                {loading ? "Signing up..." : "Sign up"}
                            </button>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Already a member?
                        <Link href={'/auth/login'} className="font-semibold text-indigo-400 hover:text-indigo-300">Login</Link>
                        <Link href={'/'} className="font-semibold text-indigo-400 hover:text-indigo-300">Go to home</Link>

                    </p>
                </div>
            </div>
        </>
    )
}

export default page