"use client"

import { useEffect, useState } from "react"
import { getBrowserClient } from "@/lib/supabase"
import { MessageSquare } from "lucide-react"

export function DiscussionCount() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count, error } = await supabase.from("cave_comments").select("*", { count: "exact", head: true })

        if (error) {
          console.error("Error fetching comment count:", error)
          return
        }

        setCount(count)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
  }, [supabase])

  if (isLoading || count === null) {
    return null
  }

  if (count === 0) {
    return null
  }

  return (
    <div className="inline-flex items-center">
      <MessageSquare className="h-4 w-4 mr-1" />
      <span className="text-xs font-medium">{count}</span>
    </div>
  )
}
