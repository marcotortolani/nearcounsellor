// src/app/api/testimonials/route.ts
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

    // Verificar que el access key exista
    const accessKey = process.env.WEB3FORMS_TESTIMONIALS_ACCESS_KEY
    if (!accessKey) {
      console.error('WEB3FORMS_TESTIMONIALS_ACCESS_KEY is not defined')
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      )
    }

    const payload = {
      access_key: accessKey,
      subject: 'New testimonial',
      name: name,
      email: email,
      country: country,
      date: new Date().toISOString().split('T')[0],
      message: message,
    }

    // Headers adicionales para evitar el bloqueo de Cloudflare
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Origin: request.headers.get('origin') || 'http://localhost:9002',
        Referer: request.headers.get('referer') || 'http://localhost:9002',
      },
      body: JSON.stringify(payload),
    })

    console.log('Web3Forms status:', response.status)

    const contentType = response.headers.get('content-type')

    if (!contentType?.includes('application/json')) {
      const text = await response.text()
      console.error('Received non-JSON response. Status:', response.status)
      console.error('First 500 chars:', text.substring(0, 500))

      return NextResponse.json(
        {
          success: false,
          message: 'Web3Forms API error - Cloudflare challenge',
        },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Web3Forms response:', result)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Testimonial submitted successfully',
      })
    } else {
      console.error('Web3Forms error:', result)
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
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
// // src/app/api/testimonials/route.ts
// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { name, email, country, message } = body

//     // Validación básica
//     if (!name || !email || !country || !message) {
//       return NextResponse.json(
//         { success: false, message: 'Missing required fields' },
//         { status: 400 }
//       )
//     }

//     // Enviar como JSON en lugar de FormData
//     const response = await fetch('https://api.web3forms.com/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         access_key: process.env.WEB3FORMS_TESTIMONIALS_ACCESS_KEY,
//         subject: 'New testimonial',
//         name: name,
//         email: email,
//         country: country,
//         date: new Date().toISOString().split('T')[0],
//         message: message,
//       }),
//     })

//     const result = await response.json()

//     console.log('Web3Forms response:', result) // Para debugging

//     if (result.success) {
//       return NextResponse.json({
//         success: true,
//         message: 'Testimonial submitted successfully',
//       })
//     } else {
//       console.error('Web3Forms error:', result)
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Testimonial submission failed',
//           error: result,
//         },
//         { status: 400 }
//       )
//     }
//   } catch (error) {
//     console.error('Testimonial form error:', error)
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Internal server error',
//         error: String(error),
//       },
//       { status: 500 }
//     )
//   }
// }
