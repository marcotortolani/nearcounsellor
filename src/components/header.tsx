'use client'

import Link from 'next/link'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/contexts/language-context'

export function Header() {
  const { t, setLanguage } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-xl font-bold text-primary">{t('site_title')}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#about" className="transition-colors hover:text-primary">{t('nav_about')}</Link>
          <Link href="/#services" className="transition-colors hover:text-primary">{t('nav_services')}</Link>
          <Link href="/#testimonials" className="transition-colors hover:text-primary">{t('nav_testimonials')}</Link>
          <Link href="/#contact" className="transition-colors hover:text-primary">{t('nav_contact')}</Link>
        </nav>
        <div className="flex items-center gap-4">
            <Button asChild>
                <Link href="/booking">{t('book_session_button')}</Link>
            </Button>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span>🇳🇿</span>
                <span className="ml-2">English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('pt')}>
                <span>🇧🇷</span>
                <span className="ml-2">Português</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>
                <span>🇦🇷</span>
                <span className="ml-2">Español</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
