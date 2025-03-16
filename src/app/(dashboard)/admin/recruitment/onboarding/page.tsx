import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter, Plus } from 'lucide-react'
import { OnboardingList } from "./components/onboarding-list"
import { OnboardingProcess } from "./components/onboarding-process"

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Onboarding</h1>
        <p className="text-muted-foreground">
          Manage employee onboarding processes
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Onboarding
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>New Hires</CardTitle>
            <CardDescription>
              Employees in the onboarding process
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="active" className="flex-1">Active (8)</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">Completed (12)</TabsTrigger>
              </TabsList>
              <OnboardingList />
            </Tabs>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Onboarding Process</CardTitle>
            <CardDescription>
              Track onboarding progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingProcess />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
