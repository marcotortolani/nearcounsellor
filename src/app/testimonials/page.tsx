'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  TestimonialCard,
  type Testimonial,
} from '@/components/testimonial-card'
import { useLanguage } from '@/contexts/language-context'

import { getTestimonials } from '@/actions/get-testimonials'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { TestimonialForm } from '@/components/testimonial-form'
import { Separator } from '@radix-ui/react-dropdown-menu'

type SortOrder = 'newest' | 'oldest'

export default function TestimonialsPage() {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([])
  const [languageFilter, setLanguageFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  useEffect(() => {
    async function loadTestimonials() {
      const fetchedTestimonials = await getTestimonials()

      const processedTestimonials = fetchedTestimonials?.map(
        (testimonialData) => {
          const testimonialWithName = testimonialData as Testimonial
          return {
            ...testimonialWithName,
          }
        }
      )
      setTestimonials(processedTestimonials || [])
    }
    loadTestimonials()
  }, [])

  useEffect(() => {
    let result = [...testimonials]

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    setFilteredTestimonials(result)
  }, [testimonials, languageFilter, sortOrder])

  // const addTestimonial = (testimonial: Omit<Testimonial, 'lang' | 'date'>) => {
  //   const newTestimonial: Testimonial = {
  //     ...testimonial,
  //     lang: 'en', // default lang for new testimonials
  //     date: new Date().toISOString().split('T')[0],
  //   }
  //   setTestimonials((prev) => [newTestimonial, ...prev])
  // }

  const recentTestimonials = filteredTestimonials.slice(0, 3)
  const olderTestimonials = filteredTestimonials.slice(3)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t('testimonials_page_title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            {t('testimonials_page_description')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          {/* <div className="flex items-center gap-2">
            <Label htmlFor="language-filter">
              {t('filter_by_language_label')}
            </Label>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger id="language-filter" className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_languages')}</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-order">{t('sort_by_date_label')}</Label>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
            >
              <SelectTrigger id="sort-order" className="w-[180px]">
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                <SelectItem value="oldest">{t('sort_oldest')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentTestimonials.map((testimonial, index) => (
            <div key={`recent-${index}`} className="md:col-span-1">
              <TestimonialCard
                testimonial={testimonial}
                className="h-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {olderTestimonials.map((testimonial, index) => (
            <div key={`older-${index}`}>
              <TestimonialCard
                testimonial={testimonial}
                className="h-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <Separator className="my-16" />

        <div className="max-w-2xl mx-auto bg-card rounded-lg p-8">
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">
            {t('share_your_experience_title')}
          </h3>
          <TestimonialForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// 'use client'

// import * as React from 'react'
// import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'
// import { TestimonialCard, type Testimonial } from '@/components/testimonial-card'
// import { useLanguage } from '@/contexts/language-context'
// import { allTestimonials } from './data'
// import { Button } from '@/components/ui/button'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Label } from '@/components/ui/label'

// type SortOrder = 'newest' | 'oldest'

// export default function TestimonialsPage() {
//   const { t } = useLanguage()
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([])
//   const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])
//   const [languageFilter, setLanguageFilter] = useState('all')
//   const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

//   useEffect(() => {
//     const translatedTestimonials = allTestimonials.map((testimonial, index) => ({
//       ...testimonial,
//       name: t(`testimonial${index + 1}_name`),
//       message: t(`testimonial${index + 1}_message`),
//     }));
//     setTestimonials(translatedTestimonials);
//   }, [t]);

//   useEffect(() => {
//     let result = [...testimonials]

//     if (languageFilter !== 'all') {
//       result = result.filter(t => t.lang === languageFilter)
//     }

//     result.sort((a, b) => {
//       const dateA = new Date(a.date).getTime()
//       const dateB = new Date(b.date).getTime()
//       return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
//     })

//     setFilteredTestimonials(result)
//   }, [testimonials, languageFilter, sortOrder])

//   return (
//     <div className="flex flex-col min-h-screen bg-background">
//       <Header />
//       <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
//         <div className="text-center max-w-3xl mx-auto">
//           <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
//             {t('testimonials_page_title')}
//           </h1>
//           <p className="text-lg text-muted-foreground mb-12">
//             {t('testimonials_page_description')}
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
//             <div className="flex items-center gap-2">
//                 <Label htmlFor="language-filter">{t('filter_by_language_label')}</Label>
//                 <Select value={languageFilter} onValueChange={setLanguageFilter}>
//                     <SelectTrigger id="language-filter" className="w-[180px]">
//                         <SelectValue placeholder="Language" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">{t('all_languages')}</SelectItem>
//                         <SelectItem value="en">English</SelectItem>
//                         <SelectItem value="pt">Português</SelectItem>
//                         <SelectItem value="es">Español</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>
//             <div className="flex items-center gap-2">
//                 <Label htmlFor="sort-order">{t('sort_by_date_label')}</Label>
//                 <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
//                     <SelectTrigger id="sort-order" className="w-[180px]">
//                         <SelectValue placeholder="Sort order" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="newest">{t('sort_newest')}</SelectItem>
//                         <SelectItem value="oldest">{t('sort_oldest')}</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredTestimonials.map((testimonial, index) => (
//                 <TestimonialCard key={index} testimonial={testimonial} />
//             ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
