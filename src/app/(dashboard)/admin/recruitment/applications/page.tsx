import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react'
import { ApplicationList } from "./components/application-list"
import { ApplicationDetail } from "./components/application-detail"

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Manage job applications
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>
              Recent job applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All (87)</TabsTrigger>
                <TabsTrigger value="new" className="flex-1">New (24)</TabsTrigger>
                <TabsTrigger value="shortlisted" className="flex-1">Shortlisted (18)</TabsTrigger>
              </TabsList>
              <ApplicationList />
            </Tabs>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>
              Review candidate information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationDetail />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
