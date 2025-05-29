import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const {reporterName, caveName, newInfo, dataSource} = data

    // Verificar variables de entorno
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Configuración de correo electrónico incompleta')
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Verificar la conexión
    await transporter.verify()

    // Crear el contenido del correo
    const mailOptions = {
      from: process.env.GMAIL_USER,
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
      {error: 'Error al procesar el reporte: ' + (error as Error).message},
      {status: 500}
    )
  }
}
