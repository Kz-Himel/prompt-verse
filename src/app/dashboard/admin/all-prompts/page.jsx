"use client";
import { useState, useEffect } from "react";
import { Table, Button, Chip, AlertDialog, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AdminPrompts() {
  const [promptsList, setPromptsList] = useState([]); 
  const [tableLoading, setTableLoading] = useState(true); 
  
  // ডিলিট মডাল স্টেট (আইডির বদলে এখন আমরা ইমেইল দিয়ে ডিলিট করব)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [deleteEmail, setDeleteEmail] = useState(null);       
  const [deleteLoading, setDeleteLoading] = useState(false); 

  // রিজেক্ট মডাল স্টেট
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("");

  // ডাইনামিক অ্যাকশন লোডিং
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const columns = [
    { id: "title", name: "TITLE", isRowHeader: true },
    { id: "category", name: "CATEGORY" },
    { id: "status", name: "STATUS" },
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
        headers: headers
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

  const handleApprove = async (id) => {
    try {
      setActionLoadingId(id);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${id}/approve`, {
        method: "PUT",
        headers: headers,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Prompt approved successfully!");
        setPromptsList(prev => 
          prev.map(item => item._id === id ? { ...item, status: "Approved" } : item)
        );
      } else {
        toast.error(result.message || "Failed to approve prompt");
      }
    } catch (error) {
      toast.error("Network error during approval");
    } finally {
      setActionLoadingId(null);
    }
  };

  const openRejectModal = (id) => {
    setRejectTargetId(id);
    setRejectFeedback("");
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectTargetId(null);
    setRejectFeedback("");
  };

  const handleRejectSubmit = async () => {
    if (!rejectFeedback.trim()) {
      toast.warning("Please enter rejection feedback!");
      return;
    }

    try {
      setActionLoadingId(rejectTargetId);
      closeRejectModal();
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${rejectTargetId}/reject`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ feedback: rejectFeedback })
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.error("Prompt rejected successfully.");
        setPromptsList(prev => 
          prev.map(item => item._id === rejectTargetId ? { ...item, status: "Rejected" } : item)
        );
      } else {
        toast.error(result.message || "Failed to reject prompt");
      }
    } catch (error) {
      toast.error("Error rejecting prompt");
    } finally {
      setActionLoadingId(null);
    }
  };

  // ডিলিট মডাল ওপেন (এখন ইমেইল ট্র্যাক করবে)
  const openDeleteModal = (item) => {
    const email = item.authorEmail;
    
    if (!email) {
      toast.warning("Author email is missing for this prompt!");
      return;
    }
    
    setDeleteEmail(email); 
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteEmail(null);
  };

  // ইমেইল দিয়ে ইউজার ডিলিট করার কনফার্মেশন হ্যান্ডলার
  const handleDeleteConfirm = async () => {
    if (!deleteEmail) return;

    try {
      setDeleteLoading(true);
      const headers = await getHeaders();
      
      // ডিলিট ইউআরএল এ আইডির জায়গায় সরাসরি ইমেইলটি প্যারামস হিসেবে পাঠিয়ে দেওয়া হচ্ছে
      const res = await fetch(`${BACKEND_URL}/admin/users/${deleteEmail}`, { 
        method: "DELETE",
        headers: headers,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("User deleted successfully!");
        closeDeleteModal();
        fetchPrompts(); // টেবিল ডাটা রিফ্রেশ
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong with the network!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === "pending") return "warning";
    if (status?.toLowerCase() === "approved") return "primary";
    return "danger";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Prompts</h1>
      
      <Table aria-label="Prompts management table">
        <Table.ScrollContainer>
          <Table.Content aria-label="Prompts content list" className="min-w-[650px]">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body emptyContent={!tableLoading && "No prompts found in database"}>
              {tableLoading ? (
                <Table.Row>
                  <Table.Cell><Spinner size="sm" /></Table.Cell>
                  <Table.Cell>Loading...</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
              ) : (
                promptsList.map((item) => {
                  const itemId = item._id || item.id;
                  const isApproved = item.status?.toLowerCase() === "approved";
                  const isRejected = item.status?.toLowerCase() === "rejected";
                  const isCurrentActionLoading = actionLoadingId === itemId;

                  // ডাটাতে authorEmail থাকলে বাটন একটিভ থাকবে
                  const hasEmail = !!item.authorEmail;

                  return (
                    <Table.Row key={itemId}>
                      <Table.Cell className="font-medium">{item.title}</Table.Cell>
                      <Table.Cell>{item.category}</Table.Cell>
                      <Table.Cell>
                        <Chip color={getStatusColor(item.status)} variant="flat" size="sm" className="capitalize">
                          {item.status || "Pending"}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2 min-w-[320px]">
                          
                          {/* Approve Button */}
                          <Button 
                            size="sm" 
                            color="primary" 
                            variant={isApproved ? "flat" : "solid"} 
                            isDisabled={isApproved || isCurrentActionLoading}
                            isLoading={isCurrentActionLoading && isApproved}
                            onClick={() => handleApprove(itemId)}
                          >
                            {isApproved ? "Approved" : "Approve"}
                          </Button>

                          {/* Reject Button */}
                          <Button 
                            size="sm" 
                            color="danger" 
                            variant={isRejected ? "flat" : "solid"} 
                            isDisabled={isRejected || isCurrentActionLoading}
                            isLoading={isCurrentActionLoading && isRejected}
                            onClick={() => openRejectModal(itemId)}
                          >
                            {isRejected ? "Rejected" : "Reject"}
                          </Button>

                          {/* Delete Creator Button */}
                          <Button 
                            size="sm" 
                            color="danger" 
                            variant="solid"
                            isDisabled={!hasEmail}
                            onClick={() => openDeleteModal(item)}
                          >
                            Delete Creator
                          </Button>

                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* ================= রিজেক্ট ফিডব্যাক মডাল ================= */}
      <AlertDialog isOpen={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger onClick={closeRejectModal} />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Reject Prompt Reason</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm mb-3 text-default-500">Please provide a reason for rejecting this prompt:</p>
                <textarea 
                  className="w-full p-2 border border-default-200 rounded-lg bg-transparent text-sm focus:outline-none focus:border-danger min-h-[80px]"
                  placeholder="e.g., Inappropriate content..."
                  value={rejectFeedback}
                  onChange={(e) => setRejectFeedback(e.target.value)}
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" size="sm" onClick={closeRejectModal}>
                  Cancel
                </Button>
                <Button color="danger" size="sm" onClick={handleRejectSubmit}>
                  Submit Rejection
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* ================= ইউজার ডিলিট অ্যালার্ট ডায়ালগ ================= */}
      <AlertDialog isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger onClick={closeDeleteModal} />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete account permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete user <strong>{deleteEmail}</strong> and all related data from the database.
                  <strong> This action cannot be undone.</strong>
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" onClick={closeDeleteModal} disabled={deleteLoading}>
                  Cancel
                </Button>
                <Button variant="danger" isLoading={deleteLoading} onClick={handleDeleteConfirm}>
                  Delete User
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}