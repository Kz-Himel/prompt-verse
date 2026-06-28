"use client";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiMail, FiShield, FiCpu, FiAward, FiArrowRight } from "react-icons/fi";

export default function ProfileCard({ userProfile }) {
  const router = useRouter();

  // প্যারেন্ট পেজ থেকে আসা ডাইনামিক ডেটা ডিস্ট্রাকচারিং
  const {
    name = "",
    email = "",
    photoURL = "",
    role = "",
    totalPrompts = 0,
    subscription = "",
  } = userProfile || {};

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto w-full"
    >
      <Card shadow="sm" className="border border-gray-100 bg-white rounded-2xl overflow-hidden p-6 md:p-8">
        
        {/* প্রোফাইল হেডার */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-100 shadow-xs bg-gray-50 flex-shrink-0">
            <img 
              src={photoURL} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
              }}
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
              {name}
            </h2>
            {email && (
              <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-1.5">
                <FiMail className="text-gray-400" /> {email}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-100">
                <FiShield className="text-xs" /> Role: {role}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                subscription.toLowerCase() === "premium" 
                  ? "bg-amber-50 text-amber-700 border-amber-200" 
                  : "bg-gray-50 text-gray-600 border-gray-200"
              }`}>
                <FiAward className="text-xs" /> {subscription} Account
              </span>
            </div>
          </div>
        </div>

        {/* প্রোফাইল স্ট্যাটস */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="p-4 bg-gray-50/60 border border-gray-100 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
              <FiCpu className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Prompts</p>
              <p className="text-xl font-bold text-gray-800 mt-0.5">{totalPrompts}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/60 border border-gray-100 rounded-xl flex items-center gap-4">
            <div className={`p-3 rounded-xl ${subscription.toLowerCase() === "premium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
              <FiAward className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Membership</p>
              <p className="text-xl font-bold text-gray-800 mt-0.5">{subscription}</p>
            </div>
          </div>
        </div>

        {/* আপগ্রেড ব্যানার */}
        {subscription.toLowerCase() === "free" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
          >
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-base">Upgrade to Premium</h4>
              <p className="text-xs text-purple-100 mt-0.5">Unlock ultimate private AI prompts, unlimited usage and pro tools.</p>
            </div>
            <button
              onClick={handleUpgrade}
              className="flex items-center gap-1.5 bg-white text-purple-700 hover:bg-purple-50 font-semibold px-4 py-2 rounded-xl text-sm transition-all flex-shrink-0 cursor-pointer shadow-xs"
            >
              Get Premium <FiArrowRight />
            </button>
          </motion.div>
        )}

      </Card>
    </motion.div>
  );
}