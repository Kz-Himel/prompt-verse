"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export function RemovePromptModal({
  isOpen,
  onOpenChange,
  reportId,
  promptTitle,
  getAuthHeader,
  BACKEND_URL,
  onRemoveSuccess,
}) {
  const [submitting, setSubmitting] = useState(false);

  const handleRemovePrompt = async () => {
    if (!reportId) return;
    try {
      setSubmitting(true);
      const authHeader = await getAuthHeader();
      const res = await fetch(`${BACKEND_URL}/admin/reported-prompts/${reportId}/remove-prompt`, {
        method: "DELETE",
        headers: { ...authHeader },
      });
      const result = await res.json();
      
      if (result.success) {
        toast.success("Prompt removed and report resolved!");
        onRemoveSuccess(reportId);
        onOpenChange(false);
      } else {
        toast.error(result.message || "Failed to remove prompt");
      }
    } catch (error) {
      console.error("Remove Error:", error);
      toast.error("Something went wrong while removing!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete prompt permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-gray-600 leading-relaxed">
                This will permanently delete{" "}
                <strong className="text-red-600">{promptTitle}</strong>{" "}
                and all of its data from the marketplace. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={submitting}
                onClick={handleRemovePrompt}
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