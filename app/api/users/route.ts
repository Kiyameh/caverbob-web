import {createServerClient} from '@/lib/supabase'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
  try {
    const {userIds} = await request.json()
    const supabase = createServerClient()

    // Get user data from auth
    const {data: userData, error: userError} =
      await supabase.auth.admin.listUsers()

    if (userError) {
      console.error('Error fetching user data:', userError)
      return NextResponse.json(
        {error: 'Error fetching user data'},
        {status: 500}
      )
    }

    // Create a map of user data
    const userMap = new Map()
    userData?.users.forEach((user) => {
      userMap.set(user.id, {
        name: user.user_metadata?.full_name || user.email || 'User',
        avatar: user.user_metadata?.avatar_url || '',
      })
    })

    // Filter and return only the requested users
    const filteredUsers = userIds.map((id: string) => ({
      id,
      ...userMap.get(id),
    }))

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error('Error in users API:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
