"use client";

import { useState, useEffect } from "react";
import { FiDollarSign, FiCalendar, FiMail, FiHash, FiCheckCircle, FiLoader } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        setLoading(true);
        
        const tokenRes = await authClient.token?.();
        const token = tokenRes?.data?.token;

        const headers = {
          "Content-Type": "application/json",
        };

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

  // All reveneu
  const totalRevenue = payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-slate-500 gap-3">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Payments</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitor and review all subscription transactions processed via Stripe.
          </p>
        </div>
        
        {/* Reveneu summary */}
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

      {/* Content Area or Table */}
      {payments.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-slate-400 text-sm italic">No payment transactions found in the system.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Tabe Haed */}
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiHash /> Transaction ID</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiMail /> User Email</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiDollarSign /> Amount</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiCalendar /> Date</span></th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
                {payments.map((payment, index) => {
                  const paymentDate = payment.date 
                    ? new Date(payment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr key={payment._id || index} className="hover:bg-slate-50/40 transition-colors">
                      {/* Transaction ID */}
                      <td className="py-4 px-6 font-mono text-slate-700 font-semibold select-all">
                        {payment.transactionId || "tx_live_unavail"}
                      </td>
                      
                      {/* User email */}
                      <td className="py-4 px-6 text-slate-800 font-normal">
                        {payment.email}
                      </td>
                      
                      {/* Amount */}
                      <td className="py-4 px-6 font-bold text-slate-900">
                        ${Number(payment.amount).toFixed(2)}
                      </td>
                      
                      {/* Date */}
                      <td className="py-4 px-6 text-slate-500 font-normal">
                        {paymentDate}
                      </td>
                      
                      {/* Bad Status */}
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
          
          {/* table footer matrix */}
          <div className="bg-slate-50/50 border-t border-slate-200 px-6 py-3.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider flex justify-between items-center">
            <span>Showing All Verified Records</span>
            <span>Total Records: {payments.length}</span>
          </div>
        </div>
      )}

    </div>
  );
}