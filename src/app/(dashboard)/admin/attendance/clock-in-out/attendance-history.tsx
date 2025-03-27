"use client"

import { useEffect, useState } from "react";
import { getAttendanceHistory } from "../actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Attendance } from "@prisma/client";

export function AttendanceHistory() {
    const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
  
    const fetchAttendanceHistory = async (period: "day" | "week" | "month") => {
      try {
        setLoading(true);
        const result = await getAttendanceHistory(period);
        if (result.success && Array.isArray(result.data)) {
          setAttendances(result.data);
        } else {
          toast("Error fetching attendance history"); 
        }
      } catch (error) {
        console.error("Failed to fetch attendance history:", error);
        toast("Error fetching attendance history");
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
                        {attendance.clockOutTime && attendance.clockOutTime !== attendance.clockInTime && (
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