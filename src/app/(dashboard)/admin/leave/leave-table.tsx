// app/leaves/LeaveTable.tsx (Client Component)
"use client";

import { LeaveStatus, LeaveType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateLeaveStatus } from "./actions";

type LeaveWithEmployee = {
  id: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  employee: {
    user: {
      name: string;
    };
  };
};

export default function LeaveTable({ leaveRequests }: { leaveRequests: LeaveWithEmployee[] }) {
  const columns: ColumnDef<LeaveWithEmployee>[] = [
    {
      accessorKey: "employee.user.name",
      header: "Employee",
    },
    {
      accessorKey: "leaveType",
      header: "Leave Type",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.getValue("leaveType").toLowerCase()}
        </span>
      ),
    },
    {
      accessorKey: "dates",
      header: "Dates",
      cell: ({ row }) => {
        const start = parseISO(row.original.startDate);
        const end = parseISO(row.original.endDate);
        return `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as LeaveStatus;
        const variant = {
          [LeaveStatus.PENDING]: "secondary",
          [LeaveStatus.APPROVED]: "default",
          [LeaveStatus.REJECTED]: "destructive",
        }[status];

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const leave = row.original;
        
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => updateLeaveStatus(leave.id, LeaveStatus.APPROVED)}
              disabled={leave.status !== LeaveStatus.PENDING}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => updateLeaveStatus(leave.id, LeaveStatus.REJECTED)}
              disabled={leave.status !== LeaveStatus.PENDING}
            >
              Decline
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>
              {column.header as string}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((leave) => (
          <TableRow key={leave.id}>
            {columns.map((column) => {
              const cellValue = column.cell
                ? column.cell({ row: { original: leave, getValue: () => leave[column.accessorKey as keyof LeaveWithEmployee] } })
                : leave[column.accessorKey as keyof LeaveWithEmployee];

              return <TableCell key={column.id}>{cellValue}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}