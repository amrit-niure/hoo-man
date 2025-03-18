"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import EmployeeCard from "./employee-card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddEmployeeForm from "./add-employee-form";
import { Employee } from "@prisma/client";

const EmployeeList = ({ourEmployees }: {ourEmployees : Employee[]}) => {
  const [employees] = useState<Employee[]>(ourEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null); // Allow null for no selection
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // Allow null for no selection
  const [openDialog, setOpenDialog] = useState(false);
  const handleViewEmployee = (id: string) => {
    toast(`Viewing employee with ID: ${id}`);
  };

  const handleEditEmployee = (id: string) => {
    toast(`Editing employee with ID: ${id}`);
  };

  const filteredEmployees = employees.filter((employee) => {
    // Filter by search term
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by department
    const matchesDepartment =
      !departmentFilter || employee.department === departmentFilter;

    // Filter by status
    const matchesStatus = !statusFilter || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Extract unique departments for filter
  const departments = Array.from(new Set(employees.map((e) => e.department)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Department Filter */}
            <Select
              value={departmentFilter || ""} // Fallback to empty string if null
              onValueChange={(value) =>
                setDepartmentFilter(value === "all-departments" ? null : value)
              }
            >
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={statusFilter || ""} // Fallback to empty string if null
              onValueChange={(value) =>
                setStatusFilter(value === "all-status" ? null : value)
              }
            >
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new employee.
              </DialogDescription>
            </DialogHeader>
            <AddEmployeeForm onClose={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
        </div>
      </div>

      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onView={handleViewEmployee}
              onEdit={handleEditEmployee}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-secondary/80 p-3 rounded-full mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No employees found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setDepartmentFilter(null); // Reset to null
              setStatusFilter(null); // Reset to null
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;