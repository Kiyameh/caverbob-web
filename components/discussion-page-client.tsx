'use client'

import Link from 'next/link'
import {formatDistanceToNow} from 'date-fns'
import {MessageSquare, ArrowRight} from 'lucide-react'
import {useLanguage} from '@/contexts/language-context'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {ReportDialog} from './report-dialog'

interface Comment {
  id: string
  user_id: string
  cave_id: string
  content: string
  created_at: string
  user_name?: string
  user_avatar?: string
  cave_name?: string
}

// Group comments by cave
function groupCommentsByCave(comments: Comment[]) {
  const groupedComments = new Map<string, Comment[]>()

  comments.forEach((comment) => {
    const caveId = comment.cave_id
    if (!groupedComments.has(caveId)) {
      groupedComments.set(caveId, [])
    }
    groupedComments.get(caveId)!.push(comment)
  })

  return Array.from(groupedComments.entries()).map(([caveId, comments]) => ({
    caveId,
    caveName: comments[0].cave_name || `Cave #${caveId}`,
    comments: comments.slice(0, 3), // Take only the 3 most recent comments per cave
    commentCount: comments.length,
    latestComment: comments[0],
  }))
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

export function DiscussionPageClient({
  latestComments,
}: {
  latestComments: Comment[]
}) {
  const {t} = useLanguage()
  const discussionGroups = groupCommentsByCave(latestComments)

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {addSuffix: true})
    } catch (e) {
      return t('discussion.time.ago')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discusiones</h1>
        <ReportDialog />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold">{t('discussion.title')}</h1>
        </div>

        <p className="text-lg text-foreground/80 mb-8">
          {t('discussion.description')}
        </p>

        {discussionGroups.length === 0 ? (
          <div className="bg-surface-2 rounded-xl p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h2 className="text-xl font-medium mb-2">
              {t('discussion.empty')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('discussion.empty.description')}
            </p>
            <Button asChild>
              <Link href="/">{t('discussion.browse')}</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {discussionGroups.map((group) => (
              <div
                key={group.caveId}
                className="bg-surface-2 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-primary/10 p-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-primary">
                    <Link
                      href={`/caves/${group.caveId}`}
                      className="hover:underline"
                    >
                      {group.caveName}
                    </Link>
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {group.commentCount}{' '}
                    {group.commentCount === 1
                      ? t('discussion.comment')
                      : t('discussion.comments')}
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {group.comments.map((comment) => (
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
                            {comment.user_name
                              ? getInitials(comment.user_name)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium text-sm">
                              {comment.user_name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/90 line-clamp-2">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-surface-3 p-3 flex justify-end">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/90"
                  >
                    <Link
                      href={`/caves/${group.caveId}`}
                      className="flex items-center gap-1"
                    >
                      {t('discussion.view')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
