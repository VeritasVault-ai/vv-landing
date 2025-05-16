"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Edit, MoreVertical, Search, Trash2, UserPlus, XCircle } from "lucide-react"
import { useState } from "react"
import styles from "./user-management-panel.module.css"

type UserRole = "admin" | "manager" | "analyst" | "viewer"

type UserStatus = "active" | "pending" | "suspended"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "admin",
    status: "active",
    lastActive: "Just now"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "manager",
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    role: "analyst",
    status: "active",
    lastActive: "1 day ago"
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    role: "viewer",
    status: "pending",
    lastActive: "Never"
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "analyst",
    status: "suspended",
    lastActive: "5 days ago"
  },
  {
    id: "6",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    role: "manager",
    status: "active",
    lastActive: "3 hours ago"
  },
  {
    id: "7",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    role: "viewer",
    status: "active",
    lastActive: "Yesterday"
  }
]

export const UserManagementPanel = () => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "admin": return "destructive"
      case "manager": return "default"
      case "analyst": return "secondary"
      case "viewer": return "outline"
      default: return "outline"
    }
  }

  const getStatusIcon = (status: UserStatus) => {
    switch (status) {
      case "active": return <CheckCircle className={`${styles.statusIcon} text-green-500`} />
      case "pending": return <Clock className={`${styles.statusIcon} text-amber-500`} />
      case "suspended": return <XCircle className={`${styles.statusIcon} text-red-500`} />
      default: return null
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <Input 
            type="text" 
            placeholder="Search users..." 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className={styles.addButton}>
          <UserPlus className={styles.buttonIcon} />
          <span>Add User</span>
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className={styles.actionsColumn}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className={styles.nameCell}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(user.status)}
                      <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={styles.actionButton}>
                          <MoreVertical className={styles.actionIcon} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className={styles.dangerAction}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}