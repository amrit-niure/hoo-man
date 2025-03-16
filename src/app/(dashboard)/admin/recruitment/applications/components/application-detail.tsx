"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Mail, Phone, MapPin, Calendar, Paperclip, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

export function ApplicationDetail() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/avatars/01.png" alt="Sarah Johnson" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">Sarah Johnson</h3>
            <p className="text-muted-foreground">Senior Frontend Developer</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                New
              </Badge>
              <p className="text-sm text-muted-foreground">Applied on June 15, 2023</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <ThumbsDown className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Shortlist
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="resume" className="flex-1">Resume</TabsTrigger>
          <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <h4 className="mb-2 font-medium">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">sarah.johnson@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="mb-2 font-medium">Application Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Applied on June 15, 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Resume, Cover Letter</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Experience</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Senior Frontend Developer</h5>
                    <Badge variant="outline">Current</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">TechCorp Inc. • 2020 - Present</p>
                  <p className="mt-1 text-sm">
                    Led the frontend development team in building responsive web applications using React, TypeScript, and Next.js.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium">Frontend Developer</h5>
                  <p className="text-sm text-muted-foreground">WebSolutions LLC • 2017 - 2020</p>
                  <p className="mt-1 text-sm">
                    Developed and maintained client websites and web applications using JavaScript, HTML, and CSS.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium">Junior Web Developer</h5>
                  <p className="text-sm text-muted-foreground">Digital Creations • 2015 - 2017</p>
                  <p className="mt-1 text-sm">
                    Assisted in the development of websites and implemented designs using HTML, CSS, and jQuery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Education</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium">Master of Computer Science</h5>
                  <p className="text-sm text-muted-foreground">Stanford University • 2013 - 2015</p>
                </div>
                <div>
                  <h5 className="font-medium">Bachelor of Science in Computer Science</h5>
                  <p className="text-sm text-muted-foreground">University of California, Berkeley • 2009 - 2013</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Skills</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">HTML</Badge>
                <Badge variant="secondary">CSS</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">GraphQL</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">Agile</Badge>
                <Badge variant="secondary">UI/UX</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resume" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Attached Documents</h4>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Sarah_Johnson_Resume.pdf</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Sarah_Johnson_Cover_Letter.pdf</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Portfolio_Links.pdf</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Interview Notes</h4>
              <p className="text-sm text-muted-foreground">No interview notes yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
