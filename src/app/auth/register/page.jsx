'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card, CardBody } from '@heroui/react';
import { Envelope, Padlock, Person, Link, LogoGoogle } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client'; // আপনার ক্লায়েন্ট পাথ দিন

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', photoURL: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Better Auth এর signUp মেথড ব্যবহার করে রেজিস্ট্রেশন
    const { data, error: authError } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.photoURL, // Better Auth ডিফল্টভাবে প্রোফাইল ছবির জন্য 'image' ফিল্ড ব্যবহার করে
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Registration failed. Try again.');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-xl border border-slate-100 rounded-2xl bg-white">
          <CardBody className="gap-4">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
              <p className="text-sm text-slate-500 mt-2">Join PromptHub & explore premium AI prompts</p>
            </div>

            {error && <div className="p-3 bg-danger-50 text-danger text-sm rounded-xl text-center font-medium">{error}</div>}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                variant="bordered"
                radius="lg"
                startContent={<Person className="text-slate-400" />}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                label="Email Address"
                placeholder="name@example.com"
                variant="bordered"
                radius="lg"
                startContent={<Envelope className="text-slate-400" />}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                type="url"
                label="Photo URL"
                placeholder="https://example.com/avatar.jpg"
                variant="bordered"
                radius="lg"
                startContent={<Link className="text-slate-400" />}
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                required
              />
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                variant="bordered"
                radius="lg"
                startContent={<Padlock className="text-slate-400" />}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 radius-xl transition-all shadow-lg shadow-indigo-100"
                isLoading={loading}
              >
                Sign Up
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-wider">Or register with</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* সোশাল লগইনেও ডেটাবেজ হুকের মাধ্যমে রোল 'User' সেট হয়ে যাবে */}
            <Button
              variant="bordered"
              radius="lg"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium py-5"
              startContent={<LogoGoogle width={18} height={18} />}
              onClick={async () => {
                await signIn.social({ provider: "google" });
              }}
            >
              Google
            </Button>

            <p className="text-center text-sm text-slate-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 font-bold hover:underline transition-all">
                Log In
              </a>
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}