import React from 'react'
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
 
export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers() 
})

if (!session) {
    redirect("/admin/signin")
}
  return (
    <div>
      Admin Dashbaord
    </div>
  )
}
