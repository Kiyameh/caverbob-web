import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const {reporterName, caveName, newInfo, dataSource} = data

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Crear el contenido del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kiyameh@outlook.com',
      subject: `Nuevo Reporte de Información: ${caveName}`,
      html: `
        <h2>Nuevo Reporte de Información</h2>
        <p><strong>Reportante:</strong> ${reporterName}</p>
        <p><strong>Cueva:</strong> ${caveName}</p>
        <p><strong>Nueva Información:</strong></p>
        <p>${newInfo}</p>
        <p><strong>Fuente de los Datos:</strong> ${dataSource}</p>
      `,
    }

    // Enviar el correo
    await transporter.sendMail(mailOptions)

    return NextResponse.json({success: true})
  } catch (error) {
    console.error('Error al procesar el reporte:', error)
    return NextResponse.json(
      {error: 'Error al procesar el reporte'},
      {status: 500}
    )
  }
}
