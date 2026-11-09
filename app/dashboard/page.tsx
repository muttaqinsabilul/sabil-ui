import type { Metadata } from "next"

import { SocialDashboard } from "./social-dashboard"

export const metadata: Metadata = {
  title: "Social dashboard",
  description: "Manage multiple social media accounts in one place.",
}

export default function DashboardPage() {
  return <SocialDashboard />
}
