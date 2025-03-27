// app/employee/leaves/LeaveHistoryTable.tsx (Client Component)
"use client";

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

export function LeaveHistoryTable({ leaves }: { leaves: LeaveHistory[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaves.map((leave) => (
          <TableRow key={leave.id}>
            <TableCell className="capitalize">
              {leave.leaveType.toLowerCase().replace(/_/g, ' ')}
            </TableCell>
            <TableCell>
              {format(parseISO(leave.startDate), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              {format(parseISO(leave.endDate), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              <Badge>
                {leave.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}