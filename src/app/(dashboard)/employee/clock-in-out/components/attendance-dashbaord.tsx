"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { Clock, Loader2, Check, X, Clock as ClockIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { clockIn, clockOut, getAttendanceHistory } from "../../actions";
import { Attendance } from "@prisma/client";

interface AttendanceDashboardProps {
  initialData: {
    currentAttendance: Attendance | null;
    recentAttendances: Attendance[];
    monthlyAttendances: Attendance[];
  };
}

export default function AttendanceDashboard({
  initialData,
}: AttendanceDashboardProps) {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">
            {format(new Date(), "EEEE, MMMM dd, yyyy")}
          </p>
        </div>
        <CurrentTimeDisplay />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClockInOutCard
          currentAttendance={initialData.currentAttendance}
          recentAttendances={initialData.recentAttendances}
        />
        <CalendarCard monthlyAttendances={initialData.monthlyAttendances} />
        <AttendanceHistory initialAttendances={initialData.recentAttendances} />
      </div>
    </div>
  );
}

function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
      <ClockIcon className="h-5 w-5 text-primary" />
      <span className="font-medium">{format(currentTime, "HH:mm:ss")}</span>
    </div>
  );
}

function ClockInOutCard({
  currentAttendance: initialCurrentAttendance,
  recentAttendances: initialRecentAttendances,
}: {
  currentAttendance: Attendance | null;
  recentAttendances: Attendance[];
}) {
  const [loading, setLoading] = useState<"in" | "out" | null>(null);
  const [currentAttendance, setCurrentAttendance] = useState(
    initialCurrentAttendance
  );
  const [recentAttendances, setRecentAttendances] = useState(
    initialRecentAttendances.slice(0, 3)
  );

  const handleClockIn = async () => {
    try {
      setLoading("in");
      const result = await clockIn();

      if (result.data && typeof result.data === "object") {
        setCurrentAttendance(result.data as Attendance);
        setRecentAttendances((prev) =>
          [result.data as Attendance, ...prev].slice(0, 3)
        );
        toast.success(result.message, {
          icon: <Check className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast.error(result.message, {
          icon: <X className="h-5 w-5 text-red-500" />,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error clocking in");
    } finally {
      setLoading(null);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading("out");
      const result = await clockOut();

      if (result.data && typeof result.data === "object") {
        setCurrentAttendance(result.data as Attendance);
        setRecentAttendances((prev) =>
          [result.data as Attendance, ...prev].slice(0, 3)
        );
        toast.success(result.message, {
          icon: <Check className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast.error(result.message, {
          icon: <X className="h-5 w-5 text-red-500" />,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error clocking out");
    } finally {
      setLoading(null);
    }
  };

  const isClockInDisabled = Boolean(
    loading === "in" ||
      (currentAttendance && currentAttendance.clockOutTime === null)
  );

  const isClockOutDisabled = Boolean(
    loading === "out" ||
      !currentAttendance ||
      (currentAttendance && currentAttendance.clockOutTime !== null)
  );

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>Time Tracking</span>
          {currentAttendance && (
            <Badge
              variant={
                currentAttendance.clockOutTime === null ? "default" : "outline"
              }
            >
              {currentAttendance.clockOutTime === null
                ? "Clocked In"
                : "Clocked Out"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl font-bold">
            {format(new Date(), "HH:mm")}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            className="w-full"
            variant={isClockInDisabled ? "secondary" : "default"}
            onClick={handleClockIn}
            disabled={isClockInDisabled} // Removed the !! since it's already boolean
          >
            {loading === "in" && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Clock In
          </Button>
          <Button
            className="w-full"
            variant={isClockOutDisabled ? "secondary" : "default"}
            onClick={handleClockOut}
            disabled={isClockOutDisabled}
          >
            {loading === "out" && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Clock Out
          </Button>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentAttendances.length > 0 ? (
              recentAttendances.map((attendance) => (
                <div
                  key={attendance.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        attendance.clockOutTime === null
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {attendance.clockOutTime === null ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {attendance.clockOutTime === null
                          ? "Clock In"
                          : "Clock Out"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(attendance.clockInTime), "hh:mm a")}
                      </p>
                    </div>
                  </div>
                  {attendance.clockOutTime && (
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatDuration(
                          intervalToDuration({
                            start: new Date(attendance.clockInTime),
                            end: new Date(attendance.clockOutTime),
                          }),
                          { format: ["hours", "minutes"] }
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarCard({
  monthlyAttendances: initialMonthlyAttendances,
}: {
  monthlyAttendances: Attendance[];
}) {
  const [date, setDate] = useState<Date>(new Date());
  // eslint-disable-next-line 
  const [attendanceDates, setAttendanceDates] = useState<Date[]>(
    initialMonthlyAttendances.map((a) => new Date(a.clockInTime))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
          modifiers={{
            attended: attendanceDates,
          }}
          modifiersStyles={{
            attended: {
              border: "2px solid #3b82f6",
              backgroundColor: "#eff6ff",
            },
          }}
        />
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-500"></div>
          <span className="text-sm text-muted-foreground">Worked</span>
        </div>
      </CardContent>
    </Card>
  );
}

function AttendanceHistory({
  initialAttendances,
}: {
  initialAttendances: Attendance[];
}) {
  const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
  const [attendances, setAttendances] = useState(initialAttendances);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceHistory = async (period: "day" | "week" | "month") => {
    try {
      setLoading(true);
      const result = await getAttendanceHistory(period);
      if (result.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAttendances((result?.data as any[]) ?? []);
      } else {
        toast.error(result.message || "Error fetching attendance history");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch attendance history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory(activeTab);
  }, [activeTab]);

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Work History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="day"
          onValueChange={(value) =>
            setActiveTab(value as "day" | "week" | "month")
          }
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="day">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              Showing {attendances.length} records
            </div>
          </div>

          <TabsContent value={activeTab} className="py-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : attendances.length > 0 ? (
              <div className="space-y-3">
                {attendances.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-semibold">
                        {format(
                          new Date(attendance.clockInTime),
                          "EEEE, dd MMM yyyy"
                        )}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            {format(
                              new Date(attendance.clockInTime),
                              "hh:mm a"
                            )}
                          </span>
                        </div>
                        {attendance.clockOutTime && (
                          <div className="flex items-center gap-2">
                            <X className="h-4 w-4 text-red-500" />
                            <span className="text-sm">
                              {format(
                                new Date(attendance.clockOutTime),
                                "hh:mm a"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {attendance.clockOutTime ? (
                        <p className="font-medium">
                          {formatDuration(
                            intervalToDuration({
                              start: new Date(attendance.clockInTime),
                              end: new Date(attendance.clockOutTime),
                            }),
                            { format: ["hours", "minutes"] }
                          )}
                        </p>
                      ) : (
                        <Badge>In Progress</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <ClockIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-center text-muted-foreground">
                  No attendance records found for this period.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
