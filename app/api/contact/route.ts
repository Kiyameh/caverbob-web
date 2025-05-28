import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const {name, email, subject, message} = await request.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
    return NextResponse.json({error: 'Error sending message'}, {status: 500})
  }
}
