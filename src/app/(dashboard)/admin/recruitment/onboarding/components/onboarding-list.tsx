"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function OnboardingList() {
  const employees = [
    {
      id: 1,
      name: "Alex Martinez",
      position: "Frontend Developer",
      startDate: "June 15, 2023",
      progress: 75,
      avatar: "/avatars/01.png",
      initials: "AM",
      isActive: true,
    },
    {
      id: 2,
      name: "Jessica Taylor",
      position: "UX Designer",
      startDate: "June 10, 2023",
      progress: 60,
      avatar: "/avatars/02.png",
      initials: "JT",
    },
    {
      id: 3,
      name: "Ryan Wilson",
      position: "Product Manager",
      startDate: "June 5, 2023",
      progress: 90,
      avatar: "/avatars/03.png",
      initials: "RW",
    },
    {
      id: 4,
      name: "Sophia Lee",
      position: "Marketing Specialist",
      startDate: "June 1, 2023",
      progress: 40,
      avatar: "/avatars/04.png",
      initials: "SL",
    },
    {
      id: 5,
      name: "Daniel Brown",
      position: "Backend Developer",
      startDate: "May 25, 2023",
      progress: 85,
      avatar: "/avatars/05.png",
      initials: "DB",
    },
    {
      id: 6,
      name: "Olivia Johnson",
      position: "HR Coordinator",
      startDate: "May 20, 2023",
      progress: 95,
      avatar: "/avatars/06.png",
      initials: "OJ",
    },
    {
      id: 7,
      name: "Ethan Davis",
      position: "Sales Representative",
      startDate: "May 15, 2023",
      progress: 50,
      avatar: "/avatars/07.png",
      initials: "ED",
    },
    {
      id: 8,
      name: "Emma Wilson",
      position: "Customer Support",
      startDate: "May 10, 2023",
      progress: 30,
      avatar: "/avatars/08.png",
      initials: "EW",
    },
  ]

  return (
    <div className="space-y-1 p-2">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className={`flex items-center gap-4 rounded-lg border p-3 ${
            employee.isActive ? "bg-accent" : ""
          }`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{employee.name}</p>
            <p className="text-xs text-muted-foreground">{employee.position}</p>
            <div className="flex items-center pt-1">
              <p className="text-xs text-muted-foreground">Start: {employee.startDate}</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Progress value={employee.progress} className="h-2 flex-1" />
              <span className="text-xs font-medium">{employee.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
