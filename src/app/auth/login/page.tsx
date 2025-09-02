'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/lib/api';
import { useAuthStore } from '@/app/lib/store';

import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post('/login', { email, password });

      // save user globally in store
      setUser(res.data.user);


      router.push('/'); // redirect home
    } catch (err: any) {
      const backendData = err.response?.data;
      let errorMessage = '';

      if (backendData?.error) {
        errorMessage = backendData.error[0]?.msg || 'Login failed';
      } else if (backendData?.message) {
        errorMessage = backendData.message;
      } else {
        errorMessage = 'Login failed';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder-gray-500  outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder-gray-500  outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-800  focus:outline-2 focus:outline-indigo-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="mt-2 text-red-400">{error}</p>}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{' '}
          <Link href="/auth/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
