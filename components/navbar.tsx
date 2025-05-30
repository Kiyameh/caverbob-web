'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Menu, X, Heart} from 'lucide-react'
import {useAuth} from '@/contexts/auth-context'
import {useLanguage} from '@/contexts/language-context'
import {LoginButton} from '@/components/auth/login-button'
import {FloatingLoginButton} from '@/components/auth/floating-login-button'
import {UserMenu} from '@/components/auth/user-menu'
import {MeasurementToggle} from '@/components/measurement-toggle'
import {LanguageToggle} from '@/components/language-toggle'
import {DiscussionCount} from '@/components/discussion-count'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {user, isLoading} = useAuth()
  const {t} = useLanguage()

  return (
    <>
      <nav
        className="bg-primary text-primary-foreground"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-3xl font-bold flex items-center gap-2"
                aria-label="CaverBob.org Home"
              >
                <img
                  src="/logo.png"
                  alt=""
                  className="h-8 w-auto"
                  aria-hidden="true"
                />
                <span className="hidden md:inline">CaverBob.org</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div
              className="hidden xl:flex space-x-4"
              role="menubar"
            >
              <Link
                href="/"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                role="menuitem"
              >
                {t('nav.rankings')}
              </Link>
              <Link
                href="/discussion"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20 flex items-center"
                role="menuitem"
              >
                {t('nav.discussion')}
                <span
                  className="ml-1.5"
                  aria-label={`${t('nav.discussion')} count`}
                >
                  <DiscussionCount />
                </span>
              </Link>
              <Link
                href="/sources"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                role="menuitem"
              >
                {t('nav.sources')}
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                role="menuitem"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/tribute"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                role="menuitem"
              >
                {t('nav.tribute')}
              </Link>
              <Link
                href="/support"
                className="px-3 py-2 rounded-md bg-accent hover:bg-accent/70 font-medium flex items-center gap-1.5"
                role="menuitem"
              >
                <Heart
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                {t('nav.support')}
              </Link>
            </div>

            {/* Right side items */}
            <div
              className="hidden xl:flex items-center space-x-4"
              role="toolbar"
              aria-label="User preferences"
            >
              <LanguageToggle />
              <MeasurementToggle />
              {isLoading ? null : user ? <UserMenu /> : null}
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center space-x-4">
              <LanguageToggle compact />
              <MeasurementToggle compact />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary-foreground hover:text-gray-200 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className="xl:hidden"
            id="mobile-menu"
            role="menu"
            aria-label="Mobile menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('nav.rankings')}
              </Link>
              <Link
                href="/discussion"
                className="px-3 py-2 rounded-md hover:bg-primary-foreground/20 flex items-center"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('nav.discussion')}
                <span
                  className="ml-1.5"
                  aria-label={`${t('nav.discussion')} count`}
                >
                  <DiscussionCount />
                </span>
              </Link>
              <Link
                href="/sources"
                className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('nav.sources')}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/tribute"
                className="block px-3 py-2 rounded-md hover:bg-primary-foreground/20"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {t('nav.tribute')}
              </Link>
              <Link
                href="/support"
                className="px-3 py-2 rounded-md bg-accent hover:bg-accent/70 font-medium flex items-center gap-1.5"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                <Heart
                  className="w-4 h-4"
                  aria-hidden="true"
                />
                {t('nav.support')}
              </Link>
              {!isLoading && !user && (
                <div className="mt-3 w-full">
                  <LoginButton />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Floating login button for desktop */}
      {!isLoading && !user && <FloatingLoginButton />}
    </>
  )
}
