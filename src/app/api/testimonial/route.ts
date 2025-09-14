import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, country, message } = body

    // Validación básica
    if (!name || !email || !country || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const formData = new FormData()
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY!)
    formData.append('subject', 'New testimonial')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('country', country)
    formData.append('date', new Date().toISOString().split('T')[0])
    formData.append('message', message)

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Testimonial submitted successfully',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Testimonial submission failed',
          error: result,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Testimonial form error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
