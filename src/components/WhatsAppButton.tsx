'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const phoneNumber = '64223490110'

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-0 lg:bottom-6 right-2 xl:right-10 md:-translate-x-6 xl:translate-x-0 z-50 pb-4">
      <div className="sticky bottom-6 right-0">
        <button
          onClick={handleClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="WhatsApp Contact Button"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}
