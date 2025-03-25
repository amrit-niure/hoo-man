"use client";
import { useState } from "react";
import { clockIn, clockOut } from "../../actions";

interface AttendanceActionsProps {
  currentAttendance: any;
  user: any;
}

export default function AttendanceActions({
  currentAttendance: initialCurrentAttendance,
  user,
}: AttendanceActionsProps) {
  const [currentAttendance, setCurrentAttendance] = useState(
    initialCurrentAttendance
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClockIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await clockIn();
      if (result.success) {
        setCurrentAttendance(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to clock in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await clockOut();
      if (result.success) {
        setCurrentAttendance(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to clock out");
    } finally {
      setIsLoading(false);
    }
  };

  const isClockInDisabled =
    isLoading || (currentAttendance && !currentAttendance.clockOutTime);
  const isClockOutDisabled =
    isLoading ||
    !currentAttendance ||
    (currentAttendance && currentAttendance.clockOutTime);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance Actions</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="flex flex-col gap-4">
        <button
          onClick={handleClockIn}
          disabled={isClockInDisabled}
          className={`px-4 py-2 rounded ${
            isClockInDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Clock In
        </button>
        
        <button
          onClick={handleClockOut}
          disabled={isClockOutDisabled}
          className={`px-4 py-2 rounded ${
            isClockOutDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          Clock Out
        </button>
      </div>
    </div>
  );
}
