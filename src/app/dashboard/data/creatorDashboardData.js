import {
  HiFolder,
  HiCreditCard,
  HiCollection,
  HiHeart,
} from "react-icons/hi";

export const stats = [
  {
    label: "Published Prompts",
    value: "28",
    icon: HiFolder,
    color:
      "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    label: "Total Sales",
    value: "164",
    icon: HiCollection,
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    label: "Followers",
    value: "1.2K",
    icon: HiHeart,
    color:
      "text-rose-500 bg-rose-50 dark:bg-rose-950/40",
  },
  {
    label: "Revenue",
    value: "$2,480",
    icon: HiCreditCard,
    color:
      "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
  },
];

export const prompts = [
  {
    id: 1,
    title: "AI Sales Copy Generator",
    sales: "58 Sales",
  },
  {
    id: 2,
    title: "SEO Blog Writer Prompt",
    sales: "34 Sales",
  },
  {
    id: 3,
    title: "Cold Email Creator",
    sales: "19 Sales",
  },
  {
    id: 4,
    title: "Instagram Caption Generator",
    sales: "15 Sales",
  },
];

export const sales = [
  {
    id: 1,
    title: "AI Sales Copy Generator",
    amount: "$149",
  },
  {
    id: 2,
    title: "SEO Blog Writer Prompt",
    amount: "$89",
  },
  {
    id: 3,
    title: "Cold Email Creator",
    amount: "$54",
  },
  {
    id: 4,
    title: "Instagram Caption Generator",
    amount: "$42",
  },
];

export const analytics = {
  totalSales: "$2,480",
  monthlyGrowth: "+18%",
  totalCustomers: "164",
  avgRating: "4.9",
};