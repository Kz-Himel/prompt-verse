"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { ArrowUpRight } from "@gravity-ui/icons";
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
        const Backend_url = process.env.NEXT_PUBLIC_API_URL;
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("access-token")
            : null;

        const response = await fetch(`${Backend_url}/prompts`, {
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
    <section className="relative overflow-hidden bg-[#EBF1F5] py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EBF1F5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0F766E] shadow-[3px_3px_6px_#c7d0d8,-3px_-3px_6px_#ffffff] border border-white/60">
            Featured Collection
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl">
            Featured Prompts
          </h2>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#64748B] font-medium">
            Handpicked high-converting prompt scripts vetted by our team.
            Discover premium prompts built to save time and maximize
            productivity.
          </p>

          {/* Neumorphic "View All" Button */}
          <Link
            href="/prompts"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#EBF1F5] px-6 py-2.5 text-xs md:text-sm font-bold text-[#1E293B] shadow-[5px_5px_12px_#c7d0d8,-5px_-5px_12px_#ffffff] border border-white/60 transition-all duration-300 hover:text-[#0F766E] active:shadow-[inset_2px_2px_4px_#c7d0d8,inset_-2px_-2px_4px_#ffffff]"
          >
            <span>View All</span>

            <ArrowUpRight
              size={16}
              className="text-[#0F766E] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Loading Handle */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Spinner
              size="lg"
              className={{
                circle1: "border-b-[#0F766E]",
                circle2: "border-b-[#0F766E]",
              }}
              label="Loading Featured Prompts..."
            />
          </div>
        )}

        {/* Error Handle */}
        {error && (
          <div className="mx-auto max-w-md rounded-2xl bg-[#EBF1F5] p-6 text-center text-red-500 font-bold shadow-[inset_3px_3px_6px_#c7d0d8,inset_-3px_-3px_6px_#ffffff] border border-white/40">
            ❌ {error}. Please try again later.
          </div>
        )}

        {/* Grid Using Updated Neumorphic PromptCard */}
        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt._id || prompt.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
              >
                <PromptCard prompt={prompt} index={index} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}