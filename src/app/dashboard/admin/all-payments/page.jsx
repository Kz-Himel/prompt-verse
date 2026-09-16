"use client";

import { useState, useEffect } from "react";
import { FiDollarSign, FiCalendar, FiMail, FiHash, FiCheckCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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

  // All revenue
  const totalRevenue = payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (loading) {
    return (
      <LoadingSpinner 
        text="Loading Payments..." 
        subtext="Fetching transaction and revenue metrics" 
      />
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-xl mx-auto my-10">
        <div className="neu-card p-8 rounded-2xl text-center space-y-3 border border-[var(--border)]">
          <div className="w-12 h-12 rounded-2xl neu-input flex items-center justify-center mx-auto text-rose-500 font-bold text-xl">
            !
          </div>
          <h3 className="font-bold text-base text-[var(--text)]">Access Denied / Error</h3>
          <p className="text-xs text-[var(--text-muted)] font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6 w-full max-w-[1400px] mx-auto text-[var(--text)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 border-[var(--border)]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">All Payments</h1>
          <p className="text-[var(--text-muted)] text-xs mt-0.5">
            Monitor and review all subscription transactions processed via Stripe.
          </p>
        </div>
        
        {/* Revenue summary */}
        <div className="neu-card px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 border border-[var(--border)]">
          <div className="w-10 h-10 rounded-xl neu-input flex items-center justify-center text-lg text-emerald-500">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-wider">Total Earnings</p>
            <p className="text-xl font-bold text-[var(--text)]">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Content Area or Table */}
      {payments.length === 0 ? (
        <div className="text-center py-20 neu-card rounded-2xl border border-[var(--border)]">
          <p className="text-[var(--text-muted)] text-sm font-medium">No payment transactions found in the system.</p>
        </div>
      ) : (
        <div className="neu-card rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Table Head */}
              <thead>
                <tr className="border-b border-[var(--border)] text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiHash /> Transaction ID</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiMail /> User Email</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiDollarSign /> Amount</span></th>
                  <th className="py-4 px-6"><span className="flex items-center gap-1.5"><FiCalendar /> Date</span></th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[var(--border)] text-xs font-medium text-[var(--text)]">
                {payments.map((payment, index) => {
                  const paymentDate = payment.date 
                    ? new Date(payment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr key={payment._id || index} className="hover:bg-[var(--border)]/20 transition-colors">
                      {/* Transaction ID */}
                      <td className="py-4 px-6 font-mono text-[var(--text)] font-semibold select-all">
                        {payment.transactionId || "tx_live_unavail"}
                      </td>
                      
                      {/* User email */}
                      <td className="py-4 px-6 text-[var(--text-muted)] font-normal">
                        {payment.email}
                      </td>
                      
                      {/* Amount */}
                      <td className="py-4 px-6 font-bold text-[var(--text)]">
                        ${Number(payment.amount).toFixed(2)}
                      </td>
                      
                      {/* Date */}
                      <td className="py-4 px-6 text-[var(--text-muted)] font-normal">
                        {paymentDate}
                      </td>
                      
                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold neu-input text-emerald-500">
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                          Success
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
          
          {/* Table footer matrix */}
          <div className="border-t border-[var(--border)] px-6 py-3.5 text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider flex justify-between items-center">
            <span>Showing All Verified Records</span>
            <span>Total Records: {payments.length}</span>
          </div>
        </div>
      )}

    </div>
  );
}