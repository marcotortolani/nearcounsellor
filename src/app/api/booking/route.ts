import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const formData = new FormData()
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY!)
    formData.append('subject', 'Booking a session')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully',
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Form submission failed', error: result },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
