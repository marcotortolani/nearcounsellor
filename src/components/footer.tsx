
'use client'

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer id="contact" className="relative bg-card border-t pb-14 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
            <h3 className="font-headline text-2xl font-bold mb-2">{t('contact_us_title')}</h3>
            <p className="text-muted-foreground mb-4">{t('contact_us_description')}</p>
            <a href="mailto:info@nearcounselling.co.nz" className="text-primary hover:underline font-bold text-lg">
                info@nearcounselling.co.nz
            </a>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {t('site_title')}. {t('footer_rights_reserved')}</p>
          <p className="mt-1">{t('footer_designed_with_care')}</p>
        </div>
      </div>
    </footer>
  )
}
