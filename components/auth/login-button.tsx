"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { LogIn } from "lucide-react"

export function LoginButton() {
  const { signInWithGoogle } = useAuth()
  const { t } = useLanguage()

  return (
    <Button
      onClick={signInWithGoogle}
      variant="outline"
      className="bg-accent text-accent-foreground hover:bg-accent/80 flex items-center gap-2 border-primary-foreground/20"
    >
      <LogIn className="h-4 w-4" />
      {t("nav.signin")}
    </Button>
  )
}
