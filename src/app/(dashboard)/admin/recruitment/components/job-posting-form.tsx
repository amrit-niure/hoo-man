"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function JobPostingForm() {
  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" placeholder="e.g. Senior Frontend Developer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Remote, New York, NY" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Employment Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          placeholder="Enter job description"
          className="min-h-32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          placeholder="Enter job requirements"
          className="min-h-32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits">Benefits</Label>
        <Textarea
          id="benefits"
          placeholder="Enter job benefits"
          className="min-h-32"
        />
      </div>

      <div className="space-y-2">
        <Label>Options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="remote" />
            <Label htmlFor="remote" className="font-normal">Allow remote applications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" />
            <Label htmlFor="featured" className="font-normal">Feature this job posting</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="internal" />
            <Label htmlFor="internal" className="font-normal">Internal posting only</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button>Publish Job Posting</Button>
      </div>
    </form>
  )
}
