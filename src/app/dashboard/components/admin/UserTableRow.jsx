"use client";

import { Table, Button } from "@heroui/react";

export function UserTableRow({ user, handleRoleChange, openDeleteModal }) {
  return (
    <Table.Row key={user._id}>
      <Table.Cell>{user.name || "N/A"}</Table.Cell>

      <Table.Cell>{user.email}</Table.Cell>

      <Table.Cell>
        <select
          value={user.role || "user"}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          className="w-32 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900 text-foreground"
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
          onPress={() => openDeleteModal(user._id)}
        >
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}