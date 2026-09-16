"use client";

import { Table, Button, Chip } from "@heroui/react";
import { FiStar, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export function PromptTableRow({
  item,
  actionLoadingId,
  handleApprove,
  openRejectDialog,
  handleFeatureToggle,
  openDeleteDialog,
}) {
  const itemId = item._id || item.id;
  const isApproved = item.status?.toLowerCase() === "approved";
  const isRejected = item.status?.toLowerCase() === "rejected";
  const isFeatured = !!item.featured;
  const isActionLoading = actionLoadingId === itemId;
  const isFeatureLoading = actionLoadingId === `${itemId}_feature`;

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "warning";
    if (s === "approved") return "success";
    return "danger";
  };

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
          {/* Approve Button */}
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

          {/* Reject Button */}
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

          {/* Feature Toggle Button */}
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

          {/* Delete Button */}
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
}