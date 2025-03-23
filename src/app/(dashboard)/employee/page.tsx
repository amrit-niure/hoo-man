











// app/attendance/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { clockIn, clockOut, getAttendanceHistory } from "./actions";
import { toast } from "sonner";

export default function AttendancePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clock In/Out</h1>
      <p className="text-muted-foreground">
        {format(new Date(), "EEEE, MMMM dd, yyyy")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClockInOutCard />
        <CalendarCard />
        <AttendanceHistory />
      </div>
    </div>
  );
}

export function ClockInOutCard() {
  const [loading, setLoading] = useState(false);
  const [recentAttendances, setRecentAttendances] = useState<any[]>([]);

  const handleClockIn = async () => {
    try {
      setLoading(true);
      const result = await clockIn();
      
     if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      if (result.success) {
        fetchRecentAttendances();
      }
    } catch (error) {
      toast("Error clocking in");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      const result = await clockOut();
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      if (result.success) {
        fetchRecentAttendances();
      }

      if (result.success) {
        fetchRecentAttendances();
      }
    } catch (error) {
      toast("Error clocking out");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentAttendances = async () => {
    try {
      const result = await getAttendanceHistory("day");
      if (result.success && Array.isArray(result.data)) {
        setRecentAttendances(result.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch recent attendances:", error);
    }
  };

  useEffect(() => {
    fetchRecentAttendances();
  }, []);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Clock In/Out
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl font-bold">
            {format(new Date(), "HH:mm")}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, dd MMM yyyy")}
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full" 
            variant="default"
            onClick={handleClockIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Clock In
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleClockOut}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Clock Out
          </Button>
        </div>

        <div className="pt-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentAttendances.map((attendance) => (
              <div
                key={attendance.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {attendance.clockOutTime === attendance.clockInTime
                      ? "Clock In"
                      : "Clock Out"}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {format(new Date(attendance.clockInTime), "dd MMM, hh:mm a")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// app/attendance/components/calendar-card.tsx
export function CalendarCard() {
  const [date, setDate] = useState<Date>(new Date());

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
        />
      </CardContent>
    </Card>
  );
}

// app/attendance/components/attendance-history.tsx
export function AttendanceHistory() {
  const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
  const [attendances, setAttendances] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceHistory = async (period: "day" | "week" | "month") => {
    try {
      setLoading(true);
      const result = await getAttendanceHistory(period);
      if (result.success) {
        setAttendances(Array.isArray(result.data) ? result.data : []);
      } else {
        toast.error(result.message || "Error fetching attendance history");
      }
    } catch (error) {
      console.error("Failed to fetch attendance history:", error);
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
        <CardTitle>Attendance History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="day" 
          onValueChange={(value) => 
            setActiveTab(value as "day" | "week" | "month")
          }
        >
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="py-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : attendances.length > 0 ? (
              <div className="space-y-4">
                {attendances.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {format(new Date(attendance.clockInTime), "dd MMM yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Clock In: {format(
                          new Date(attendance.clockInTime),
                          "hh:mm a"
                        )}
                      </p>
                      {attendance.clockOutTime !== attendance.clockInTime && (
                        <p className="text-sm text-muted-foreground">
                          Clock Out: {format(
                            new Date(attendance.clockOutTime),
                            "hh:mm a"
                          )}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {attendance.totalHours.toFixed(2)} hours
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No attendance record found for this period.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
