'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/contexts/language-context'

export default function BookingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t('booking_page_title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('booking_page_description')}
          </p>
          
          <div className="bg-card p-4 rounded-lg shadow-sm" style={{minHeight: '700px'}}>
            {/* Placeholder for Calendly embed */}
            <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">{t('booking_page_calendly_placeholder')}</p>
            </div>
          </div>

          <p className="text-muted-foreground mt-8">
            {t('booking_page_contact_prompt_start')}{' '}
            <Link href="/#contact" className="text-primary hover:underline">
              {t('booking_page_contact_prompt_link')}
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
