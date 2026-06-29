"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Card,
  TextField,
  Label,
  InputGroup,
} from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaLink,
  FaUserTie,
  FaPen,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();

  // state initialization
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
    role: "user", 
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
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // 🎯 ফিক্সড: authClient.signUp ব্যবহার করা হয়েছে
      const { error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL || undefined,
        role: formData.role, 
      });

      if (authError) {
        toast.error(authError.message || "Registration failed.");
        return;
      }

      toast.success(`Account created successfully as ${formData.role}!`);
      router.push("/auth/login"); 
    } catch (err) {
      console.error("Registration UI Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/user", 
      });
    } catch (err) {
      console.error("Google Auth UI Error:", err);
      toast.error("Google signup failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-100 sm:p-10 rounded-3xl">
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <FaUser className="text-xl" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create Account
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Join the community and start sharing amazing AI prompts.
              </p>
            </div>

            <form onSubmit={handleRegister} autoComplete="off" className="space-y-4">
              {/* Full Name */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Full Name</Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaUser className="text-slate-400" />
                  <Input 
                    placeholder="John Doe" 
                    autoComplete="new-name"
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className="w-full bg-transparent outline-none text-sm py-1.5" 
                  />
                </InputGroup>
              </TextField>

              {/* Email */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Email Address</Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaEnvelope className="text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    autoComplete="new-email"
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full bg-transparent outline-none text-sm py-1.5" 
                  />
                </InputGroup>
              </TextField>

              {/* Photo URL */}
              <TextField className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Photo URL (Optional)</Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaLink className="text-slate-400" />
                  <Input 
                    type="url" 
                    placeholder="" 
                    autoComplete="off"
                    value={formData.photoURL} 
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })} 
                    className="w-full bg-transparent outline-none text-sm py-1.5" 
                  />
                </InputGroup>
              </TextField>

              {/* Account Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account Type</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, role: "user" }))}
                    className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-all duration-200 ${formData.role === "user" ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${formData.role === "user" ? "bg-indigo-100 text-indigo-600" : "bg-slate-50 text-slate-400"}`}>
                      <FaUserTie className="text-base" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900 leading-tight">User</p>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Browse prompts</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, role: "creator" }))}
                    className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-all duration-200 ${formData.role === "creator" ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${formData.role === "creator" ? "bg-indigo-100 text-indigo-600" : "bg-slate-50 text-slate-400"}`}>
                      <FaPen className="text-sm" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900 leading-tight">Creator</p>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Create & sell</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Password</Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaLock className="text-slate-400" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    autoComplete="new-password"
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    className="w-full bg-transparent outline-none text-sm py-1.5" 
                  />
                  <button className="focus:outline-none ml-auto" type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash className="text-lg text-slate-400" /> : <FaEye className="text-lg text-slate-400" />}
                  </button>
                </InputGroup>
              </TextField>

              {/* Confirm Password */}
              <TextField isRequired className="space-y-1.5 w-full">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Confirm Password</Label>
                <InputGroup className="border rounded-xl border-slate-200 px-3 py-1 flex items-center gap-2 focus-within:border-indigo-600 transition-colors">
                  <FaLock className="text-slate-400" />
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    autoComplete="new-password"
                    value={formData.confirmPassword} 
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                    className="w-full bg-transparent outline-none text-sm py-1.5" 
                  />
                  <button className="focus:outline-none ml-auto" type="button" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash className="text-lg text-slate-400" /> : <FaEye className="text-lg text-slate-400" />}
                  </button>
                </InputGroup>
              </TextField>

              <Button type="submit" isLoading={loading} radius="xl" size="lg" className="w-full bg-indigo-600 font-semibold text-white shadow-lg mt-2">
                Create Account
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Or continue with</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Button variant="bordered" radius="xl" size="lg" isLoading={googleLoading} onPress={handleGoogleSignup} startContent={!googleLoading && <FcGoogle size={20} />} className="w-full border-slate-200 font-medium text-slate-700 hover:bg-slate-50">
              Continue with Google
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}