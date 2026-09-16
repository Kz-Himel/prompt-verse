'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@heroui/react';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaLink,
  FaUserTie,
  FaPen,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL || undefined,
        role: formData.role,
      });

      if (authError) {
        toast.error(authError.message || 'Registration failed.');
        setLoading(false);
        return;
      }

      toast.success(`Account created successfully as ${formData.role}!`);
      router.push('/auth/login');
    } catch (err) {
      console.error('Registration UI Error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard/user',
      });
    } catch (err) {
      console.error('Google Auth UI Error:', err);
      toast.error('Google signup failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md my-8"
      >
        {/* Soft UI Elevated Main Card */}
        <Card className="p-6 sm:p-10 border-none rounded-3xl bg-[var(--card)] shadow-[8px_8px_20px_rgba(0,0,0,0.06),-8px_-8px_20px_rgba(255,255,255,0.8)] dark:shadow-[10px_10px_24px_#080b0f,-4px_-4px_16px_rgba(255,255,255,0.02)]">
          <div className="flex flex-col gap-6 w-full">
            
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                Join the community and start sharing amazing AI prompts.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="flex flex-col gap-4" autoComplete="off">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Full Name
                </label>
                <div className="flex items-center rounded-2xl bg-[var(--card)] px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                  <FaUser className="text-[var(--primary)] shrink-0 mr-3" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    autoComplete="new-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                </div>
              </div>

              {/* Email Address */}
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
                    autoComplete="new-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Photo URL (Optional)
                </label>
                <div className="flex items-center rounded-2xl bg-[var(--card)] px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                  <FaLink className="text-[var(--primary)] shrink-0 mr-3" />
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    autoComplete="off"
                    value={formData.photoURL}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                </div>
              </div>

              {/* Account Type (Soft UI Toggle Buttons) */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: 'user' }))}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border-none text-left ${
                      formData.role === 'user'
                        ? 'bg-[var(--card)] text-[var(--primary)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)] font-bold'
                        : 'bg-[var(--card)] text-[var(--text-muted)] shadow-[3px_3px_8px_rgba(0,0,0,0.05),-3px_-3px_8px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_8px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <FaUserTie className="text-base shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-tight">User</p>
                      <span className="text-[10px] opacity-75 font-medium whitespace-nowrap">Browse prompts</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: 'creator' }))}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border-none text-left ${
                      formData.role === 'creator'
                        ? 'bg-[var(--card)] text-[var(--primary)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)] font-bold'
                        : 'bg-[var(--card)] text-[var(--text-muted)] shadow-[3px_3px_8px_rgba(0,0,0,0.05),-3px_-3px_8px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_8px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)]'
                    }`}
                  >
                    <FaPen className="text-sm shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-tight">Creator</p>
                      <span className="text-[10px] opacity-75 font-medium whitespace-nowrap">Create & sell</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Password */}
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none ml-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    ) : (
                      <FaEye className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Confirm Password
                </label>
                <div className="flex items-center rounded-2xl bg-[var(--card)] px-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_3px_3px_6px_#080b0f,inset_-2px_-2px_6px_rgba(255,255,255,0.02)]">
                  <FaLock className="text-[var(--primary)] shrink-0 mr-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] py-3.5"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="focus:outline-none ml-2 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    ) : (
                      <FaEye className="text-base text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Primary Submit Button */}
              <Button
                type="submit"
                isLoading={loading}
                radius="xl"
                size="lg"
                className="w-full bg-[var(--primary)] font-semibold text-white border-none shadow-[3px_3px_8px_rgba(15,118,110,0.35)] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] active:scale-[0.99] transition-all cursor-pointer mt-2 py-3.5 focus:outline-none"
              >
                Create Account
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

            {/* Google Signup Button */}
            <Button
              variant="bordered"
              radius="xl"
              size="lg"
              isLoading={googleLoading}
              onClick={handleGoogleSignup}
              startContent={!googleLoading && <FcGoogle size={18} />}
              className="w-full border-none bg-[var(--card)] text-[var(--text)] font-semibold shadow-[3px_3px_8px_rgba(0,0,0,0.05),-3px_-3px_8px_rgba(255,255,255,0.7)] dark:shadow-[3px_3px_8px_#080b0f,-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] dark:hover:shadow-[inset_2px_2px_5px_#080b0f,inset_-2px_-2px_5px_rgba(255,255,255,0.02)] transition-all cursor-pointer py-3.5 focus:outline-none"
            >
              Sign up with Google
            </Button>

            {/* Footer Redirect */}
            <p className="text-center text-xs sm:text-sm text-[var(--text-muted)] font-medium">
              Already have an account?{' '}
              <a href="/auth/login" className="font-bold text-[var(--primary)] hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}