"use client";

import { Card, Button, Chip } from "@heroui/react";
import { FiTrash2, FiUserCheck, FiEyeOff } from "react-icons/fi";

export function ReportCard({
  report,
  openDeleteDialog,
  handleWarnCreator,
  handleDismissReport,
}) {
  return (
    <Card className="border border-red-100 bg-white shadow-sm rounded-2xl overflow-hidden p-6 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <Chip size="sm" color="danger" variant="flat">
              Reason: {report.reason}
            </Chip>
            <span className="text-xs text-gray-400">
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Prompt Title: <span className="text-indigo-600">{report.promptTitle}</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <strong className="text-xs text-gray-400 block uppercase mb-1">Reporter Description:</strong>
              {report.description || "No specific comment provided."}
            </p>
          </div>

          <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
            <span><strong>Creator:</strong> {report.creatorEmail}</span>
            <span><strong>Reporter:</strong> {report.reporterEmail || "Anonymous"}</span>
          </div>
        </div>

        <div className="flex flex-row lg:flex-col justify-end gap-3 items-center lg:items-stretch min-w-[180px]">
          <Button
            size="sm"
            color="danger"
            variant="solid"
            className="font-medium rounded-xl flex items-center gap-1"
            onClick={() => openDeleteDialog(report._id, report.promptTitle)}
          >
            <FiTrash2 size={16} /> Remove Prompt
          </Button>

          <Button
            size="sm"
            color="warning"
            variant="flat"
            className="font-medium rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-1"
            onClick={() => handleWarnCreator(report._id, report.creatorEmail)}
          >
            <FiUserCheck size={16} /> Warn Creator
          </Button>

          <Button
            size="sm"
            color="default"
            variant="light"
            className="font-medium rounded-xl hover:bg-gray-100 text-gray-500 flex items-center gap-1"
            onClick={() => handleDismissReport(report._id)}
          >
            <FiEyeOff size={16} /> Dismiss / Safe
          </Button>
        </div>
      </div>
    </Card>
  );
}