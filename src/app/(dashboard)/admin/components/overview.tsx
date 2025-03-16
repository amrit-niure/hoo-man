"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    Payroll: 324000,
    Employees: 220,
  },
  {
    name: "Feb",
    Payroll: 316000,
    Employees: 218,
  },
  {
    name: "Mar",
    Payroll: 318000,
    Employees: 222,
  },
  {
    name: "Apr",
    Payroll: 320000,
    Employees: 225,
  },
  {
    name: "May",
    Payroll: 322000,
    Employees: 230,
  },
  {
    name: "Jun",
    Payroll: 324895,
    Employees: 245,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="Payroll" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Employees" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
