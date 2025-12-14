// components/testimonial-form.tsx

'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countries, getCountryFlag } from '@/lib/countries'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from './ui/card'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

const messageMaxLength = 2000

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  country: z.string().min(2, { message: 'Please select a country.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(messageMaxLength, {
      message: `Message must be less than ${messageMaxLength} characters.`,
    }),
})

export function TestimonialForm() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [showPopUp, setShowPopUp] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      email: '',
      message: '',
    },
  })

  const messageLength = form.watch('message')?.length

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Enviar directamente a Web3Forms desde el cliente
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_TESTIMONIALS_ACCESS_KEY,
          subject: 'New testimonial',
          name: values.name,
          email: values.email,
          country: values.country,
          date: new Date().toISOString().split('T')[0],
          message: values.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: t('testimonial_form_submitted_title'),
          description: t('testimonial_form_submitted_description'),
        })
        setShowPopUp(true)
        form.reset()
      } else {
        throw new Error(result.message || 'Testimonial submission failed')
      }
    } catch (error) {
      console.error('Testimonial submission error:', error)
      toast({
        title: t('testimonial_form_error_title'),
        description: t('testimonial_form_error_description'),
        variant: 'destructive',
      })
    }
  }

  // const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const response = await fetch('/api/testimonials', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: values.name,
  //         email: values.email,
  //         country: values.country,
  //         message: values.message,
  //       }),
  //     })

  //     const result = await response.json()

  //     if (result.success) {
  //       toast({
  //         title: t('testimonial_form_submitted_title'),
  //         description: t('testimonial_form_submitted_description'),
  //       })
  //       setShowPopUp(true)
  //       form.reset()
  //     } else {
  //       throw new Error(result.message || 'Testimonial submission failed')
  //     }
  //   } catch (error) {
  //     console.error('Testimonial submission error:', error)
  //     toast({
  //       title: t('testimonial_form_error_title'),
  //       description: t('testimonial_form_error_description'),
  //       variant: 'destructive',
  //     })
  //   }
  // }
  return (
    <div className=" relative w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="relative space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('testimonial_form_name_label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('testimonial_form_name_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('testimonial_form_country_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'testimonial_form_country_placeholder'
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <div className=" flex items-center gap-2">
                            <Image
                              src={getCountryFlag(c.code)}
                              alt={c.name}
                              width={20}
                              height={20}
                            />
                            <span>{c.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('booking_form_email_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('booking_form_email_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className=" flex items-start justify-between">
                  <FormLabel>{t('testimonial_form_message_label')}</FormLabel>
                  <span className="text-xs text-muted-foreground">
                    {messageLength}/{messageMaxLength}
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder={t('testimonial_form_message_placeholder')}
                    className="resize-none"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            {t('testimonial_form_submit_button')}
          </Button>
        </form>
      </Form>
      <div
        className={`${
          showPopUp
            ? ' translate-y-0 opacity-100 '
            : ' translate-y-[110%] opacity-0 '
        } absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary/10 backdrop-blur-md rounded-lg transition-all duration-300 ease-in-out`}
      >
        <Card className=" w-5/6 bg-primary border-primary/50 text-center">
          <CardContent className="p-8">
            <CheckCircle2 className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-bold mb-2">
              {t('testimonial_form_submitted_title')}
            </h3>
            <p className="text-muted-foreground">
              {t('thanks_message_form_submitted')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
