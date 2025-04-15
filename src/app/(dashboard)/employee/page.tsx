// "use client"
// import { Card } from "@/components/ui/card";
// import {
//   Building,
//   Calendar,
//   FileText,
//   Mail,
//   MapPin,
//   Phone,
//   User,
//   Briefcase,
//   BadgeCheck,
// } from "lucide-react";
// import { format } from "date-fns";

import { prisma } from "@/lib/db";
import EmployeeProfileClient from "./components/employee-profile-client";
import { requireUser } from "@/app/utils/hooks";

// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import { Department, Employee } from "@prisma/client";
// import { EditEmployeeDialog } from "../admin/employees/components/edit-employee-dialog";

// interface BadgeCustomProps {
//   status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
//   className?: string;
// }

// export function BadgeCustom({ status, className }: BadgeCustomProps) {
//   const baseStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium";
  
//   const statusStyles = {
//     ACTIVE: "bg-green-100 text-green-800",
//     INACTIVE: "bg-red-100 text-red-800",
//     ON_LEAVE: "bg-yellow-100 text-yellow-800",
//   };

//   return (
//     <span className={cn(baseStyle, statusStyles[status], className)}>
//       {status.replace("_", " ")}
//     </span>
//   );
// }

// // Mock data representing an employee
// const employeeData = {
//   id: "12345",
//   userId: "user123",
//   name: "Jane Smith",
//   avatar: "https://source.unsplash.com/350x350/?portrait",
//   email: "jane.smith@company.com",
//   phone: "+1 (555) 123-4567",
//   position: "Senior Software Engineer",
//   department: Department.FINANCE,
//   address: "123 Tech Street, Silicon Valley, CA 94025",
//   dateOfBirth: new Date("1990-05-15"),
//   joinDate: new Date("2020-03-01"),
//   status: "ACTIVE",
//   companyProfileId: "company123", // Added property
//   documents: [
//     "Contract.pdf",
//     "Resume.pdf",
//     "CertificationA.pdf",
//     "Training2023.pdf",
//   ],
// };

// const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
//   <div className="flex items-start gap-3 text-gray-700">
//     <Icon className="w-5 h-5 mt-0.5 text-purple-600" />
//     <div>
//       <p className="text-sm font-medium text-gray-500">{label}</p>
//       <p className="mt-1">{value}</p>
//     </div>
//   </div>
// );

// export default function EmployeeProfile() {
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

//   const handleEditClick = () => {
//     // Convert the mock data to match the Employee type
//     const employee: Employee = {
//       ...employeeData,
//       status: employeeData.status as "ACTIVE" | "INACTIVE" | "ON_LEAVE",
//     };
//     setSelectedEmployee(employee);
//     setEditDialogOpen(true);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <Card className="p-6">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             <div className="relative">
//               <Image
//                 src={employeeData.avatar}
//                 alt={employeeData.name}
//                 width={100}
//                 height={100}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <BadgeCustom
//                 status={employeeData.status as any}
//                 className="absolute -bottom-2 -right-2"
//               />
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900">{employeeData.name}</h1>
//               <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
//                 <span className="flex items-center gap-1">
//                   <Briefcase className="w-4 h-4" />
//                   {employeeData.position}
//                 </span>
//                 <span>•</span>
//                 <span className="flex items-center gap-1">
//                   <Building className="w-4 h-4" />
//                   {employeeData.department}
//                 </span>
//               </div>
//             </div>
//             <div>
//               <Button 
//                 variant="outline" 
//                 onClick={handleEditClick}
//                 className="flex items-center gap-2"
//               >
//                 <Pencil className="w-4 h-4" />
//                 Edit Profile
//               </Button>
//             </div>
//           </div>
//         </Card>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Personal Information */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Personal Information
//             </h2>
//             <div className="space-y-4">
//               <InfoItem 
//                 icon={Mail} 
//                 label="Email" 
//                 value={employeeData.email} 
//               />
//               <InfoItem 
//                 icon={Phone} 
//                 label="Phone" 
//                 value={employeeData.phone} 
//               />
//               <InfoItem 
//                 icon={MapPin} 
//                 label="Address" 
//                 value={employeeData.address} 
//               />
//               <InfoItem 
//                 icon={Calendar} 
//                 label="Date of Birth" 
//                 value={format(employeeData.dateOfBirth, "MMMM do, yyyy")} 
//               />
//             </div>
//           </Card>

//           {/* Employment Details */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Employment Details
//             </h2>
//             <div className="space-y-4">
//               <InfoItem 
//                 icon={BadgeCheck} 
//                 label="Employee ID" 
//                 value={employeeData.id} 
//               />
//               <InfoItem 
//                 icon={User} 
//                 label="User ID" 
//                 value={employeeData.userId} 
//               />
//               <InfoItem 
//                 icon={Calendar} 
//                 label="Join Date" 
//                 value={format(employeeData.joinDate, "MMMM do, yyyy")} 
//               />
//               <InfoItem 
//                 icon={Building} 
//                 label="Department" 
//                 value={employeeData.department} 
//               />
//             </div>
//           </Card>

//           {/* Documents */}
//           <Card className="p-6 md:col-span-2">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {employeeData.documents.map((doc, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <FileText className="w-5 h-5 text-purple-600" />
//                   <span className="text-sm text-gray-700">{doc}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Edit Employee Dialog */}
//         <EditEmployeeDialog
//           employee={selectedEmployee}
//           open={editDialogOpen}
//           onOpenChange={setEditDialogOpen}
//         />
//       </div>
//     </div>
//   );
// }
















export default async function EmployeeProfilePage() {

  const user = await requireUser();

  if (!user?.employee) {
    return <div className="flex min-h-screen items-center justify-center">Unauthorized</div>;
  }
  // Fetch employee data from database
  const employee = await prisma.employee.findUnique({
    where: {
      id: user?.employee.id,
    }
  });

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return <EmployeeProfileClient employeeData={employee} avatar={user.image} />;
}