"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CaverBob.org</h3>
            <p className="text-primary-foreground/80">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {t("nav.rankings")}
                </Link>
              </li>
              <li>
                <Link href="/discussion" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {t("nav.discussion")}
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {t("nav.sources")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/tribute" className="text-primary-foreground/80 hover:text-primary-foreground">
                  {t("nav.tribute")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} CaverBob.org. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
