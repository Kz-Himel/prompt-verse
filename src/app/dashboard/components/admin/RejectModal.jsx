"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export function RejectModal({
  isOpen,
  onOpenChange,
  targetId,
  getHeaders,
  BACKEND_URL,
  onRejectSuccess,
}) {
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRejectSubmit = async () => {
    if (!rejectFeedback.trim()) {
      toast.warning("Please enter rejection feedback!");
      return;
    }

    try {
      setLoading(true);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${targetId}/reject`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ feedback: rejectFeedback }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Prompt rejected successfully.");
        onRejectSuccess(targetId);
        onOpenChange(false);
        setRejectFeedback("");
      } else {
        toast.error(result.message || "Failed to reject prompt");
      }
    } catch (error) {
      console.error("Reject Error:", error);
      toast.error("Error rejecting prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
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
                disabled={loading}
              />
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={loading}
                onClick={handleRejectSubmit}
              >
                Submit Rejection
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}