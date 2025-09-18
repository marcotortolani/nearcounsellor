'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getCountryFlag } from '@/lib/countries'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/language-context'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Separator } from './ui/separator'

export type Testimonial = {
  name: string
  email: string
  country: string
  message: string
  photo?: string | null
  photoHint?: string
  date: string // YYYY-MM-DD
  lang: 'en' | 'es' | 'pt'
}

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

function maskEmail(email: string) {
  if (!email || !email.includes('@')) {
    return '***@***.***'
  }
  const [user, domain] = email.split('@')
  const maskedUser =
    user.length > 2
      ? `${user.substring(0, 1)}***`
      : `${user.substring(0, 1)}***`
  const [domainName, domainTld] = domain.split('.')
  const maskedDomain =
    domainName.length > 1 ? `${domainName.substring(0, 1)}***` : '***'

  return `${maskedUser}@${maskedDomain}.${domainTld}`
}

const TestimonialCardContent: React.FC<{
  testimonial: Testimonial
  isTruncated: boolean
  className?: string
}> = ({ testimonial, isTruncated, className }) => {
  const { name, country, message, photo, photoHint, email, date } = testimonial
  const nameInitial = name ? name.charAt(0).toUpperCase() : 'A'
  const { t } = useLanguage()

  const displayText = isTruncated ? `${message.substring(0, 200)}...` : message

  return (
    <Card className={cn('flex flex-col h-full', className)}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="text-muted-foreground flex-grow mb-6">
          <p className="whitespace-pre-line">"{displayText}"</p>
          {isTruncated && (
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <span>{t('read_more_button')}</span>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{nameInitial}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <div className="flex items-center gap-2">
              <Image
                src={getCountryFlag(country)}
                alt={country}
                width={20}
                height={20}
              />
              <p className="text-xs text-muted-foreground/80">
                {maskEmail(email)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const { name, country, message, photo, photoHint, email, date } = testimonial
  const nameInitial = name ? name.charAt(0).toUpperCase() : 'A'
  const { t } = useLanguage()

  const isLongText = message.length > 200

  if (isLongText) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className={cn('cursor-pointer', className)}>
            <TestimonialCardContent
              testimonial={testimonial}
              isTruncated={true}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('testimonial_full_modal_title')}</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto">
            <p className="whitespace-pre-line text-muted-foreground">
              "{message}"
            </p>
          </div>
          <Separator />
          <div className="flex items-center gap-4 pt-2">
            <Avatar>
              <AvatarFallback>{nameInitial}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <div className="flex items-center gap-2">
                <Image
                  src={getCountryFlag(country)}
                  alt={country}
                  width={20}
                  height={20}
                />
                <p className="text-xs text-muted-foreground/80">
                  {maskEmail(email)}
                </p>
              </div>
              <p className="text-xs text-muted-foreground/60">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <TestimonialCardContent
      testimonial={testimonial}
      isTruncated={false}
      className={className}
    />
  )
}


// import Image from 'next/image'
// import { Card, CardContent } from '@/components/ui/card'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { getCountryFlag } from '@/lib/countries'
// import { cn } from '@/lib/utils'

// export type Testimonial = {
//   name: string;
//   country: string;
//   email: string;
//   message: string;
//   photo?: string | null;
//   photoHint?: string;
//   date: string; // YYYY-MM-DD
//   lang: 'en' | 'es' | 'pt';
// };

// interface TestimonialCardProps {
//   testimonial: Testimonial
//   className?: string
// }

// export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
//   const { name, country, message, photo, photoHint } = testimonial
//   const nameInitial = name ? name.charAt(0).toUpperCase() : 'A'

//   return (
//     <Card className={cn("flex flex-col", className)}>
//       <CardContent className="p-6 flex-grow flex flex-col">
//         <p className="text-muted-foreground flex-grow mb-6">"{message}"</p>
//         <div className="flex items-center gap-4">
//           <Avatar>
//             {photo ? (
//               <AvatarImage src={photo} alt={name} data-ai-hint={photoHint || 'person smiling'} />
//             ) : (
//               <AvatarImage src={`https://placehold.co/100x100.png`} alt={name} data-ai-hint={photoHint || 'person smiling'} />
//             )}
//             <AvatarFallback>{nameInitial}</AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="font-semibold">{name}</p>
//             <p className="text-sm text-muted-foreground">{getCountryFlag(country)}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
