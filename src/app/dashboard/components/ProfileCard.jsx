"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiMail, FiShield, FiCpu, FiAward, FiArrowRight } from "react-icons/fi";

export default function ProfileCard({ userProfile }) {
  const router = useRouter();

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

  const isPremium = subscription.toLowerCase() === "premium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="neu-card rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 transition-all">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-black/5 dark:border-white/5">
          {/* Neumorphic Avatar Wrapper */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden neu-card p-1 flex-shrink-0">
            <img 
              src={photoURL} 
              alt={name} 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
              }}
            />
          </div>

          <div className="text-center md:text-left space-y-1">
            <h2 className="text-xl font-bold text-[var(--text)] flex items-center justify-center md:justify-start gap-2">
              {name}
            </h2>
            
            {email && (
              <p className="text-sm text-[var(--text-muted)] flex items-center justify-center md:justify-start gap-1.5 font-medium">
                <FiMail className="text-[var(--text-muted)] opacity-80" /> {email}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-black/5 dark:bg-white/5 text-[var(--text)] text-xs font-semibold px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 shadow-xs">
                <FiShield className="text-xs text-[var(--primary)]" /> Role: {role}
              </span>

              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shadow-xs ${
                isPremium 
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" 
                  : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)] border-black/5 dark:border-white/5"
              }`}>
                <FiAward className="text-xs" /> {subscription} Account
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
          <div className="neu-card p-4 rounded-xl flex items-center gap-4 border border-black/5 dark:border-white/5">
            <div className="p-3.5 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] neu-card">
              <FiCpu className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Prompts</p>
              <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{totalPrompts}</p>
            </div>
          </div>

          <div className="neu-card p-4 rounded-xl flex items-center gap-4 border border-black/5 dark:border-white/5">
            <div className={`p-3.5 rounded-xl neu-card ${
              isPremium 
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}>
              <FiAward className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Membership</p>
              <p className="text-2xl font-bold text-[var(--text)] mt-0.5">{subscription}</p>
            </div>
          </div>
        </div>

        {/* Upgrade Banner */}
        {!isPremium && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-5 rounded-2xl bg-[var(--primary)] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-[var(--primary)]/20"
          >
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-base tracking-wide">Upgrade to Premium</h4>
              <p className="text-xs text-white/80 mt-1">Unlock ultimate private AI prompts, unlimited usage and pro tools.</p>
            </div>
            <button
              onClick={handleUpgrade}
              className="flex items-center gap-2 bg-white text-[var(--primary)] hover:bg-white/90 font-bold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95 flex-shrink-0 cursor-pointer shadow-md"
            >
              Get Premium <FiArrowRight />
            </button>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}