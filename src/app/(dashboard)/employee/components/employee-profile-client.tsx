// app/employee/[id]/employee-profile-client.tsx
"use client";

import { Card } from "@/components/ui/card";
import {
  Building,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  Briefcase,
  BadgeCheck,
  User2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {  Employee } from "@prisma/client";
import { EditEmployeeDialog } from "../../admin/employees/components/edit-employee-dialog";
import ChangePassword from "./change-password";

interface BadgeCustomProps {
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  className?: string;
}

export function BadgeCustom({ status, className }: BadgeCustomProps) {
  const baseStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-red-100 text-red-800",
    ON_LEAVE: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={cn(baseStyle, statusStyles[status], className)}>
      {status.replace("_", " ")}
    </span>
  );
}
// eslint-disable-next-line
const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 text-gray-700">
    <Icon className="w-5 h-5 mt-0.5 text-purple-600" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  </div>
);

interface EmployeeProfileClientProps {
  employeeData: Employee ,
  avatar: string | null
}

export default function EmployeeProfileClient({ employeeData }: EmployeeProfileClientProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEditClick = () => {
    setSelectedEmployee(employeeData);
    setEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <User2
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg p-4 bg-slate-300"
                strokeWidth={1}
              />
              <BadgeCustom
                status={
                  ["ACTIVE", "INACTIVE", "ON_LEAVE"].includes(employeeData.status)
                    ? (employeeData.status as "ACTIVE" | "INACTIVE" | "ON_LEAVE")
                    : "INACTIVE"
                }
                className="absolute -bottom-2 -right-2"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{employeeData.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {employeeData.position}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {employeeData.department}
                </span>
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                onClick={handleEditClick}
                className="flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <InfoItem 
                icon={Mail} 
                label="Email" 
                value={employeeData.email} 
              />
              <InfoItem 
                icon={Phone} 
                label="Phone" 
                value={employeeData.phone || "Not provided"} 
              />
              <InfoItem 
                icon={MapPin} 
                label="Address" 
                value={employeeData.address || "Not provided"} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Date of Birth" 
                value={employeeData.dateOfBirth ? 
                  format(employeeData.dateOfBirth, "MMMM do, yyyy") : 
                  "Not provided"} 
              />
            </div>
          </Card>

          {/* Employment Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Employment Details
            </h2>
            <div className="space-y-4">
              <InfoItem 
                icon={BadgeCheck} 
                label="Employee ID" 
                value={employeeData.id} 
              />
              <InfoItem 
                icon={User} 
                label="User ID" 
                value={employeeData.userId || "Not provided"} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Join Date" 
                value={employeeData.joinDate ? 
                  format(employeeData.joinDate, "MMMM do, yyyy") : 
                  "Not provided"} 
              />
              <InfoItem 
                icon={Building} 
                label="Department" 
                value={employeeData.department} 
              />
            </div>
          </Card>

          {/* Documents */}
          {employeeData.documents.length > 0 && (
            <Card className="p-6 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {employeeData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700"><a href={doc} target="_blank" rel="noopener noreferrer"> Document {doc.slice(-5)}</a></span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <ChangePassword />

        {/* Edit Employee Dialog */}
        <EditEmployeeDialog
          employee={selectedEmployee}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      </div>
    </div>
  );
}