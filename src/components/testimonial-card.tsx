import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getCountryFlag } from '@/lib/countries'
import { cn } from '@/lib/utils'

export type Testimonial = {
  name: string
  email: string
  country: string
  message: string
  // photo?: string | null
  // photoHint?: string
  date: string // YYYY-MM-DD
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

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const { name, country, message, email } = testimonial
  const nameInitial = name ? name.charAt(0).toUpperCase() : 'A'

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <p className="text-muted-foreground flex-grow mb-6">"{message}"</p>
        <div className="flex items-center gap-4">
          <Avatar>
            {/* {photo ? (
              <AvatarImage
                src={photo}
                alt={name}
                data-ai-hint={photoHint || 'person smiling'}
              />
            ) : (
              <AvatarImage
                src={`https://placehold.co/100x100.png?text=${nameInitial}`}
                alt={name}
                data-ai-hint={photoHint || 'person smiling'}
              />
            )} */}
            <AvatarFallback>{nameInitial}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {getCountryFlag(country)}
              </p>
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
