
'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { TestimonialCard, type Testimonial } from '@/components/testimonial-card'
import { useLanguage } from '@/contexts/language-context'
import { allTestimonials } from './data'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

type SortOrder = 'newest' | 'oldest'

export default function TestimonialsPage() {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = React.useState<Testimonial[]>([])
  const [languageFilter, setLanguageFilter] = React.useState('all')
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('newest')

  React.useEffect(() => {
    const translatedTestimonials = allTestimonials.map((testimonial, index) => ({
      ...testimonial,
      name: t(`testimonial${index + 1}_name`),
      message: t(`testimonial${index + 1}_message`),
    }));
    setTestimonials(translatedTestimonials);
  }, [t]);

  React.useEffect(() => {
    let result = [...testimonials]

    if (languageFilter !== 'all') {
      result = result.filter(t => t.lang === languageFilter)
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    setFilteredTestimonials(result)
  }, [testimonials, languageFilter, sortOrder])

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
            <div className="flex items-center gap-2">
                <Label htmlFor="language-filter">{t('filter_by_language_label')}</Label>
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
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="sort-order">{t('sort_by_date_label')}</Label>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

    