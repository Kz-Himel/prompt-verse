"use client";
import { useState, useEffect } from "react";
import { Table, Button, Chip, AlertDialog } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FiStar, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminPrompts() {
  const [promptsList, setPromptsList] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  // Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Reject Dialog
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");
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
        headers: headers,
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

  // ── Approve ──
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
          prev.map((item) =>
            item._id === id ? { ...item, status: "approved" } : item
          )
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

  // ── Reject Dialog Open ──
  const openRejectDialog = (id) => {
    setRejectTargetId(id);
    setRejectFeedback("");
    setRejectDialogOpen(true);
  };

  // ── Reject Submit ──
  const handleRejectSubmit = async () => {
    if (!rejectFeedback.trim()) {
      toast.warning("Please enter rejection feedback!");
      return;
    }
    try {
      setActionLoadingId(rejectTargetId);
      setRejectDialogOpen(false);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${rejectTargetId}/reject`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ feedback: rejectFeedback }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Prompt rejected.");
        setPromptsList((prev) =>
          prev.map((item) =>
            item._id === rejectTargetId ? { ...item, status: "Rejected" } : item
          )
        );
      } else {
        toast.error(result.message || "Failed to reject prompt");
      }
    } catch {
      toast.error("Error rejecting prompt");
    } finally {
      setActionLoadingId(null);
    }
  };

  // ── Delete Dialog Open ──
  const openDeleteDialog = (item) => {
    setDeleteTargetId(item._id);
    setDeleteTargetTitle(item.title);
    setDeleteDialogOpen(true);
  };

  // ── Delete Prompt ──
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      setDeleteLoading(true);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${deleteTargetId}`, {
        method: "DELETE",
        headers,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error(`Non-JSON response (Status: ${res.status})`);
      }

      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(result.message || "Prompt deleted successfully!");
        setPromptsList((prev) => prev.filter((item) => item._id !== deleteTargetId));
        setDeleteDialogOpen(false);
      } else {
        toast.error(result.message || "Failed to delete prompt");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Feature Toggle ──
  const handleFeatureToggle = async (id, currentFeatured) => {
    try {
      setActionLoadingId(id + "_feature");
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${id}/feature`, {
        method: "PATCH",
        headers,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(result.message);
        setPromptsList((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, featured: result.featured } : item
          )
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

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "warning";
    if (s === "approved") return "success";
    return "danger";
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
          <Table.Content
            aria-label="Prompts content list"
            className="min-w-[800px]"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body emptyContent="No prompts found in database">
              {promptsList.map((item) => {
                const itemId = item._id || item.id;
                const isApproved = item.status?.toLowerCase() === "approved";
                const isRejected = item.status?.toLowerCase() === "rejected";
                const isFeatured = !!item.featured;
                const isActionLoading = actionLoadingId === itemId;
                const isFeatureLoading = actionLoadingId === itemId + "_feature";

                return (
                  <Table.Row key={itemId}>
                    <Table.Cell className="font-medium max-w-[200px] truncate">
                      {item.title}
                    </Table.Cell>

                    <Table.Cell>{item.category}</Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={getStatusColor(item.status)}
                        variant="flat"
                        size="sm"
                        className="capitalize"
                      >
                        {item.status || "Pending"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={isFeatured ? "warning" : "default"}
                        variant="flat"
                        size="sm"
                      >
                        {isFeatured ? "⭐ Featured" : "—"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-2 flex-wrap min-w-[360px]">
                        {/* Approve */}
                        <Button
                          size="sm"
                          color="success"
                          variant={isApproved ? "flat" : "solid"}
                          isDisabled={isApproved || isActionLoading}
                          isLoading={isActionLoading && !isApproved}
                          onClick={() => handleApprove(itemId)}
                          startContent={!isApproved && <FiCheck size={14} />}
                        >
                          {isApproved ? "Approved" : "Approve"}
                        </Button>

                        {/* Reject */}
                        <Button
                          size="sm"
                          color="danger"
                          variant={isRejected ? "flat" : "solid"}
                          isDisabled={isRejected || isActionLoading}
                          onClick={() => openRejectDialog(itemId)}
                          startContent={!isRejected && <FiX size={14} />}
                        >
                          {isRejected ? "Rejected" : "Reject"}
                        </Button>

                        {/* Feature */}
                        <Button
                          size="sm"
                          color="warning"
                          variant={isFeatured ? "solid" : "flat"}
                          isLoading={isFeatureLoading}
                          onClick={() => handleFeatureToggle(itemId, isFeatured)}
                          startContent={!isFeatureLoading && <FiStar size={14} />}
                        >
                          {isFeatured ? "Unfeature" : "Feature"}
                        </Button>

                        {/* Delete */}
                        <Button
                          size="sm"
                          color="danger"
                          variant="bordered"
                          onClick={() => openDeleteDialog(item)}
                          startContent={<FiTrash2 size={14} />}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* ─── REJECT ALERT DIALOG ─── */}
      <AlertDialog isOpen={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[420px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="warning" />
                <AlertDialog.Heading>Reject Prompt</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm mb-3 text-default-500">
                  Please provide a reason for rejecting this prompt. This feedback will help the creator improve.
                </p>
                <textarea
                  className="w-full p-3 border border-default-200 rounded-xl bg-transparent text-sm focus:outline-none focus:border-warning min-h-[100px] text-foreground resize-none"
                  placeholder="e.g., Inappropriate content, misleading title..."
                  value={rejectFeedback}
                  onChange={(e) => setRejectFeedback(e.target.value)}
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onClick={() => setRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleRejectSubmit}>
                  Submit Rejection
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* ─── DELETE ALERT DIALOG ─── */}
      <AlertDialog isOpen={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[420px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete prompt permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This will permanently delete{" "}
                  <strong className="text-red-600">{deleteTargetTitle}</strong>{" "}
                  from the marketplace. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleteLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  isLoading={deleteLoading}
                  onClick={handleDeleteConfirm}
                >
                  Delete Prompt
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}