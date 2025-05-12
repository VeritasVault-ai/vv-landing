"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [strategies, setStrategies] = useState<any[]>([])
  const [systemMetrics, setSystemMetrics] = useState<any>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true)
        const supabase = createBrowserClient()

        // Check if user is authenticated and has admin role
        const { data: authData, error: authError } = await supabase.auth.getSession()

        if (authError) throw authError

        if (!authData.session) {
          throw new Error("Not authenticated")
        }

        // Fetch user profile to check role
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("user_id", authData.session.user.id)
          .single()

        if (profileError) throw profileError

        if (profileData.role !== "admin") {
          throw new Error("Not authorized")
        }

        // Fetch users
        const { data: userData, error: userError } = await supabase
          .from("user_profiles")
          .select("*")
          .order("created_at", { ascending: false })

        if (userError) throw userError
        setUsers(userData || [])

        // Fetch strategies
        const { data: strategyData, error: strategyError } = await supabase
          .from("strategies")
          .select("*, user_profiles(full_name)")
          .order("created_at", { ascending: false })

        if (strategyError) throw strategyError
        setStrategies(strategyData || [])

        // Generate mock system metrics (in a real app, these would come from a monitoring service)
        setSystemMetrics({
          userCount: userData?.length || 0,
          strategyCount: strategyData?.length || 0,
          apiCalls: {
            total: 1245,
            success: 1198,
            failed: 47,
            avgResponseTime: 320, // ms
          },
          serverLoad: {
            cpu: 42, // percent
            memory: 68, // percent
            disk: 34, // percent
          },
          dailyActiveUsers: [
            { date: "Mon", users: 120 },
            { date: "Tue", users: 132 },
            { date: "Wed", users: 145 },
            { date: "Thu", users: 140 },
            { date: "Fri", users: 158 },
            { date: "Sat", users: 142 },
            { date: "Sun", users: 130 },
          ],
          strategyCreation: [
            { date: "Mon", count: 12 },
            { date: "Tue", count: 15 },
            { date: "Wed", count: 18 },
            { date: "Thu", count: 14 },
            { date: "Fri", count: 21 },
            { date: "Sat", count: 16 },
            { date: "Sun", count: 13 },
          ],
          resourceUsage: [
            { name: "API Calls", value: 45 },
            { name: "Database", value: 30 },
            { name: "Storage", value: 15 },
            { name: "Compute", value: 10 },
          ],
        })
      } catch (err: any) {
        console.error("Error fetching admin data:", err)
        setError(err.message || "Failed to load admin data")
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-[400px] mt-6" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-300">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <Button className="mt-4" variant="outline" onClick={() => (window.location.href = "/dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <CardDescription>Active user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{systemMetrics.userCount}</div>
            <p className="text-xs text-muted-foreground mt-1">+{Math.floor(Math.random() * 10)}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Strategies</CardTitle>
            <CardDescription>Created by all users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{systemMetrics.strategyCount}</div>
            <p className="text-xs text-muted-foreground mt-1">+{Math.floor(Math.random() * 15)}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">API Health</CardTitle>
            <CardDescription>Success rate and response time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">
                {((systemMetrics.apiCalls.success / systemMetrics.apiCalls.total) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">{systemMetrics.apiCalls.avgResponseTime}ms</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{systemMetrics.apiCalls.total} total calls</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Server Load</CardTitle>
            <CardDescription>Current resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">CPU</span>
                  <span className="text-sm font-medium">{systemMetrics.serverLoad.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${systemMetrics.serverLoad.cpu}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Memory</span>
                  <span className="text-sm font-medium">{systemMetrics.serverLoad.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${systemMetrics.serverLoad.memory}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Disk</span>
                  <span className="text-sm font-medium">{systemMetrics.serverLoad.disk}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${systemMetrics.serverLoad.disk}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Distribution</CardTitle>
            <CardDescription>System resource allocation</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemMetrics.resourceUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {systemMetrics.resourceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role || "user"}</Badge>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Monitoring</CardTitle>
              <CardDescription>Monitor user strategies and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategies.map((strategy) => (
                    <TableRow key={strategy.id}>
                      <TableCell className="font-medium">{strategy.name}</TableCell>
                      <TableCell>{strategy.user_profiles?.full_name}</TableCell>
                      <TableCell>{strategy.type}</TableCell>
                      <TableCell>{new Date(strategy.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            strategy.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }
                        >
                          {strategy.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
              <CardDescription>Usage trends and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px]">
                  <h3 className="text-lg font-medium mb-2">Daily Active Users</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemMetrics.dailyActiveUsers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[300px]">
                  <h3 className="text-lg font-medium mb-2">Strategy Creation</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={systemMetrics.strategyCreation}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
