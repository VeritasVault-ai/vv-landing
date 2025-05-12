"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Lock, Bell, Shield, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface Profile {
  id: string
  user_id: string
  full_name: string
  email: string
  avatar_url: string | null
  bio: string | null
  role: string
  created_at: string
  last_login: string | null
  notification_preferences: {
    email_notifications: boolean
    strategy_alerts: boolean
    performance_updates: boolean
    security_alerts: boolean
  } | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [notificationPrefs, setNotificationPrefs] = useState({
    email_notifications: true,
    strategy_alerts: true,
    performance_updates: true,
    security_alerts: true,
  })
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const supabase = createBrowserClient()

        // Check if user is authenticated
        const { data: authData, error: authError } = await supabase.auth.getSession()

        if (authError) throw authError

        if (!authData.session) {
          router.push("/auth/login")
          return
        }

        // Fetch user profile
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", authData.session.user.id)
          .single()

        if (error) throw error

        setProfile(data)
        setFullName(data.full_name || "")
        setEmail(data.email || "")
        setBio(data.bio || "")

        if (data.notification_preferences) {
          setNotificationPrefs(data.notification_preferences)
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setUpdating(true)

    try {
      const supabase = createBrowserClient()

      // Update profile in database
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          bio: bio,
        })
        .eq("user_id", profile?.user_id)

      if (error) throw error

      // Update user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      })

      if (authError) throw authError

      // Update avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const filePath = `avatars/${profile?.user_id}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true })

        if (uploadError) throw uploadError

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

        // Update profile with avatar URL
        const { error: avatarError } = await supabase
          .from("user_profiles")
          .update({
            avatar_url: publicUrlData.publicUrl,
          })
          .eq("user_id", profile?.user_id)

        if (avatarError) throw avatarError

        // Update local state
        setProfile((prev) => (prev ? { ...prev, avatar_url: publicUrlData.publicUrl } : null))
      }

      setSuccess("Profile updated successfully")
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setUpdating(true)

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (!currentPassword) {
        throw new Error("Current password is required")
      }

      const supabase = createBrowserClient()

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profile?.email || "",
        password: currentPassword,
      })

      if (signInError) {
        throw new Error("Current password is incorrect")
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      setSuccess("Password updated successfully")
      setPassword("")
      setConfirmPassword("")
      setCurrentPassword("")
    } catch (err: any) {
      console.error("Error updating password:", err)
      setError(err.message || "Failed to update password")
    } finally {
      setUpdating(false)
    }
  }

  const handleUpdateNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setUpdating(true)

    try {
      const supabase = createBrowserClient()

      // Update notification preferences
      const { error } = await supabase
        .from("user_profiles")
        .update({
          notification_preferences: notificationPrefs,
        })
        .eq("user_id", profile?.user_id)

      if (error) throw error

      setSuccess("Notification preferences updated successfully")
    } catch (err: any) {
      console.error("Error updating notification preferences:", err)
      setError(err.message || "Failed to update notification preferences")
    } finally {
      setUpdating(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-1/3 mb-6" />
          <Skeleton className="h-64 w-full mb-6" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile picture</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={avatarPreview || profile?.avatar_url || undefined}
                          alt={profile?.full_name || "User"}
                        />
                        <AvatarFallback className="text-xl">
                          {profile?.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <Label htmlFor="avatar" className="sr-only">
                          Profile Picture
                        </Label>
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="w-full text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Full Name
                        </Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800"
                        />
                        <p className="text-sm text-muted-foreground">
                          Email cannot be changed. Contact support if you need to update your email.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a bit about yourself"
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" disabled={updating}>
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Security Settings
                </CardTitle>
                <CardDescription>Update your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={updating}>
                    {updating ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notification Preferences
                </CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateNotifications} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email_notifications"
                        checked={notificationPrefs.email_notifications}
                        onCheckedChange={(checked) =>
                          setNotificationPrefs((prev) => ({ ...prev, email_notifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="strategy_alerts">Strategy Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about strategy performance and opportunities
                        </p>
                      </div>
                      <Switch
                        id="strategy_alerts"
                        checked={notificationPrefs.strategy_alerts}
                        onCheckedChange={(checked) =>
                          setNotificationPrefs((prev) => ({ ...prev, strategy_alerts: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="performance_updates">Performance Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
                      </div>
                      <Switch
                        id="performance_updates"
                        checked={notificationPrefs.performance_updates}
                        onCheckedChange={(checked) =>
                          setNotificationPrefs((prev) => ({ ...prev, performance_updates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security_alerts">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about important security events</p>
                      </div>
                      <Switch
                        id="security_alerts"
                        checked={notificationPrefs.security_alerts}
                        onCheckedChange={(checked) =>
                          setNotificationPrefs((prev) => ({ ...prev, security_alerts: checked }))
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={updating}>
                    {updating ? "Saving..." : "Save Preferences"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Account Information
                </CardTitle>
                <CardDescription>View details about your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Account Created
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDate(profile?.created_at)}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Last Login
                      </p>
                      <p className="text-sm text-muted-foreground">{formatDate(profile?.last_login)}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Account Type</p>
                      <p className="text-sm text-muted-foreground capitalize">{profile?.role || "User"}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">User ID</p>
                      <p className="text-sm text-muted-foreground font-mono">{profile?.user_id}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      This action is permanent and cannot be undone. All your data will be deleted.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
