import { prisma } from "@/lib/db";
import TeamAttendanceView from "./team-attendance-view";
import { requireCompany } from "@/app/utils/hooks";

export default async function TeamAttendancePage() {
  const company = await requireCompany();
  if (!company?.id) {
    return <TeamAttendanceView attendances={[]} />;
  }
  const attendances = await prisma.attendance.findMany({
    where: {
      employee: {
        companyProfileId: company.id, 
      },
    },
    include: {
      employee: true,
    },
    orderBy: {
      clockInTime: 'desc',
    },
  });

  return <TeamAttendanceView attendances={attendances} />;
}
