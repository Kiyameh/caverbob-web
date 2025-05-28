import { createServerClient } from "@/lib/supabase"
import { DiscussionPageClient } from "@/components/discussion-page-client"

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

async function getLatestDiscussions() {
  const supabase = createServerClient()

  // Get the latest comments
  const { data: comments, error: commentsError } = await supabase
    .from("cave_comments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)

  if (commentsError) {
    console.error("Error fetching comments:", commentsError)
    return []
  }

  // Get all cave IDs from the comments
  const caveIds = [...new Set(comments.map((comment) => comment.cave_id))]

  // Fetch cave details for all cave IDs
  const { data: caves, error: cavesError } = await supabase.from("caves").select("id, name").in("id", caveIds)

  if (cavesError) {
    console.error("Error fetching caves:", cavesError)
    return comments
  }

  // Create a map of cave IDs to cave names
  const caveMap = new Map()
  caves.forEach((cave) => {
    caveMap.set(cave.id.toString(), cave.name)
  })

  // Try to get user data if possible
  const userMap = new Map()
  try {
    const { data: userData } = await supabase.auth.admin.listUsers()
    if (userData && userData.users) {
      userData.users.forEach((user) => {
        userMap.set(user.id, {
          name: user.user_metadata?.full_name || user.email || "User",
          avatar: user.user_metadata?.avatar_url || "",
        })
      })
    }
  } catch (error) {
    console.log("Could not fetch user data:", error)
  }

  // Combine comment data with cave and user data
  const enrichedComments = comments.map((comment) => {
    const user = userMap.get(comment.user_id)
    return {
      ...comment,
      cave_name: caveMap.get(comment.cave_id) || `Cave #${comment.cave_id}`,
      user_name: user?.name || "User",
      user_avatar: user?.avatar || "",
    }
  })

  return enrichedComments
}

export default async function DiscussionPage() {
  const latestComments = await getLatestDiscussions()
  return <DiscussionPageClient latestComments={latestComments} />
}
