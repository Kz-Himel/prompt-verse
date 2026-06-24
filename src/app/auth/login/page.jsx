'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card, TextField, Label, InputGroup } from '@heroui/react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc'; 
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: authError } = await signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) {
        toast.error(authError.message || 'Invalid email or password');
      } else {
        toast.success('Successfully logged in!');
        
        // ⭐️ ফিক্সড লজিক: router.push এর বদলে window.location.href ব্যবহার করা হয়েছে
        // এর ফলে পেজটি রিফ্রেশ হয়ে ড্যাশবোর্ডে যাবে এবং নেভবার সাথে সাথে আপডেট হবে।
        // আপনার অথ ক্লায়েন্ট যেভাবে রোল (role) রিটার্ন করে সেই অনুযায়ী ডাটা চেক করুন (যেমন: data?.user?.role)
        const userRole = data?.user?.role || "user"; 

        if (userRole === "admin") {
          window.location.href = '/dashboard/admin';
        } else if (userRole === "creator") {
          window.location.href = '/dashboard/creator';
        } else {
          window.location.href = '/dashboard/user';
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: 'google' });
      toast.info('Connecting with Google...');
    } catch (err) {
      console.error(err);
      toast.error('Google sign in failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="p-6 sm:p-10 shadow-xl border border-slate-200/60 rounded-3xl bg-white">
          <div className="flex flex-col gap-6 w-full">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome Back
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                Log in to view premiums & track your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              
              {/* Email Input */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Email Address
                </Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaEnvelope className="text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm py-1.5"
                  />
                </InputGroup>
              </TextField>

              {/* Password Input */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Password
                </Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaLock className="text-slate-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm py-1.5"
                  />
                  <button className="focus:outline-none ml-auto" type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FaEyeSlash className="text-lg text-slate-400 hover:text-slate-600 transition-colors" />
                    ) : (
                      <FaEye className="text-lg text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>
                </InputGroup>
              </TextField>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={loading}
                radius="xl"
                size="lg"
                className="w-full bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-100 transition-transform hover:bg-indigo-700 active:scale-[0.98] mt-2"
              >
                Sign In
              </Button>
            </form>

            {/* Visual Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                Or connect with
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Login Button */}
            <Button
              variant="bordered"
              radius="xl"
              size="lg"
              onClick={handleGoogleLogin}
              startContent={<FcGoogle size={20} />}
              className="w-full border-slate-200 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            >
              Sign in with Google
            </Button>

            {/* Footer Redirect */}
            <p className="text-center text-sm text-slate-500">
              New to PromptVerse?{' '}
              <a href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}