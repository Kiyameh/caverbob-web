import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const {name, email, subject, message} = await request.json()

    // Verificar variables de entorno
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Configuración de correo electrónico incompleta')
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Verificar la conexión
    await transporter.verify()

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'kiyameh@outlook.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({success: true})
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json(
      {error: 'Error sending message: ' + (error as Error).message},
      {status: 500}
    )
  }
}
