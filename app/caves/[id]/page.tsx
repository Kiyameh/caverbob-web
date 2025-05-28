import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { CaveDetailClient } from "@/components/cave-detail-client"

export default async function CaveDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { id } = params

  // Fetch cave details
  const { data: cave, error } = await supabase.from("caves").select("*").eq("id", id).single()

  if (error || !cave) {
    notFound()
  }

  return <CaveDetailClient cave={cave} id={id} />
}
