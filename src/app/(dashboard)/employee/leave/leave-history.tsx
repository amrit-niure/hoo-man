// app/employee/leaves/LeaveHistoryTable.tsx (Client Component)
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LeaveHistory = {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
};

const columns: ColumnDef<LeaveHistory>[] = [
  {
    accessorKey: "leaveType",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.getValue("leaveType").toLowerCase().replace(/_/g, ' ')}
      </span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => format(parseISO(row.getValue("startDate")), "MMM dd, yyyy"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => format(parseISO(row.getValue("endDate")), "MMM dd, yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = {
        APPROVED: "default",
        REJECTED: "destructive",
        PENDING: "secondary",
      }[status] as "success" | "destructive" | "secondary";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export function LeaveHistoryTable({ leaves }: { leaves: LeaveHistory[] }) {
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
        {leaves.map((leave) => (
          <TableRow key={leave.id}>
            {columns.map((column) => {
              const cellValue = column.cell
                ? column.cell({ row: { original: leave, getValue: () => leave[column.accessorKey as keyof LeaveHistory] } })
                : leave[column.accessorKey as keyof LeaveHistory];

              return <TableCell key={column.id}>{cellValue}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}