'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  // HeartHandshake,
  // Target,
  // ClipboardList,
  Users,
  Lightbulb,
  Wallet,
  BookOpen,
  Send,
  CheckCircle2,
} from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TestimonialForm } from '@/components/testimonial-form'
import {
  TestimonialCard,
  type Testimonial,
} from '@/components/testimonial-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { allTestimonials as baseTestimonials } from './testimonials/data'

export default function Home() {
  const { t } = useLanguage()

  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([])

  React.useEffect(() => {
    const translatedTestimonials = baseTestimonials.map(
      (testimonial, index) => ({
        ...testimonial,
        name: t(`testimonial${index + 1}_name`),
        message: t(`testimonial${index + 1}_message`),
      })
    )
    setTestimonials(translatedTestimonials)
  }, [t])

  const addTestimonial = (testimonial: Omit<Testimonial, 'lang' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      lang: 'en', // default lang for new testimonials
      date: new Date().toISOString().split('T')[0],
    }
    setTestimonials((prev) => [newTestimonial, ...prev])
  }

  const howItWorksSteps = [
    { text: t('how_it_works_step1') },
    { text: t('how_it_works_step2') },
    { text: t('how_it_works_step3') },
    { text: t('how_it_works_step4') },
  ]

  const heroImages = [
    { src: '/images/cinthia01.webp', hint: 'therapist portrait' },
    { src: '/images/cinthia02.webp', hint: 'counselling session' },
    { src: '/images/cinthia03.webp', hint: 'therapist smiling' },
    { src: '/images/cinthia04.webp', hint: 'therapist smiling' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4 ">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center ">
              <div className="md:col-span-2">
                <Carousel
                  opts={{
                    loop: true,
                  }}
                  className=" group "
                >
                  <CarouselContent className=" z-0">
                    {heroImages.map((image, index) => (
                      <CarouselItem key={index} className="w-full z-0">
                        <div
                          className="relative  rounded-lg overflow-hidden shadow-lg  "
                          style={{ aspectRatio: '4/3' }}
                        >
                          <Image
                            src={image.src}
                            alt={`Cinthia image ${index + 1}`}
                            objectPosition="center"
                            objectFit="cover"
                            fill
                            className=" hover:scale-105 transition-transform duration-300  "
                            data-ai-hint={image.hint}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden group-hover:flex left-4 z-30" />
                  <CarouselNext className="hidden group-hover:flex right-4 z-30" />
                </Carousel>
              </div>

              <div className="md:col-span-3">
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {t('about_title')}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('about_description')}
                </p>
                <Button size="lg" asChild>
                  <a href="#contact">{t('get_in_touch_button')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12">
                {t('how_it_works_title')}
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/20 text-primary rounded-full p-2">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground pt-1">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                {t('services_offered_title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                {t('services_offered_description')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 mb-4 text-accent" />
                <h3 className="font-headline text-2xl font-semibold mb-2">
                  {t('individual_sessions_title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('individual_sessions_description')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb className="w-12 h-12 mb-4 text-accent" />
                <h3 className="font-headline text-2xl font-semibold mb-2">
                  {t('brief_therapy_title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('brief_therapy_description')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Send className="w-12 h-12 mb-4 text-accent" />
                <h3 className="font-headline text-2xl font-semibold mb-2">
                  {t('responsible_referrals_title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('responsible_referrals_description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                  {t('free_initial_session_title')}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  {t('free_initial_session_description')}
                </p>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/booking">{t('book_free_session_button')}</Link>
                </Button>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4">
                    <Wallet className="w-8 h-8 text-accent" />
                    <h3 className="font-headline text-2xl font-bold">
                      {t('fees_and_support_title')}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2 pl-12">
                    {t('fees_and_support_description')}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-accent" />
                    <h3 className="font-headline text-2xl font-bold">
                      {t('responsible_referrals_title_alt')}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2 pl-12">
                    {t('responsible_referrals_description_alt')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              {t('why_i_did_this_title')}
            </h2>
            <p className="text-muted-foreground text-lg whitespace-pre-line">
              {t('why_i_did_this_description')}
            </p>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                {t('who_is_cinthia_title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                {t('who_is_cinthia_description')}
              </p>
            </div>

            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full">
                      <TestimonialCard
                        testimonial={testimonial}
                        className="h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>

            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/testimonials">
                  {t('view_all_testimonials_button')}
                </Link>
              </Button>
            </div>

            <Separator className="my-16" />

            <div className="max-w-2xl mx-auto">
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">
                {t('share_your_experience_title')}
              </h3>
              <TestimonialForm onSubmit={addTestimonial} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
