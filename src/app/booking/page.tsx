'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/contexts/language-context'
import { BookingForm } from '@/components/booking-form'

export default function BookingPage() {
  const { t } = useLanguage()

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24 ">
        <div className="w-full text-center max-w-screen-xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t('booking_page_title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('booking_page_description_form')}
          </p>

          <div
            className="w-full h-full flex items-center justify-center bg-card p-0 lg:p-4 rounded-xl shadow-sm border border-neutral-500"
          >
            {/* <BookingForm /> */}
            <iframe
              src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1sknYkD57MZ4AmtOJ4HjRdxIq2vVwdV0EDMyiC3vv6x021N5FA_BXOm1eavnSX5_WUrjHLSdw_"
              frameBorder="0"
              width="100%" height="100%"
              className='p-0 px-1 2xl:w-[1200px] w-full h-[1600px] md:h-[900px] lg:h-[840px] '>

            </iframe>
          </div>

          <p className="px-4 text-muted-foreground mt-8">
            {t('booking_page_contact_prompt_start')}{' '}
            <Link
              href="mailto:info@nearcounselling.co.nz"
              className="text-primary hover:underline"
            >
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
