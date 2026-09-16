"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";

export function UserDeleteModal({
  isOpen,
  onOpenChange,
  deleteId,
  getHeaders,
  BACKEND_URL,
  onDeleteSuccess,
}) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) {
      toast.error("User ID missing!");
      return;
    }

    try {
      setDeleteLoading(true);
      const headers = await getHeaders();
      const cleanId = encodeURIComponent(deleteId.trim());

      const res = await fetch(`${BACKEND_URL}/admin/users/${cleanId}`, {
        method: "DELETE",
        headers: headers,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response (Status: ${res.status})`);
      }

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(result.message || "User deleted successfully!");
        onDeleteSuccess(deleteId);
        onOpenChange(false);
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger onClick={() => onOpenChange(false)} />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete user permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete the user account and all of their
                related data. <strong>This action cannot be undone.</strong>
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                variant="tertiary"
                onClick={() => onOpenChange(false)}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={deleteLoading}
                onClick={handleDeleteConfirm}
              >
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}