import Link from "next/link"
import { Building2 } from 'lucide-react'

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Building2 className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          HR Manager
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/dashboard"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/payroll"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Payroll
        </Link>
        <Link
          href="/attendance"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Attendance
        </Link>
        <Link
          href="/recruitment"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Recruitment
        </Link>
      </nav>
    </div>
  )
}
