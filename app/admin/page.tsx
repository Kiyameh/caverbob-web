"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBrowserClient } from "@/lib/supabase"

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    caves: 0,
    chambers: 0,
    pits: 0,
  })
  const [isAdmin, setIsAdmin] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  // Check if user is admin (this is a simplified check - in a real app, you'd check roles in the database)
  useEffect(() => {
    if (user) {
      // For demo purposes, we'll consider all authenticated users as admins
      // In a real app, you'd check against a list of admin emails or roles
      setIsAdmin(true)
    }
  }, [user])

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return

      const supabase = getBrowserClient()

      // Get counts from each table
      const [cavesResult, chambersResult, pitsResult] = await Promise.all([
        supabase.from("caves").select("id", { count: "exact" }),
        supabase.from("chambers").select("id", { count: "exact" }),
        supabase.from("pits").select("id", { count: "exact" }),
      ])

      setStats({
        caves: cavesResult.count || 0,
        chambers: chambersResult.count || 0,
        pits: pitsResult.count || 0,
      })
    }

    fetchStats()
  }, [user])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You do not have permission to access this page.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please log in with an administrator account to access the admin dashboard.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/")}>Return to Home</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Caves</CardTitle>
              <CardDescription>Total caves in database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.caves}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Chambers</CardTitle>
              <CardDescription>Total chambers in database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.chambers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Pits</CardTitle>
              <CardDescription>Total pits in database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.pits}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="caves" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="caves">Caves</TabsTrigger>
            <TabsTrigger value="chambers">Chambers</TabsTrigger>
            <TabsTrigger value="pits">Pits</TabsTrigger>
          </TabsList>

          <TabsContent value="caves">
            <Card>
              <CardHeader>
                <CardTitle>Cave Management</CardTitle>
                <CardDescription>Add, edit, or remove caves from the database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This section would contain forms and tables for managing cave data. For now, it's a placeholder.
                </p>
              </CardContent>
              <CardFooter>
                <Button disabled>Add New Cave</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chambers">
            <Card>
              <CardHeader>
                <CardTitle>Chamber Management</CardTitle>
                <CardDescription>Add, edit, or remove chambers from the database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This section would contain forms and tables for managing chamber data. For now, it's a placeholder.
                </p>
              </CardContent>
              <CardFooter>
                <Button disabled>Add New Chamber</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pits">
            <Card>
              <CardHeader>
                <CardTitle>Pit Management</CardTitle>
                <CardDescription>Add, edit, or remove pits from the database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This section would contain forms and tables for managing pit data. For now, it's a placeholder.
                </p>
              </CardContent>
              <CardFooter>
                <Button disabled>Add New Pit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
