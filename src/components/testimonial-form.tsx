'use client'

import * as React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countries, getCountryFlag } from "@/lib/countries"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from '@/contexts/language-context'
import { Testimonial } from './testimonial-card'


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  country: z.string().min(2, { message: "Please select a country." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

interface TestimonialFormProps {
  onSubmit: (data: Omit<Testimonial, 'lang' | 'date'>) => void;
}

export function TestimonialForm({ onSubmit }: TestimonialFormProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      message: "",
    },
  })

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({ ...values, photo: null, photoHint: "person photo" })
    toast({
      title: t('testimonial_form_submitted_title'),
      description: t('testimonial_form_submitted_description'),
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('testimonial_form_name_label')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('testimonial_form_name_placeholder')} {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={t('testimonial_form_country_placeholder')} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {countries.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                        {getCountryFlag(c.code)} {c.name}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('testimonial_form_message_label')}</FormLabel>
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
        
        <Button type="submit" size="lg" className="w-full">{t('testimonial_form_submit_button')}</Button>
      </form>
    </Form>
  )
}

    