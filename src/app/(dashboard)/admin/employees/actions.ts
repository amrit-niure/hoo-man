"use server"
import { auth } from "@/lib/auth";
import { addEmployeeSchema, IAddEmployee } from "./components/validation";
import { signUpFormSchema } from "@/app/(auth)/admin/validation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireCompany } from "@/app/utils/hooks";

const registerEmployee = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const res = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role: "USER",
        }
    })
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

        const response = await registerEmployee({
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
                userId: response.user.id,
                companyProfileId: company.id,
            }
        });
        revalidatePath("/dashboard/admin")
        return { success: true, message: "Employee added successfully" }
    } catch (error) {
        console.error("Error adding employee:", error);
        return { success: false, message: "Failed to register employee " }

    }

}