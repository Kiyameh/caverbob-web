'use client'

import Link from 'next/link'
import type React from 'react'
import {useState, useEffect} from 'react'
import {useAuth} from '@/contexts/auth-context'
import {useLanguage} from '@/contexts/language-context'
import {getBrowserClient} from '@/lib/supabase'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {MessageSquare, Send, AlertCircle} from 'lucide-react'
import {formatDistanceToNow} from 'date-fns'

interface Comment {
  id: string
  user_id: string
  cave_id: string
  content: string
  created_at: string
  user_name?: string
  user_avatar?: string
}

interface UserData {
  id: string
  name: string
  avatar: string
}

// Get initials for avatar fallback
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export default function CaveDiscussion({
  caveId,
  caveName,
}: {
  caveId: string | number
  caveName: string
}) {
  const caveIdString = caveId.toString()
  const {user} = useAuth()
  const {t} = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
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
        const {data: commentsData, error: commentsError} = await supabase
          .from('cave_comments')
          .select('*')
          .eq('cave_id', caveIdString)
          .order('created_at', {ascending: false})

        if (commentsError) throw commentsError

        let formattedComments = commentsData.map((comment) => ({
          id: comment.id,
          user_id: comment.user_id,
          cave_id: comment.cave_id,
          content: comment.content,
          created_at: comment.created_at,
          user_name: comment.user_name || 'User',
          user_avatar: comment.user_avatar || '',
        }))

        if (commentsData && commentsData.length > 0) {
          try {
            // Get unique user IDs
            const userIds = [
              ...new Set(commentsData.map((comment) => comment.user_id)),
            ]

            // Fetch user data from our API
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({userIds}),
            })

            if (!response.ok) {
              throw new Error('Failed to fetch user data')
            }

            const userData = (await response.json()) as UserData[]
            const userMap = new Map(userData.map((user) => [user.id, user]))

            // Update comments with user data
            formattedComments = commentsData.map((comment) => {
              const user = userMap.get(comment.user_id)
              return {
                id: comment.id,
                user_id: comment.user_id,
                cave_id: comment.cave_id,
                content: comment.content,
                created_at: comment.created_at,
                user_name: user?.name || 'User',
                user_avatar: user?.avatar || '',
              }
            })
          } catch (userError) {
            console.log('Could not fetch user data:', userError)
          }
        }

        setComments(formattedComments)
      } catch (err) {
        console.error('Error fetching comments:', err)
        setError(t('discussion.error.load'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()

    const subscription = supabase
      .channel('cave_comments_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'cave_comments',
          filter: `cave_id=eq.${caveIdString}`,
        },
        (payload) => {
          const isCurrentUser = user && payload.new.user_id === user.id

          const newComment: Comment = {
            id: payload.new.id,
            user_id: payload.new.user_id,
            cave_id: payload.new.cave_id,
            content: payload.new.content,
            created_at: payload.new.created_at,
            user_name: isCurrentUser
              ? user.user_metadata?.full_name || 'User'
              : 'User',
            user_avatar: isCurrentUser
              ? user.user_metadata?.avatar_url || ''
              : '',
          }

          setComments((prev) => [newComment, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [caveIdString, supabase, user, t])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!newComment.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const {error} = await supabase.from('cave_comments').insert({
        cave_id: caveIdString,
        user_id: user.id,
        content: newComment.trim(),
      })

      if (error) throw error

      setNewComment('')
    } catch (err) {
      console.error('Error submitting comment:', err)
      setError(t('discussion.error.submit'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {addSuffix: true})
    } catch (e) {
      return t('discussion.time.ago')
    }
  }

  return (
    <div className="bg-surface-2 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-primary/10 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">
          {t('discussion.section')}: {caveName}
        </h2>
        <span className="text-sm text-muted-foreground">
          {comments.length}{' '}
          {comments.length === 1
            ? t('discussion.comment')
            : t('discussion.comments')}
        </span>
      </div>

      <div className="p-4">
        {user ? (
          <form
            onSubmit={handleSubmitComment}
            className="mb-6"
          >
            <Textarea
              placeholder={t('discussion.placeholder')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] mb-3"
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {t('discussion.posting')}{' '}
                <span className="font-medium">
                  {user.user_metadata?.full_name || 'Anonymous User'}
                </span>
              </p>
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
              >
                {isSubmitting
                  ? t('discussion.posting.action')
                  : t('discussion.post')}
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
          <div className="bg-surface-3 p-4 rounded-lg mb-6 text-center">
            <p className="mb-3">{t('discussion.signin')}</p>
            <Button asChild>
              <Link href="/api/auth/signin">
                {t('discussion.signin.action')}
              </Link>
            </Button>
          </div>
        )}

        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="space-y-4 py-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
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
              <p>{t('discussion.no.comments')}</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4"
              >
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage
                      src={comment.user_avatar || '/placeholder.svg'}
                      alt={comment.user_name}
                    />
                    <AvatarFallback>
                      {comment.user_name ? getInitials(comment.user_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm">{comment.user_name}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 whitespace-pre-line">
                      {comment.content}
                    </p>
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
