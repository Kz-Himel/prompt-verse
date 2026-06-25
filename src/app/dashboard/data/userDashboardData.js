import {
  HiFolder,
  HiHeart,
  HiCollection,
  HiCreditCard,
} from "react-icons/hi";

export const stats = [
  {
    label: "Purchased Prompts",
    value: "12",
    icon: HiFolder,
    color:
      "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    label: "Favorites",
    value: "8",
    icon: HiHeart,
    color:
      "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
  },
  {
    label: "Collections",
    value: "3",
    icon: HiCollection,
    color:
      "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
  },
  {
    label: "Total Spent",
    value: "$45.60",
    icon: HiCreditCard,
    color:
      "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
  },
];

export const purchases = [
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

export const recommendations = [
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

export const recentActivities = [
  {
    id: 1,
    message:
      'Purchased "Write a Sales Copy That Converts"',
    time: "2 hours ago",
    val: "-$4.99",
  },
  {
    id: 2,
    message:
      'Purchased "Python Web Scraper for Any Website"',
    time: "1 day ago",
    val: "-$5.99",
  },
  {
    id: 3,
    message:
      'Favorited "Midjourney Prompt for Product Photo"',
    time: "2 days ago",
    val: null,
  },
];