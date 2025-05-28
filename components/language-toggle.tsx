"use client"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageToggleProps {
  className?: string
  compact?: boolean
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage()

  // Flag emojis
  const flags = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200",
              className,
            )}
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")}>
            <span className="mr-2">{flags.en}</span> {t("language.en")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("es")}>
            <span className="mr-2">{flags.es}</span> {t("language.es")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("fr")}>
            <span className="mr-2">{flags.fr}</span> {t("language.fr")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200 border border-primary-foreground/20",
            className,
          )}
          aria-label="Change language"
        >
          <span className="mr-2">{flags[language]}</span>
          <span className="mr-1">{language.toUpperCase()}</span>
          <Globe className="h-4 w-4 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          <span className="mr-2">{flags.en}</span> {t("language.en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          <span className="mr-2">{flags.es}</span> {t("language.es")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fr")}>
          <span className="mr-2">{flags.fr}</span> {t("language.fr")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
