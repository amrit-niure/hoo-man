"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Circle, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function OnboardingProcess() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/avatars/01.png" alt="Alex Martinez" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">Alex Martinez</h3>
            <p className="text-muted-foreground">Frontend Developer</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                In Progress
              </Badge>
              <p className="text-sm text-muted-foreground">Started on June 15, 2023</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Progress value={75} className="h-2 w-40" />
            <span className="text-sm font-medium">75% Complete</span>
          </div>
          <Button size="sm">
            Send Reminder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
          <TabsTrigger value="equipment" className="flex-1">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h4 className="font-medium">Onboarding Tasks</h4>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex items-center gap-2 p-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Complete new hire paperwork</p>
                      <p className="text-sm text-muted-foreground">Completed on June 16, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Set up company email and accounts</p>
                      <p className="text-sm text-muted-foreground">Completed on June 17, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Complete IT security training</p>
                      <p className="text-sm text-muted-foreground">Completed on June 18, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium">Meet with team members</p>
                      <p className="text-sm text-muted-foreground">Due by June 22, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <Circle className="h-5 w-5 text-gray-300" />
                    <div className="flex-1">
                      <p className="font-medium">Complete company policies training</p>
                      <p className="text-sm text-muted-foreground">Due by June 25, 2023</p>
                    </div>
                    <Badge variant="outline">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <Circle className="h-5 w-5 text-gray-300" />
                    <div className="flex-1">
                      <p className="font-medium">Set up development environment</p>
                      <p className="text-sm text-muted-foreground">Due by June 25, 2023</p>
                    </div>
                    <Badge variant="outline">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium">Complete benefits enrollment</p>
                      <p className="text-sm text-muted-foreground">Overdue - Due by June 20, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Overdue
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </TabsContent>
        </Tabs>
</div>
  )
}
