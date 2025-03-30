"use server"
import { auth } from "@/lib/auth";
import { addEmployeeSchema, IAddEmployee, IUpdateEmployee } from "./components/validation";
import { signUpFormSchema } from "@/app/(auth)/admin/validation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireCompany } from "@/app/utils/hooks";
import { response } from "@/app/utils/response";

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
        const signUpData = {
            orgName: data.name,
            email: data.email,
            password: data.password,
            role: "USER",
        };
        const validateSignUpData = signUpFormSchema.parse(signUpData);
        const validateEmployeeData = addEmployeeSchema.parse(data);

        const res = await registerEmployee({
            name: validateSignUpData.orgName,
            email: validateSignUpData.email,
            password: validateSignUpData.password,
        });
        const company = await requireCompany()
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
        revalidatePath("/admin/employees", "page")
        return response(true, "Employee added successfully", res.user.id)
    } catch (error) {
        console.error("Error adding employee:", error);
        return response(false, "Failed to add employee", error)
    }

}

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