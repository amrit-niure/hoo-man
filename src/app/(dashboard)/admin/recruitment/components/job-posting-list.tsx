"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Eye, Copy, Archive } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface JobPostingListProps {
  status: "active" | "draft" | "closed"
}

export function JobPostingList({ status }: JobPostingListProps) {
  const getJobPostings = (status: string) => {
    const activeJobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        postedDate: "June 10, 2023",
        applications: 24,
        status: "Active",
      },
      {
        id: 2,
        title: "Product Manager",
        department: "Product",
        location: "New York, NY",
        type: "Full-time",
        postedDate: "June 8, 2023",
        applications: 18,
        status: "Active",
      },
      {
        id: 3,
        title: "UX Designer",
        department: "Design",
        location: "San Francisco, CA",
        type: "Full-time",
        postedDate: "June 5, 2023",
        applications: 32,
        status: "Active",
      },
      {
        id: 4,
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        postedDate: "June 3, 2023",
        applications: 12,
        status: "Active",
      },
      {
        id: 5,
        title: "Marketing Specialist",
        department: "Marketing",
        location: "Chicago, IL",
        type: "Full-time",
        postedDate: "June 1, 2023",
        applications: 15,
        status: "Active",
      },
    ]

    const draftJobs = [
      {
        id: 6,
        title: "Backend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        postedDate: "Not posted",
        applications: 0,
        status: "Draft",
      },
      {
        id: 7,
        title: "Sales Representative",
        department: "Sales",
        location: "Miami, FL",
        type: "Full-time",
        postedDate: "Not posted",
        applications: 0,
        status: "Draft",
      },
      {
        id: 8,
        title: "Customer Support Specialist",
        department: "Support",
        location: "Remote",
        type: "Part-time",
        postedDate: "Not posted",
        applications: 0,
        status: "Draft",
      },
    ]

    const closedJobs = [
      {
        id: 9,
        title: "Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        postedDate: "May 15, 2023",
        applications: 45,
        status: "Closed",
      },
      {
        id: 10,
        title: "HR Manager",
        department: "HR",
        location: "Boston, MA",
        type: "Full-time",
        postedDate: "May 10, 2023",
        applications: 28,
        status: "Closed",
      },
      {
        id: 11,
        title: "Content Writer",
        department: "Marketing",
        location: "Remote",
        type: "Contract",
        postedDate: "May 5, 2023",
        applications: 36,
        status: "Closed",
      },
    ]

    switch (status) {
      case "active":
        return activeJobs
      case "draft":
        return draftJobs
      case "closed":
        return closedJobs
      default:
        return []
    }
  }

  const jobs = getJobPostings(status)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Posted Date</TableHead>
          <TableHead>Applications</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.title}</TableCell>
            <TableCell>{job.department}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>{job.type}</TableCell>
            <TableCell>{job.postedDate}</TableCell>
            <TableCell>{job.applications}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  job.status === "Active"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : job.status === "Draft"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }
              >
                {job.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    {job.status === "Active" ? "Close" : job.status === "Draft" ? "Publish" : "Reopen"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
