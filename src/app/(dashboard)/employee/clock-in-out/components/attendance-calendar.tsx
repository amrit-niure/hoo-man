"use client";

interface AttendanceCalendarProps {
  monthlyAttendance: any[];
}

export default function AttendanceCalendar({
  monthlyAttendance,
}: AttendanceCalendarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
      <div className="space-y-2">
        {monthlyAttendance.map((attendance) => (
          <div
            key={attendance.id}
            className="flex items-center justify-between text-sm"
          >
            <span>{new Date(attendance.clockInTime).toLocaleDateString()}</span>
            <span
              className={`px-2 py-1 rounded ${
                attendance.clockOutTime
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {attendance.clockOutTime ? "Complete" : "In Progress"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
