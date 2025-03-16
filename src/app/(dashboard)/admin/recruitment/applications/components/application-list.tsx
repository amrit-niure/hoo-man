"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ApplicationList() {
  const applications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      date: "June 15, 2023",
      status: "New",
      avatar: "/avatars/01.png",
      initials: "SJ",
      isActive: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      date: "June 14, 2023",
      status: "Shortlisted",
      avatar: "/avatars/02.png",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UX Designer",
      date: "June 12, 2023",
      status: "Interviewed",
      avatar: "/avatars/03.png",
      initials: "ED",
    },
    {
      id: 4,
      name: "David Wilson",
      position: "DevOps Engineer",
      date: "June 10, 2023",
      status: "New",
      avatar: "/avatars/04.png",
      initials: "DW",
    },
    {
      id: 5,
      name: "Jennifer Lee",
      position: "Marketing Specialist",
      date: "June 8, 2023",
      status: "Shortlisted",
      avatar: "/avatars/05.png",
      initials: "JL",
    },
    {
      id: 6,
      name: "Robert Brown",
      position: "Backend Developer",
      date: "June 7, 2023",
      status: "New",
      avatar: "/avatars/06.png",
      initials: "RB",
    },
    {
      id: 7,
      name: "Jessica Taylor",
      position: "Sales Representative",
      date: "June 5, 2023",
      status: "Rejected",
      avatar: "/avatars/07.png",
      initials: "JT",
    },
    {
      id: 8,
      name: "Thomas Martinez",
      position: "Customer Support Specialist",
      date: "June 3, 2023",
      status: "Shortlisted",
      avatar: "/avatars/08.png",
      initials: "TM",
    },
  ]

  return (
    <div className="space-y-1 p-2">
      {applications.map((application) => (
        <div
          key={application.id}
          className={`flex items-center gap-4 rounded-lg border p-3 ${
            application.isActive ? "bg-accent" : ""
          }`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={application.avatar} alt={application.name} />
            <AvatarFallback>{application.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{application.name}</p>
            <p className="text-xs text-muted-foreground">{application.position}</p>
            <div className="flex items-center pt-1">
              <p className="text-xs text-muted-foreground">{application.date}</p>
              <Badge
                variant="outline"
                className={`ml-2 ${
                  application.status === "New"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : application.status === "Shortlisted"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : application.status === "Interviewed"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : application.status === "Rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : ""
                }`}
              >
                {application.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
