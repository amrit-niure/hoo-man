import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter, Plus } from 'lucide-react'
import { JobPostingList } from "../components/job-posting-list"
import { JobPostingForm } from "../components/job-posting-form"

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
        <p className="text-muted-foreground">
          Manage your company&#39;s job postings
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
            Create Job Posting
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active (12)</TabsTrigger>
          <TabsTrigger value="draft">Draft (3)</TabsTrigger>
          <TabsTrigger value="closed">Closed (8)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <JobPostingList status="active" />
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <JobPostingList status="draft" />
        </TabsContent>
        <TabsContent value="closed" className="space-y-4">
          <JobPostingList status="closed" />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Create Job Posting</CardTitle>
          <CardDescription>
            Create a new job posting for your company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobPostingForm />
        </CardContent>
      </Card>
    </div>
  )
}
