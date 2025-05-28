"use client"

import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { getBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  user_id: string
  cave_id: string
  content: string
  created_at: string
  user_name: string
  user_avatar: string
  user_email?: string
}

export default function CaveDiscussion({ caveId, caveName }: { caveId: string | number; caveName: string }) {
  // Convert caveId to string if it's a number
  const caveIdString = caveId.toString()
  const { user } = useAuth()
  const { t } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = getBrowserClient()

  // Fetch comments for this cave
  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true)
      setError(null)

      try {
        // First, fetch the comments
        const { data: commentsData, error: commentsError } = await supabase
          .from("cave_comments")
          .select("*")
          .eq("cave_id", caveIdString)
          .order("created_at", { ascending: false })

        if (commentsError) throw commentsError

        // Initialize comments with placeholder user data
        let formattedComments = commentsData.map((comment) => ({
          id: comment.id,
          user_id: comment.user_id,
          cave_id: comment.cave_id,
          content: comment.content,
          created_at: comment.created_at,
          user_name: "User",
          user_avatar: "",
        }))

        // If we have comments, try to fetch user data
        if (commentsData && commentsData.length > 0) {
          try {
            // Get user data from auth.users if possible
            const { data: userData } = await supabase.auth.admin.listUsers()

            // If we have user data, update the comments
            if (userData && userData.users) {
              // Create a map for quick lookup
              const userMap = new Map()
              userData.users.forEach((user) => {
                userMap.set(user.id, {
                  name: user.user_metadata?.full_name || user.email || "User",
                  avatar: user.user_metadata?.avatar_url || "",
                  email: user.email,
                })
              })

              // Update comments with user data
              formattedComments = commentsData.map((comment) => {
                const user = userMap.get(comment.user_id)
                return {
                  id: comment.id,
                  user_id: comment.user_id,
                  cave_id: comment.cave_id,
                  content: comment.content,
                  created_at: comment.created_at,
                  user_name: user?.name || "User",
                  user_avatar: user?.avatar || "",
                  user_email: user?.email,
                }
              })
            }
          } catch (userError) {
            console.log("Could not fetch user data:", userError)
            // Continue with placeholder user data
          }
        }

        setComments(formattedComments)
      } catch (err) {
        console.error("Error fetching comments:", err)
        setError(t("discussion.error.load"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()

    // Set up real-time subscription for new comments
    const subscription = supabase
      .channel("cave_comments_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "cave_comments",
          filter: `cave_id=eq.${caveIdString}`,
        },
        (payload) => {
          // Add the new comment with current user data if it's the current user
          const isCurrentUser = user && payload.new.user_id === user.id

          const newComment: Comment = {
            id: payload.new.id,
            user_id: payload.new.user_id,
            cave_id: payload.new.cave_id,
            content: payload.new.content,
            created_at: payload.new.created_at,
            user_name: isCurrentUser ? user.user_metadata?.full_name || user.email || "User" : "User",
            user_avatar: isCurrentUser ? user.user_metadata?.avatar_url || "" : "",
            user_email: isCurrentUser ? user.email : undefined,
          }

          setComments((prev) => [newComment, ...prev])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [caveIdString, supabase, user, t])

  // Submit a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!newComment.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from("cave_comments").insert({
        cave_id: caveIdString,
        user_id: user.id,
        content: newComment.trim(),
      })

      if (error) throw error

      setNewComment("")
    } catch (err) {
      console.error("Error submitting comment:", err)
      setError(t("discussion.error.submit"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for display
  const formatCommentDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return t("discussion.time.ago")
    }
  }

  // Generate avatar fallback text
  const getAvatarFallback = (comment: Comment) => {
    if (comment.user_name && comment.user_name !== "User") {
      return comment.user_name.substring(0, 2).toUpperCase()
    }
    if (comment.user_email) {
      return comment.user_email.substring(0, 2).toUpperCase()
    }
    return "U"
  }

  return (
    <div className="bg-surface-2 rounded-xl shadow-md overflow-hidden">
      <div className="bg-accent p-6 flex items-center">
        <MessageSquare className="h-6 w-6 text-accent-foreground mr-3" />
        <h2 className="text-2xl font-semibold text-accent-foreground">
          {t("discussion.section")}: {caveName}
        </h2>
      </div>

      <div className="p-6">
        {/* Comment form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <Textarea
              placeholder={t("discussion.placeholder")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] mb-3"
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {t("discussion.posting")}{" "}
                <span className="font-medium">{user.user_metadata?.full_name || user.email || "Anonymous User"}</span>
              </p>
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
              >
                {isSubmitting ? t("discussion.posting.action") : t("discussion.post")}
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {error && (
              <div className="mt-3 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
          </form>
        ) : (
          <div className="bg-surface-3 p-4 rounded-lg mb-8 text-center">
            <p className="mb-3">{t("discussion.signin")}</p>
            <Button asChild>
              <Link href="/api/auth/signin">{t("discussion.signin.action")}</Link>
            </Button>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b pb-2">
            {isLoading ? t("discussion.loading") : `${comments.length} ${t("discussion.count")}`}
          </h3>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>{t("discussion.no.comments")}</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={comment.user_avatar || "/placeholder.svg"} alt={comment.user_name} />
                    <AvatarFallback>{getAvatarFallback(comment)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{comment.user_name}</h4>
                      <span className="text-xs text-muted-foreground">{formatCommentDate(comment.created_at)}</span>
                    </div>
                    <p className="text-foreground/90 whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
