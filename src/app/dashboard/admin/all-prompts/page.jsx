"use client";

import { useState, useEffect } from "react";
import { Table } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PromptTableRow } from "@/app/dashboard/components/admin/PromptTableRow";
import { RejectModal } from "@/app/dashboard/components/admin/RejectModal";
import { DeleteModal } from "@/app/dashboard/components/admin/DeleteModal";

export default function AdminPrompts() {
  const [promptsList, setPromptsList] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  // Target States for Modals
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, title: "" });

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState(null);

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  const columns = [
    { id: "title", name: "TITLE", isRowHeader: true },
    { id: "category", name: "CATEGORY" },
    { id: "status", name: "STATUS" },
    { id: "featured", name: "FEATURED" },
    { id: "actions", name: "ACTIONS" },
  ];

  const getHeaders = async () => {
    const headers = { "Content-Type": "application/json" };
    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to fetch auth token", err);
    }
    return headers;
  };

  const fetchPrompts = async () => {
    try {
      setTableLoading(true);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts`, {
        method: "GET",
        headers,
      });
      const result = await res.json();

      if (result.success && Array.isArray(result.prompts)) {
        setPromptsList(result.prompts);
      } else if (Array.isArray(result)) {
        setPromptsList(result);
      } else {
        toast.error("Failed to load prompts database");
      }
    } catch (error) {
      console.error("Fetch prompts error:", error);
      toast.error("Network error fetching prompts!");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // Approve & Feature Handlers
  const handleApprove = async (id) => {
    try {
      setActionLoadingId(id);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${id}/approve`, {
        method: "PUT",
        headers,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Prompt approved successfully!");
        setPromptsList((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: "approved" } : item))
        );
      } else {
        toast.error(result.message || "Failed to approve prompt");
      }
    } catch {
      toast.error("Network error during approval");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleFeatureToggle = async (id) => {
    try {
      setActionLoadingId(`${id}_feature`);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${id}/feature`, {
        method: "PATCH",
        headers,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(result.message);
        setPromptsList((prev) =>
          prev.map((item) => (item._id === id ? { ...item, featured: result.featured } : item))
        );
      } else {
        toast.error(result.message || "Failed to update featured status");
      }
    } catch {
      toast.error("Network error toggling feature!");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Dialog triggers
  const openRejectDialog = (id) => {
    setRejectTargetId(id);
    setRejectDialogOpen(true);
  };

  const openDeleteDialog = (item) => {
    setDeleteTarget({ id: item._id, title: item.title });
    setDeleteDialogOpen(true);
  };

  // State update Callbacks from Modal
  const handleRejectSuccess = (rejectedId) => {
    setPromptsList((prev) =>
      prev.map((item) => (item._id === rejectedId ? { ...item, status: "Rejected" } : item))
    );
  };

  const handleDeleteSuccess = (deletedId) => {
    setPromptsList((prev) => prev.filter((item) => item._id !== deletedId));
  };

  if (tableLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Manage Prompts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Approve, reject, feature, or delete prompts from the marketplace.
        </p>
      </div>

      <Table aria-label="Prompts management table">
        <Table.ScrollContainer>
          <Table.Content aria-label="Prompts content list" className="min-w-[800px]">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body emptyContent="No prompts found in database">
              {promptsList.map((item) => (
                <PromptTableRow
                  key={item._id || item.id}
                  item={item}
                  actionLoadingId={actionLoadingId}
                  handleApprove={handleApprove}
                  openRejectDialog={openRejectDialog}
                  handleFeatureToggle={handleFeatureToggle}
                  openDeleteDialog={openDeleteDialog}
                />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* Self-contained API Modals */}
      <RejectModal
        isOpen={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        targetId={rejectTargetId}
        getHeaders={getHeaders}
        BACKEND_URL={BACKEND_URL}
        onRejectSuccess={handleRejectSuccess}
      />

      <DeleteModal
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        targetId={deleteTarget.id}
        targetTitle={deleteTarget.title}
        getHeaders={getHeaders}
        BACKEND_URL={BACKEND_URL}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}