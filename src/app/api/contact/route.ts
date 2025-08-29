import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail SMTP
    // For production, you should use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    })

    // Format the subject based on dropdown selection
    const subjectMap: { [key: string]: string } = {
      'support': 'Technical Support',
      'feature': 'Feature Request',
      'bug': 'Bug Report',
      'business': 'Business Inquiry',
      'other': 'Other'
    }

    const formattedSubject = subject ? subjectMap[subject] || subject : 'Contact Form Submission'

    // Create well-formatted email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
        .footer { background-color: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e293b; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; border: 1px solid #d1d5db; }
        .message-content { min-height: 100px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>ConvertMorph - PDF Tools</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${formattedSubject}</div>
            </div>
            
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value message-content">${message}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from the ConvertMorph contact form</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
    `

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'durgesh512s@gmail.com',
      subject: `[ConvertMorph] ${formattedSubject} - ${name || 'Anonymous'}`,
      html: emailContent,
      replyTo: email
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
