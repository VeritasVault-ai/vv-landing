import { UnifiedHeader } from "@/components/unified-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UnifiedHeader 
        variant="dashboard" 
        notificationCount={3}
        showSearch={true}
        showNotifications={true}
        showUserMenu={true}
      />
      <main>
        {children}
      </main>
    </div>
  )
}