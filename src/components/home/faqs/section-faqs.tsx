'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

// Componente individual para cada item colapsable
const CollapsibleItem = ({
  title,
  description,
  isOpen,
  onToggle,
}: {
  title: string
  description: string
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <div className="container mx-auto px-4 text-start max-w-3xl">
      <div
        className="flex items-start justify-between cursor-pointer group"
        onClick={onToggle}
      >
        <h2 className=" w-5/6 font-headline text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <ChevronDown
          className={`w-6 h-6 text-muted-foreground transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-muted-foreground text-lg whitespace-pre-line pb-4">
          {description}
        </p>
      </div>
    </div>
  )
}

// Tu sección actualizada
export default function SectionFAQS() {
  const { t } = useLanguage()

  // Estado para controlar qué items están abiertos
  const [openItems, setOpenItems] = React.useState({
    why: false,
    help: false,
    cinthia: false,
  })

  // Función para alternar el estado de un item
  const toggleItem = (itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey as keyof typeof prev],
    }))
  }

  return (
    <section id="faqs" className="py-16 md:py-24 bg-card flex flex-col gap-10">
      <CollapsibleItem
        title={t('why_i_did_this_title')}
        description={t('why_i_did_this_description')}
        isOpen={openItems.why}
        onToggle={() => toggleItem('why')}
      />

      <CollapsibleItem
        title={t('how_can_she_help_me_title')}
        description={t('how_can_she_help_me_description')}
        isOpen={openItems.help}
        onToggle={() => toggleItem('help')}
      />

      <CollapsibleItem
        title={t('how_is_cinthia_title')}
        description={t('how_is_cinthia_description')}
        isOpen={openItems.cinthia}
        onToggle={() => toggleItem('cinthia')}
      />
    </section>
  )
}
