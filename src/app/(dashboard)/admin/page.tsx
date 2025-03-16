import React from 'react'
import { getSessionData } from '@/lib/get-session-data';
 
export default async function AdminDashboard() {
  const session = await getSessionData();

  return (
    <div>
      Admin Dashbaord
    </div>
  )
}
