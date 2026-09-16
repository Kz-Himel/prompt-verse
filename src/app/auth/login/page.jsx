'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@heroui/react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc'; 
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) {
        toast.error(authError.message || 'Invalid email or password');
      } else {
        toast.success('Successfully logged in!');
        
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
      console.error("Login UI Error:", err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ 
        provider: 'google',
        callbackURL: '/dashboard/user'
      });
      toast.info('Connecting with Google...');
    } catch (err) {
      console.error("Google Login UI Error:", err);
      toast.error('Google sign in failed.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Soft UI Elevated Main Card */}
        <Card className="p-6 sm:p-10 border-none rounded-3xl bg-[var(--card)] shadow-[8px_8px_20px_rgba(0,0,0,0.06),-8px_-8px_20px_rgba(255,255,255,0.8)] dark:shadow-[10px_10px_24px_#080b0f,-4px_-4px_16px_rgba(255,255,255,0.02)]">
          <div className="flex flex-col gap-6 w-full">
            
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                Log in to view premiums & track your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5" autoComplete="on">
              
              {/* Email Input Field */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Email Address
                </label>
                
                <div className="flex items-center rounded-2xl bg-[var(--card)] px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                  <FaEnvelope className="text-[var(--primary)] shrink-0 mr-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Password
                </label>
                
                <div className="flex items-center rounded-2xl bg-[var(--card)] px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                  <FaLock className="text-[var(--primary)] shrink-0 mr-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                  <button className="focus:outline-none ml-2 cursor-pointer" type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FaEyeSlash className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    ) : (
                      <FaEye className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-xs text-[var(--primary)] hover:underline font-semibold">
                  Forgot Password?
                </a>
              </div>

              {/* Primary Submit Button */}
              <Button
                type="submit"
                isLoading={loading}
                radius="xl"
                size="lg"
                className="w-full bg-[var(--primary)] font-semibold text-white border-none shadow-[3px_3px_8px_rgba(15,118,110,0.35)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] active:scale-[0.99] transition-all cursor-pointer mt-1 py-3.5 focus:outline-none"
              >
                Sign In
              </Button>
            </form>

            {/* Visual Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[var(--border)]"></div>
              <span className="flex-shrink mx-4 text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-wider">
                Or connect with
              </span>
              <div className="flex-grow border-t border-[var(--border)]"></div>
            </div>

            {/* Google Login Button */}
            <Button
              variant="bordered"
              radius="xl"
              size="lg"
              isLoading={googleLoading}
              onClick={handleGoogleLogin}
              startContent={!googleLoading && <FcGoogle size={18} />}
              className="w-full border-none bg-[var(--card)] text-[var(--text)] font-semibold shadow-[3px_3px_8px_rgba(0,0,0,0.05),-3px_-3px_8px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_8px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] dark:hover:shadow-[inset_2px_2px_5px_#080b0f,inset_-2px_-2px_5px_rgba(255,255,255,0.02)] transition-all cursor-pointer py-3.5 focus:outline-none"
            >
              Sign in with Google
            </Button>

            {/* Footer Redirect */}
            <p className="text-center text-xs sm:text-sm text-[var(--text-muted)] font-medium">
              New to PromptVerse?{' '}
              <a href="/auth/register" className="font-bold text-[var(--primary)] hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}