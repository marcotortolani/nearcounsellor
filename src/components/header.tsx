'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/contexts/language-context'

export function Header() {
  const { t, language, setLanguage } = useLanguage()

  const languages = [
    {
      code: 'en',
      flag: '/images/flags/new-zealand-flag-rounded.png',
      name: 'New Zealand',
    },
    {
      code: 'pt',
      flag: '/images/flags/brasil-flag-rounded.png',
      name: 'Brazil',
    },
    {
      code: 'es',
      flag: '/images/flags/argentina-flag-rounded.png',
      name: 'Argentina',
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex flex-col items-start ">
          <span className="font-headline text-xl md:text-2xl font-bold text-primary">
            {t('site_title')}
          </span>
          <span
            className={
              '-mt-2 md:text-lg font-quintessential font-semibold text-neutral-700 text-center w-full tracking-wider italic '
            }
          >
            {t('site_slogan')}
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#about" className="transition-colors hover:text-primary">
            {t('nav_about')}
          </Link>
          <Link
            href="/#services"
            className="transition-colors hover:text-primary"
          >
            {t('nav_services')}
          </Link>
          <Link
            href="/#testimonials"
            className="transition-colors hover:text-primary"
          >
            {t('who_is_cinthia?')}
          </Link>
          <Link href="/#faqs" className="transition-colors hover:text-primary">
            {t('how_it_began?')}
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-primary"
          >
            {t('nav_contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className=" hidden lg:flex">
            <Link href="/booking">{t('book_session_button')}</Link>
          </Button>

          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full w-6 h-6 lg:w-8 lg:h-8 transition-all duration-200 ease-in-out p-0 overflow-hidden',
                  language === lang.code
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'hover:scale-110 opacity-50 hover:opacity-100'
                )}
                onClick={() => setLanguage(lang.code as 'en' | 'es' | 'pt')}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    fill
                    objectFit="cover"
                  />
                </div>
                <span className="sr-only">Switch to {lang.code}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
