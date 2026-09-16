"use client";

import { useState, useEffect } from "react";
import { Table } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";
import { UserTableRow } from "@/app/dashboard/components/admin/UserTableRow";
import { UserDeleteModal } from "@/app/dashboard/components/admin/UserDeleteModal";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/users`, {
        method: "GET",
        headers: headers,
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        toast.error("Failed to load users data");
      }
    } catch (error) {
      console.error("Fetch Users Error:", error);
      toast.error("Network error occurred!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/users/role/${userId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        toast.success(`Role updated to ${newRole} successfully!`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Role Update Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const openDeleteModal = (userId) => {
    setDeleteId(userId);
    setIsModalOpen(true);
  };

  const handleDeleteSuccess = (deletedId) => {
    setUsers((prev) => prev.filter((user) => user._id !== deletedId));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users ({users.length})</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Users management table"
            className="min-w-[700px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>NAME</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={4}
                    className="text-center text-default-400 py-6"
                  >
                    No users found
                  </Table.Cell>
                </Table.Row>
              ) : (
                users.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    handleRoleChange={handleRoleChange}
                    openDeleteModal={openDeleteModal}
                  />
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <UserDeleteModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        deleteId={deleteId}
        getHeaders={getHeaders}
        BACKEND_URL={BACKEND_URL}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}