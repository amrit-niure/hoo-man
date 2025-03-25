"use client";

interface RecentActivityProps {
  recentAttendance: any[];
}

export default function RecentActivity({ recentAttendance }: RecentActivityProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentAttendance.map((attendance) => (
          <div
            key={attendance.id}
            className="border-b pb-2 last:border-b-0 last:pb-0"
          >
            <p className="font-medium">
              {new Date(attendance.clockInTime).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Clock In: {new Date(attendance.clockInTime).toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-600">
              Clock Out:{" "}
              {attendance.clockOutTime
                ? new Date(attendance.clockOutTime).toLocaleTimeString()
                : "Not clocked out"}
            </p>
            {attendance.totalHours > 0 && (
              <p className="text-sm text-gray-600">
                Total Hours: {attendance.totalHours.toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
