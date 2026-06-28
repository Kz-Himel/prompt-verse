"use client";
import { useEffect, useState } from "react";
import { Card, Spinner, Button, Chip, AlertDialog } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiAlertTriangle, FiTrash2, FiUserCheck, FiEyeOff } from "react-icons/fi";

export default function ReportedPrompts() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ─── ১. FETCH ALL REPORTED PROMPTS ───
  const fetchReports = async () => {
    try {
      setLoading(true);
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await res.json();
      if (result.success) {
        setReports(result.data || []);
      } else {
        toast.error(result.message || "Failed to load reports");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading reported prompts!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ─── ২. ACTION: REMOVE PROMPT (EXECUTION) ───
  const handleRemovePrompt = async () => {
    if (!selectedReportId) return;
    try {
      setSubmitting(true);
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${selectedReportId}/remove-prompt`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Prompt removed and report resolved!");
        setReports((prev) => prev.filter((r) => r._id !== selectedReportId));
        setSelectedReportId(null); // Clear selected id after deletion
      } else {
        toast.error(result.message || "Failed to remove prompt");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── ৩. ACTION: WARN CREATOR ───
  const handleWarnCreator = async (reportId, creatorEmail) => {
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${reportId}/warn-creator`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
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
      toast.error("Something went wrong!");
    }
  };

  // ─── ৪. ACTION: DISMISS REPORT ───
  const handleDismissReport = async (reportId) => {
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${reportId}/dismiss`, {
        method: "PATCH",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await res.json();
      if (result.success) {
        toast.info("Report dismissed successfully.");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        toast.error(result.message || "Failed to dismiss report");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black flex items-center gap-2">
          Reported Prompts
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and moderate unsafe contents reported by community users.
        </p>
      </div>

      {/* Reports Grid/List */}
      {reports.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-2xl border border-dashed text-gray-400">
          No pending reports found. Platform is fully clean! 🎉
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <Card
              key={report._id}
              className="border border-red-100 bg-white shadow-sm rounded-2xl overflow-hidden p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* Left Side: Information */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Chip size="sm" color="danger" variant="flat">
                      Reason: {report.reason}
                    </Chip>
                    <span className="text-xs text-gray-400">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Prompt Title: <span className="text-indigo-600">{report.promptTitle}</span>
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <strong className="text-xs text-gray-400 block uppercase mb-1">Reporter Description:</strong>
                      {report.description || "No specific comment provided."}
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>
                      <strong>Creator:</strong> {report.creatorEmail}
                    </span>
                    <span>
                      <strong>Reporter:</strong> {report.reporterEmail || "Anonymous"}
                    </span>
                  </div>
                </div>

                {/* Right Side: Admin Controls */}
                <div className="flex flex-row lg:flex-col justify-end gap-3 items-center lg:items-stretch min-w-[180px]">
                  
                  {/* Action 1: Remove Prompt using AlertDialog wrapper */}
                  <AlertDialog>
                    <Button
                      size="sm"
                      color="danger"
                      variant="solid"
                      className="font-medium rounded-xl flex items-center gap-1"
                      onClick={() => setSelectedReportId(report._id)} // On Click-e temporary ID assign hobe
                    >
                      <FiTrash2 size={16} /> Remove Prompt
                    </Button>
                    
                    <AlertDialog.Backdrop>
                      <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                          <AlertDialog.CloseTrigger />
                          <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete prompt permanently?</AlertDialog.Heading>
                          </AlertDialog.Header>
                          <AlertDialog.Body>
                            <p>
                              This will permanently delete <strong className="text-red-600">{report.promptTitle}</strong> and all of its data from the marketplace. This action cannot be undone.
                            </p>
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary" className="rounded-xl">
                              Cancel
                            </Button>
                            <Button 
                              slot="close" 
                              variant="danger" 
                              className="rounded-xl font-semibold"
                              isLoading={submitting}
                              onPress={handleRemovePrompt} // Yes button click-e execution trigger hobe
                            >
                              Delete Prompt
                            </Button>
                          </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                      </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                  </AlertDialog>

                  {/* Action 2: Warn Creator */}
                  <Button
                    size="sm"
                    color="warning"
                    variant="flat"
                    className="font-medium rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-1"
                    onClick={() => handleWarnCreator(report._id, report.creatorEmail)}
                  >
                    <FiUserCheck size={16} /> Warn Creator
                  </Button>

                  {/* Action 3: Dismiss */}
                  <Button
                    size="sm"
                    color="default"
                    variant="light"
                    className="font-medium rounded-xl hover:bg-gray-100 text-gray-500 flex items-center gap-1"
                    onClick={() => handleDismissReport(report._id)}
                  >
                    <FiEyeOff size={16} /> Dismiss / Safe
                  </Button>

                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}