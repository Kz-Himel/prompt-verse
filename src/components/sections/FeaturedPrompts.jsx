"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
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
    <section className="relative overflow-hidden bg-[var(--bg)] py-20 lg:py-28 transition-colors duration-300">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          {/* Neumorphic Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--primary)] neu-badge">
            Featured Collection
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl leading-tight">
            Featured Prompts
          </h2>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Handpicked high-converting prompt scripts vetted by our team.
            Discover premium prompts built to save time and maximize
            productivity.
          </p>

          {/* Neumorphic "View All" Button */}
          <Link
            href="/prompts"
            className="group mt-8 inline-flex items-center gap-2 rounded-full neu-button-secondary px-6 py-2.5 text-xs md:text-sm font-bold"
          >
            <span>View All</span>
            <ArrowUpRight
              size={16}
              className="text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Loading Handle */}
        {loading && (
          <LoadingSpinner />
        )}

        {/* Error Handle */}
        {error && (
          <div className="mx-auto max-w-md rounded-2xl neu-card p-6 text-center text-rose-500 font-bold">
            {error}. Please try again later.
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
