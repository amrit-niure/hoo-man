import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "@prisma/client";

// export interface Employee {
//   id: string;
//   name: string;
//   position: string;
//   department: string;
//   email: string;
//   phone: string;
//   avatar?: string;
//   status: "active" | "on-leave" | "inactive";
//   hireDate: string;
// }

interface EmployeeCardProps {
  employee: Employee;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const EmployeeCard = ({ employee, onView, onEdit }: EmployeeCardProps) => {
  const statusStyles = {
    "active": "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
    "on-leave": "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
    "inactive": "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400",
  };

  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-in">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {employee.avatar ? (
                  <img 
                    src={employee.avatar} 
                    alt={employee.name} 
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  employee.name.split(" ").map(n => n[0]).join("")
                )}
              </div>
              <div>
                <h3 className="font-medium">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(employee.id)}>View Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(employee.id)}>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="px-4 py-2 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm">{employee.department}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hire Date</p>
                <p className="text-sm">{employee.joinDate.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-2 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm">{employee.phone}</span>
            </div>
          </div>
          
          <div className="mt-auto p-4 pt-2 border-t border-border flex justify-between items-center">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              statusStyles[employee.status as keyof typeof statusStyles]
            )}>
                {employee.status === "ACTIVE" ? "Active" : 
                 employee.status === "ON_LEAVE" ? "On Leave" :
                 employee.status === "INACTIVE" ? "Inactive" :
                 employee.status === "RESIGNED" ? "Resigned" :
                 employee.status === "TERMINATED" ? "Terminated" : "Inactive"}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => onView(employee.id)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;