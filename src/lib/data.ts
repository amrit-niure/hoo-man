import { Department, EmployeeStatus } from "@prisma/client"

export type Employee = {
  id: string
  userId: string
  name: string
  avatar?: string | null
  email: string
  phone: string
  position: string
  department: Department
  address: string
  dateOfBirth: Date
  joinDate: Date
  status: EmployeeStatus
  companyProfileId?: string | null
}

export type Attendance = {
  id: string
  employeeId: string
  clockInTime: Date
  clockOutTime: Date | null
  totalHours: number | null
  employee?: Employee
}

// Generate dummy employees
export const employees: Employee[] = [
  {
    id: "e1",
    userId: "u1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    position: "Software Engineer",
    department: Department.INFORMATION_TECHNOLOGY,
    address: "123 Main St, Anytown, USA",
    dateOfBirth: new Date("1990-01-15"),
    joinDate: new Date("2020-03-10"),
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "e2",
    userId: "u2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    position: "HR Manager",
    department: Department.HUMAN_RESOURCES,
    address: "456 Oak St, Somewhere, USA",
    dateOfBirth: new Date("1985-05-20"),
    joinDate: new Date("2018-07-15"),
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "e3",
    userId: "u3",
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "michael.johnson@example.com",
    phone: "345-678-9012",
    position: "Financial Analyst",
    department: Department.FINANCE,
    address: "789 Pine St, Elsewhere, USA",
    dateOfBirth: new Date("1988-11-30"),
    joinDate: new Date("2019-02-05"),
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "e4",
    userId: "u4",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "emily.davis@example.com",
    phone: "456-789-0123",
    position: "Marketing Specialist",
    department: Department.MARKETING,
    address: "101 Maple St, Nowhere, USA",
    dateOfBirth: new Date("1992-08-12"),
    joinDate: new Date("2021-01-20"),
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: "e5",
    userId: "u5",
    name: "Robert Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "robert.wilson@example.com",
    phone: "567-890-1234",
    position: "Sales Representative",
    department: Department.SALES,
    address: "202 Cedar St, Anywhere, USA",
    dateOfBirth: new Date("1987-03-25"),
    joinDate: new Date("2017-09-15"),
    status: EmployeeStatus.ON_LEAVE,
  },
]

// Generate dummy attendance records for the past week
export const generateAttendanceData = (): Attendance[] => {
  const attendances: Attendance[] = []
  const today = new Date()

  // For each employee, generate attendance for the past 7 days
  employees.forEach((employee) => {
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue

      // Set clock in time (9 AM with some variation)
      const clockInTime = new Date(date)
      clockInTime.setHours(9)
      clockInTime.setMinutes(Math.floor(Math.random() * 15)) // Random minutes between 0-14

      // Set clock out time (5 PM with some variation)
      const clockOutTime = new Date(date)
      clockOutTime.setHours(17)
      clockOutTime.setMinutes(Math.floor(Math.random() * 30) + 30) // Random minutes between 30-59

      // Calculate total hours
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

      // Add attendance record
      attendances.push({
        id: `a${attendances.length + 1}`,
        employeeId: employee.id,
        clockInTime,
        clockOutTime,
        totalHours,
        employee,
      })
    }
  })

  // Add a few records for today with null clock out for some employees
  const todayMorning = new Date(today)
  todayMorning.setHours(9)
  todayMorning.setMinutes(Math.floor(Math.random() * 15))

  attendances.push({
    id: `a${attendances.length + 1}`,
    employeeId: "e1",
    clockInTime: todayMorning,
    clockOutTime: null,
    totalHours: null,
    employee: employees.find((e) => e.id === "e1"),
  })

  const todayMorning2 = new Date(today)
  todayMorning2.setHours(9)
  todayMorning2.setMinutes(Math.floor(Math.random() * 15) + 5)

  attendances.push({
    id: `a${attendances.length + 1}`,
    employeeId: "e2",
    clockInTime: todayMorning2,
    clockOutTime: null,
    totalHours: null,
    employee: employees.find((e) => e.id === "e2"),
  })

  return attendances
}

export const attendances = generateAttendanceData()

// Function to get attendance by employee ID
export const getAttendanceByEmployeeId = (employeeId: string): Attendance[] => {
  return attendances.filter((attendance) => attendance.employeeId === employeeId)
}

// Function to get attendance by date range
export const getAttendanceByDateRange = (startDate: Date, endDate: Date): Attendance[] => {
  return attendances.filter((attendance) => {
    const date = new Date(attendance.clockInTime)
    return date >= startDate && date <= endDate
  })
}

// Function to get today's attendance
export const getTodayAttendance = (): Attendance[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return attendances.filter((attendance) => {
    const date = new Date(attendance.clockInTime)
    return date >= today && date < tomorrow
  })
}

// Function to format date to YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]
}

// Function to format time to HH:MM AM/PM
export const formatTime = (date: Date | null): string => {
  if (!date) return "Not clocked out"

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

// Function to format department enum to readable string
export const formatDepartment = (department: Department): string => {
  return department
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

