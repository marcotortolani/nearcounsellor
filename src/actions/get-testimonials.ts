// 'use server'

import Papa from 'papaparse'
import { Testimonial } from '@/components/testimonial-card'

const SPREADSHEET_URL = process.env.NEXT_PUBLIC_TESTIMONIALS_CSV as string

// function detectLanguage(text: string): 'en' | 'es' | 'pt' {
//   // Basic detection, can be improved
//   if (/[áéíóúñ¡¿]/.test(text) || /\b(un|una|el|la|y|o)\b/i.test(text)) {
//     return 'es'
//   }
//   if (/[àáâãéêíóôõúç]/.test(text) || /\b(um|uma|o|a|e|ou)\b/i.test(text)) {
//     return 'pt'
//   }
//   return 'en'
// }

export async function getTestimonials() {
  try {
    const response = await fetch(SPREADSHEET_URL, {
      next: {
        revalidate: 5, // Revalidate every hour
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch spreadsheet, returning local data')
    }

    const csvText = await response.text()
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (parsed.errors.length > 0) {
      console.error('Error parsing CSV:', parsed.errors)
    }

    const sheetTestimonials: Testimonial[] = parsed.data.map((row: any) => ({
      name: row.Name || 'Anonymous',
      email: row.Email || '',
      country: row.Country || 'XX',
      date: row.Date || new Date().toISOString().split('T')[0],
      message: row.Message || '',
      photo: null,
      photoHint: 'person photo',
    }))

    return sheetTestimonials
  } catch (error) {
    console.error('Error fetching or parsing testimonials:', error)
  }
}
