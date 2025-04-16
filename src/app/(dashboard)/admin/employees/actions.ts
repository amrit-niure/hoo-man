"use server"
import { auth } from "@/lib/auth";
import { addEmployeeSchema, IAddEmployee, IUpdateEmployee } from "./components/validation";
import { signUpFormSchema } from "@/app/(auth)/admin/validation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireCompany } from "@/app/utils/hooks";
import { response } from "@/app/utils/response";
import { sendEmail } from "@/lib/email";

const registerEmployee = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const res = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role: "USER",
        }
    })
    revalidatePath("/admin")
    return res;
}

export const addEmployee = async (data: IAddEmployee) => {
    try {
        // First validate the input data
        const signUpData = {
            orgName: data.name,
            email: data.email,
            password: data.password,
            role: "USER",
        };
        const validateSignUpData = signUpFormSchema.parse(signUpData);
        const validateEmployeeData = addEmployeeSchema.parse(data);

        // Get the company and check employee limit
        const company = await requireCompany();
        
        // Get current employee count
        const employeeCount = await prisma.employee.count({
            where: { companyProfileId: company.id }
        });

        // Determine maximum allowed employees based on plan
        let maxEmployees;
        switch (company.plan) {
            case 'FREE':
                maxEmployees = 3;
                break;
            case 'BASIC':
                maxEmployees = 10;
                break;
            case 'PRO':
                maxEmployees = 30;
                break;
            case 'ENTERPRISE':
                maxEmployees = 50;
                break;
            default:
                maxEmployees = 3; // Default to free plan limit
        }

        // Check if employee limit is reached
        if (employeeCount >= maxEmployees) {
            throw new Error(
                `You have reached the maximum number of employees (${maxEmployees}) for your ${company.plan} plan. ` +
                'Please upgrade your plan to add more employees.'
            );
        }

        // Register the employee user
        const res = await registerEmployee({
            name: validateSignUpData.orgName,
            email: validateSignUpData.email,
            password: validateSignUpData.password,
        });

        // Create the employee record
        await prisma.employee.create({
            data: {
                name: validateEmployeeData.name,
                email: validateEmployeeData.email,
                phone: validateEmployeeData.phone,
                address: validateEmployeeData.address,
                dateOfBirth: validateEmployeeData.dateOfBirth,
                joinDate: validateEmployeeData.joinDate,
                department: validateEmployeeData.department,
                position: validateEmployeeData.position,
                userId: res.user.id,
                companyProfileId: company.id,
            }
        });

        // Send welcome email
        await sendEmail({
            to: validateEmployeeData.email,
            subject: "Welcome to our company",
            body: `Hello ${validateEmployeeData.name},\n\nWelcome to our company! We are excited to have you on board.\n\n
            Your credentials are as follows:\n\n
            Email: ${validateEmployeeData.email}\n
            Password: ${validateEmployeeData.password}\n\n
            Please log in to your account and change your password as soon as possible.\n\n
            If you have any questions or need assistance, feel free to reach out to us.\n\n
            Thank you for joining us!\n\n
            \n\nBest regards,\n ${company.companyName} Team`,
        });

        revalidatePath("/admin/employees");
        return response(true, "Employee added successfully", res.user.id);
    } catch (error) {
        console.error("Error adding employee:", error);
        return response(false, error instanceof Error ? error.message : "Failed to add employee", error);
    }
};

export async function updateEmployee(data: IUpdateEmployee) {
    try {
        const updated = await prisma.employee.update({
            where: { id: data.id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                dateOfBirth: data.dateOfBirth,
                joinDate: data.joinDate,
                department: data.department,
                position: data.position,
                status: data.status,
            },
        });

        revalidatePath("/admin/employees");
        return { success: true, data: updated };
    } catch (error) {
        console.error("Error updating employee:", error);
        return { success: false, message: "Failed to update employee" };
    }
}