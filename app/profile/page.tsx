"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.user_metadata?.avatar_url && (
              <div className="flex justify-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <img
                    src={user.user_metadata.avatar_url || "/placeholder.svg"}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p>{user.user_metadata?.full_name || "Not provided"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p>{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Account ID</h3>
              <p className="text-sm text-gray-500 truncate">{user.id}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={signOut} className="w-full flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
