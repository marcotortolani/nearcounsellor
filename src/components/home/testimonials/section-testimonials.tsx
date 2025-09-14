'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TestimonialForm } from '@/components/testimonial-form'
import {
  TestimonialCard,
  type Testimonial,
} from '@/components/testimonial-card'

import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// import { allTestimonials as baseTestimonials } from '@/app/testimonials/data'
import { getTestimonials } from '@/actions/get-testimonials'

export default function SectionTestimonials() {
  const { t } = useLanguage()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    async function loadTestimonials() {
      const fetchedTestimonials = await getTestimonials()

      setTestimonials(fetchedTestimonials || [])
    }
    loadTestimonials()
  }, [])


  return (
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
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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

        <div className="max-w-2xl mx-auto bg-card rounded-lg p-8">
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">
            {t('share_your_experience_title')}
          </h3>
          <TestimonialForm />
        </div>
      </div>
    </section>
  )
}
