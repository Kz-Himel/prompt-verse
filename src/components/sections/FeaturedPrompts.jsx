"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { ArrowUpRight } from "@gravity-ui/icons";
// আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী PromptCard কম্পোনেন্টটি ইমপোর্ট করুন
import PromptCard from "../PromptCard";
import Link from "next/link";

export default function FeaturedPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPrompts = async () => {
      try {
        setLoading(true);
        const backendUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("access-token")
            : null;

        const response = await fetch(`${backendUrl}/prompts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch prompts from server");
        }

        const jsonResult = await response.json();

        if (jsonResult.success) {
          // রিকোয়ারমেন্ট অনুযায়ী হোম পেজে সর্বোচ্চ ৬টি ফিচারড প্রম্পট ফিল্টার/স্লাইস করা হলো
          // যদি আপনার ব্যাকএন্ড থেকে সর্ট করা না থাকে, তাহলে এখানে .slice(0, 6) করে নিতে পারেন
          setPrompts(jsonResult.data.slice(0, 6));
        } else {
          throw new Error(jsonResult.message || "Something went wrong");
        }
      } catch (err) {
        console.error("Error fetching featured prompts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPrompts();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_100%)]" />
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            ✨ Featured Collection
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Featured Prompts
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Handpicked high-converting prompt scripts vetted by our team.
            Discover premium prompts built to save time and maximize
            productivity.
          </p>

          <Link
            href="/prompts"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-xl"
          >
            <span>View All</span>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Loading & Error Handles */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Spinner
              size="lg"
              color="violet"
              label="Loading Featured Prompts..."
            />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-semibold py-10">
            ❌ {error}. Please try again later.
          </div>
        )}

        {/* Grid Using Your PromptCard Component */}
        {!loading && !error && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt._id || prompt.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
              >
                {/* আপনার PromptCard কম্পোনেন্টে প্রম্পটের ডাটা অবজেক্ট পাস করা হলো */}
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
