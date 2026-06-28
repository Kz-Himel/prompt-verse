"use client";

import { useState, useEffect } from "react";
import { FiDollarSign, FiCalendar, FiMail, FiHash, FiCheckCircle, FiLoader } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; // 🎯 আপনার প্রজেক্টের authClient পাথ অনুযায়ী মিলিয়ে নিবেন

export default function AllPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        setLoading(true);
        
        // 🎯 আপনার দেওয়া লজিক অনুযায়ী Better Auth ক্লায়েন্ট থেকে টোকেন নেওয়া হলো
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        const headers = {
          "Content-Type": "application/json",
        };

        // টোকেন থাকলে Authorization হেডারে পাস করা হলো
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${BACKEND_URL}/payments`, {
          method: "GET",
          headers: headers,
        });

        const resData = await res.json();

        if (resData.success) {
          setPayments(resData.data);
        } else {
          setError(resData.message || "Failed to load payment data");
        }
      } catch (err) {
        console.error("Error in getAllPayments:", err);
        setError("Network error occurred while fetching payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, [BACKEND_URL]);

  // মোট রেভিনিউ ক্যালকুলেট করার লজিক
  const totalRevenue = payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // ─── ১. লোডিং স্টেট (Skeleton/Spinner) ───
  if (loading) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-slate-500 gap-3">
        <FiLoader className="w-8 h-8 animate-spin text-violet-600" />
        <p className="text-sm font-medium">Loading payment transactions securely...</p>
      </div>
    );
  }

  // ─── ২. এরর স্টেট ───
  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto my-10 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 space-y-2">
        <h3 className="font-bold text-base">Access Denied / Error</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full text-slate-800">
      
      {/* ── হেডার ও টোটাল আর্নিং কার্ড সেকশন ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Payments</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitor and review all subscription transactions processed via Stripe.
          </p>
        </div>
        
        {/* মোট রেভিনিউ সামারি বক্স */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">Total Earnings</p>
            <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* ── কন্টেন্ট এরিয়া / টেবিল ── */}
      {payments.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-slate-400 text-sm italic">No payment transactions found in the system.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* টেবিল হেডার */}
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiHash /> Transaction ID</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiMail /> User Email</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiDollarSign /> Amount</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiCalendar /> Date</span></th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>

              {/* টেবিল বডি */}
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
                {payments.map((payment, index) => {
                  // ডেট ফরম্যাটিং সেফটি চেক
                  const paymentDate = payment.date 
                    ? new Date(payment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr key={payment._id || index} className="hover:bg-slate-50/40 transition-colors">
                      {/* ট্রানজেকশন আইডি */}
                      <td className="py-4 px-6 font-mono text-slate-700 font-semibold select-all">
                        {payment.transactionId || "tx_live_unavail"}
                      </td>
                      
                      {/* ইউজারের ইমেইল */}
                      <td className="py-4 px-6 text-slate-800 font-normal">
                        {payment.email}
                      </td>
                      
                      {/* পেমেন্ট অ্যামাউন্ট */}
                      <td className="py-4 px-6 font-bold text-slate-900">
                        ${Number(payment.amount).toFixed(2)}
                      </td>
                      
                      {/* পেমেন্টের তারিখ */}
                      <td className="py-4 px-6 text-slate-500 font-normal">
                        {paymentDate}
                      </td>
                      
                      {/* স্ট্যাটাস ব্যাজ */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <FiCheckCircle className="text-emerald-500 w-3 h-3" />
                          Success
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
          
          {/* টেবিল ফুটার মেট্রিক্স */}
          <div className="bg-slate-50/50 border-t border-slate-200 px-6 py-3.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider flex justify-between items-center">
            <span>Showing All Verified Records</span>
            <span>Total Records: {payments.length}</span>
          </div>
        </div>
      )}

    </div>
  );
}