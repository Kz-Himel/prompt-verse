"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export function DeleteModal({
  isOpen,
  onOpenChange,
  targetId,
  targetTitle,
  getHeaders,
  BACKEND_URL,
  onDeleteSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!targetId) return;

    try {
      setLoading(true);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/admin/prompts/${targetId}`, {
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
        onDeleteSuccess(targetId);
        onOpenChange(false);
      } else {
        toast.error(result.message || "Failed to delete prompt");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Something went wrong!");
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
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete prompt permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-gray-600 leading-relaxed">
                This will permanently delete{" "}
                <strong className="text-red-600">{targetTitle}</strong>{" "}
                from the marketplace. This action cannot be undone.
              </p>
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
                onClick={handleDeleteConfirm}
              >
                Delete Prompt
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}