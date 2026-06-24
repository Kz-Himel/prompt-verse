"use client";

import React from "react";
import { Card, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
  HiFolder,
  HiHeart,
  HiCollection,
  HiCreditCard,
  HiOutlineChevronRight,
  HiStar,
  HiClock,
} from "react-icons/hi";

export default function UserDashboardPage() {
  const stats = [
    {
      label: "Purchased Prompts",
      value: "12",
      icon: HiFolder,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      label: "Favorites",
      value: "8",
      icon: HiHeart,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
    },
    {
      label: "Collections",
      value: "3",
      icon: HiCollection,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
    },
    {
      label: "Total Spent",
      value: "$45.60",
      icon: HiCreditCard,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
    },
  ];

  const purchases = [
    {
      id: 1,
      title: "Write a Sales Copy That Converts",
      cat: "Marketing",
      price: "$4.99",
    },
    {
      id: 2,
      title: "Python Web Scraper for Any Website",
      cat: "Coding",
      price: "$5.99",
    },
    {
      id: 3,
      title: "Midjourney Prompt for Product Photo",
      cat: "Design",
      price: "$3.99",
    },
    {
      id: 4,
      title: "Cold Email Template That Gets Replies",
      cat: "Business",
      price: "$3.49",
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Blog Post Outline Generator",
      price: "$4.49",
      rating: "4.8",
    },
    {
      id: 2,
      title: "SEO Meta Description Generator",
      price: "$2.99",
      rating: "4.7",
    },
    {
      id: 3,
      title: "YouTube Script Creator",
      price: "$4.99",
      rating: "4.9",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      message: 'Purchased "Write a Sales Copy That Converts"',
      time: "2 hours ago",
      val: "-$4.99",
    },
    {
      id: 2,
      message: 'Purchased "Python Web Scraper for Any Website"',
      time: "1 day ago",
      val: "-$5.99",
    },
    {
      id: 3,
      message: 'Favorited "Midjourney Prompt for Product Photo"',
      time: "2 days ago",
      val: null,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-default-500 mt-1">
          Discover and manage your favorite prompts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="border border-default-200 rounded-2xl">
                <div className="flex items-center gap-4 p-5">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-default-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchases */}
          <Card className="border border-default-200 rounded-2xl">
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-sm uppercase tracking-wider">
                  My Purchases
                </h2>

                <Button
                  size="sm"
                  variant="light"
                  endContent={<HiOutlineChevronRight />}
                >
                  View all
                </Button>
              </div>

              <div className="space-y-3">
                {purchases.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-default-100 pb-3 last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100"
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-sm">
                          {item.title}
                        </p>

                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          className="mt-1"
                        >
                          {item.cat}
                        </Chip>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-sm">
                        {item.price}
                      </span>

                      <Button
                        size="sm"
                        color="primary"
                        radius="full"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-default-200 rounded-2xl">
            <div className="p-5">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-5">
                Recent Activity
              </h2>

              <div className="space-y-3">
                {recentActivities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-default-100 pb-3 last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-default-100">
                        <HiClock size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {item.message}
                        </p>

                        <p className="text-xs text-default-500">
                          {item.time}
                        </p>
                      </div>
                    </div>

                    {item.val && (
                      <span className="text-danger text-sm font-semibold">
                        {item.val}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <Card className="border border-default-200 rounded-2xl h-fit">
          <div className="p-5">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-5">
              Recommended For You
            </h2>

            <div className="space-y-3">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-default-200"
                >
                  <div className="max-w-[65%]">
                    <p className="font-semibold text-sm truncate">
                      {item.title}
                    </p>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-primary font-bold text-sm">
                        {item.price}
                      </span>

                      <div className="flex items-center gap-1 text-warning text-sm">
                        <HiStar />
                        {item.rating}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    color="primary"
                    radius="full"
                  >
                    Explore
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}