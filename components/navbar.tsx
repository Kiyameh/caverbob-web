"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { LoginButton } from "@/components/auth/login-button"
import { UserMenu } from "@/components/auth/user-menu"
import { MeasurementToggle } from "@/components/measurement-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { DiscussionCount } from "@/components/discussion-count"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const { t } = useLanguage()

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              CaverBob.org
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-primary-foreground/20">
              {t("nav.rankings")}
            </Link>
            <Link href="/discussion" className="px-3 py-2 rounded-md hover:bg-primary-foreground/20 flex items-center">
              {t("nav.discussion")}
              <span className="ml-1.5">
                <DiscussionCount />
              </span>
            </Link>
            <Link href="/sources" className="px-3 py-2 rounded-md hover:bg-primary-foreground/20">
              {t("nav.sources")}
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md hover:bg-primary-foreground/20">
              {t("nav.about")}
            </Link>
            <Link href="/tribute" className="px-3 py-2 rounded-md hover:bg-primary-foreground/20">
              {t("nav.tribute")}
            </Link>
          </div>

          {/* Right side items: Language toggle, Measurement toggle and Login/User menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language toggle */}
            <LanguageToggle hoverBg="bg-primary-foreground/20" />

            {/* Measurement system toggle */}
            <MeasurementToggle hoverBg="bg-primary-foreground/20" />

            {/* Login button or user menu */}
            {isLoading ? (
              <div className="h-10 w-24 bg-primary-foreground/20 animate-pulse rounded-md"></div>
            ) : user ? (
              <UserMenu />
            ) : (
              <LoginButton />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile language toggle */}
            <LanguageToggle compact hoverBg="bg-primary-foreground/20" />

            {/* Mobile measurement toggle */}
            <MeasurementToggle compact hoverBg="bg-primary-foreground/20" />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.rankings")}
            </Link>
            <Link
              href="/discussion"
              className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.discussion")}
              <span className="ml-1.5">
                <DiscussionCount />
              </span>
            </Link>
            <Link
              href="/sources"
              className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.sources")}
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/tribute"
              className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.tribute")}
            </Link>
            {!isLoading && !user && (
              <div className="mt-2 px-3">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
