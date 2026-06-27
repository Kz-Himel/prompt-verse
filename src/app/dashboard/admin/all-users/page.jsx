"use client";
import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
        fetchUsers();
      } else {
        toast.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Role Update Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (res.ok) {
        toast.success("User deleted successfully!");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users ({users.length})</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Users management table" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>NAME</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>ROLE</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center text-default-400 py-6">
                    No users found
                  </Table.Cell>
                </Table.Row>
              ) : (
                users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell>{user.name || "N/A"}</Table.Cell>

                    <Table.Cell>{user.email}</Table.Cell>

                    <Table.Cell>
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="w-32 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}