"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ReportCard } from "@/app/dashboard/components/admin/ReportCard";
import { RemovePromptModal } from "@/app/dashboard/components/admin/RemovePromptModal";

export default function ReportedPrompts() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState({ id: null, title: "" });

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  const getAuthHeader = async () => {
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch {
      return {};
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const authHeader = await getAuthHeader();
      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...authHeader },
      });
      const result = await res.json();
      if (result.success) {
        setReports(result.data || []);
      } else {
        toast.error(result.message || "Failed to load reports");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error loading reported prompts!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (BACKEND_URL) fetchReports();
  }, []);

  const openDeleteDialog = (reportId, promptTitle) => {
    setSelectedReport({ id: reportId, title: promptTitle });
    setDialogOpen(true);
  };

  const handleRemoveSuccess = (removedId) => {
    setReports((prev) => prev.filter((r) => r._id !== removedId));
  };

  const handleWarnCreator = async (reportId, creatorEmail) => {
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${reportId}/warn-creator`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ creatorEmail }),
      });
      const result = await res.json();
      if (result.success) {
        toast.warn("Creator warned and report resolved!");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        toast.error(result.message || "Failed to warn creator");
      }
    } catch (error) {
      console.error("Warn Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleDismissReport = async (reportId) => {
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${reportId}/dismiss`, {
        method: "PATCH",
        headers: { ...authHeader },
      });
      const result = await res.json();
      if (result.success) {
        toast.info("Report dismissed successfully.");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        toast.error(result.message || "Failed to dismiss report");
      }
    } catch (error) {
      console.error("Dismiss Error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl font-bold text-black flex items-center gap-2">
          Reported Prompts
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and moderate unsafe contents reported by community users.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-2xl border border-dashed text-gray-400">
          No pending reports found. Platform is fully clean! 🎉
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              openDeleteDialog={openDeleteDialog}
              handleWarnCreator={handleWarnCreator}
              handleDismissReport={handleDismissReport}
            />
          ))}
        </div>
      )}

      {/* Self-contained Delete Modal */}
      <RemovePromptModal
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        reportId={selectedReport.id}
        promptTitle={selectedReport.title}
        getAuthHeader={getAuthHeader}
        BACKEND_URL={BACKEND_URL}
        onRemoveSuccess={handleRemoveSuccess}
      />
    </div>
  );
}