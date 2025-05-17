import { DashboardHeader } from "@/components/corporate/dashboard/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader notificationCount={3} />
      <main>
        {children}
      </main>
    </div>
  )
}