// app/leaves/LeaveTable.tsx (Client Component)
"use client";

import { LeaveStatus, LeaveType } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateLeaveStatus } from "./actions";

interface SimpleLeaveRequest {
  id: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
}

export default function LeaveTable({ leaveRequests }: { leaveRequests: SimpleLeaveRequest[] }) {
  const handleStatusUpdate = async (id: string, status: LeaveStatus) => {
    await updateLeaveStatus(id, status);
    // You might want to add a refresh here or handle the state update
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.map((leave) => {
          const start = parseISO(leave.startDate);
          const end = parseISO(leave.endDate);
          const dates = `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
          

          return (
            <TableRow key={leave.id}>
              <TableCell>{leave.employeeName}</TableCell>
              <TableCell className="capitalize">{leave.leaveType.toLowerCase()}</TableCell>
              <TableCell>{dates}</TableCell>
              <TableCell>
                <Badge variant={"default"}>{leave.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleStatusUpdate(leave.id, LeaveStatus.APPROVED)}
                    disabled={leave.status !== LeaveStatus.PENDING}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleStatusUpdate(leave.id, LeaveStatus.REJECTED)}
                    disabled={leave.status !== LeaveStatus.PENDING}
                  >
                    Decline
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}