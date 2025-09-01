import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface NewsletterSubscription {
  email: string
  timestamp: string
  userAgent?: string
  ip?: string
}

// In-memory storage for demo (in production, use a database)
const subscribers = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Always add to subscribers (allow multiple subscriptions)
    subscribers.add(email.toLowerCase())

    // Create subscription data
    const subscription: NewsletterSubscription = {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined
    }

    // Send confirmation email (optional)
    try {
      await sendConfirmationEmail(email)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the subscription if email sending fails
    }

    // Send notification to admin
    try {
      await sendAdminNotification(subscription)
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError)
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        email: email.toLowerCase()
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return subscription stats (for admin use)
  return NextResponse.json({
    totalSubscribers: subscribers.size,
    message: 'Newsletter API is running'
  })
}

async function sendConfirmationEmail(email: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured, skipping confirmation email')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ConvertMorph Newsletter</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Welcome to ConvertMorph!</h1>
        <p>Thank you for subscribing to our newsletter</p>
    </div>
    <div class="content">
        <h2>You're all set!</h2>
        <p>Hi there!</p>
        <p>Welcome to the ConvertMorph community! You'll now receive:</p>
        <ul>
            <li>📄 Latest PDF tips and tricks</li>
            <li>🛠️ New tool announcements</li>
            <li>📚 Step-by-step tutorials</li>
            <li>💡 Best practices for document management</li>
        </ul>
        <p>We promise to keep your inbox valuable and never spam you.</p>
        <a href="https://convertmorph.com/blog" class="button">Explore Our Blog</a>
    </div>
    <div class="footer">
        <p>This email was sent to ${email}</p>
        <p>ConvertMorph - Free Online PDF Tools</p>
        <p>You can unsubscribe at any time by replying to this email</p>
    </div>
</body>
</html>
  `

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🎉 Welcome to ConvertMorph Newsletter!',
    html: emailContent
  }

  await transporter.sendMail(mailOptions)
}

async function sendAdminNotification(subscription: NewsletterSubscription) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const adminEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Newsletter Subscription</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f0fdf4; padding: 20px; border-radius: 0 0 8px 8px; }
        .info { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h2>📧 New Newsletter Subscription</h2>
    </div>
    <div class="content">
        <div class="info">
            <strong>Email:</strong> ${subscription.email}
        </div>
        <div class="info">
            <strong>Timestamp:</strong> ${new Date(subscription.timestamp).toLocaleString()}
        </div>
        <div class="info">
            <strong>Total Subscribers:</strong> ${subscribers.size}
        </div>
        ${subscription.userAgent ? `<div class="info"><strong>User Agent:</strong> ${subscription.userAgent}</div>` : ''}
        ${subscription.ip ? `<div class="info"><strong>IP:</strong> ${subscription.ip}</div>` : ''}
    </div>
</body>
</html>
  `

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'durgesh512s@gmail.com',
    subject: `[ConvertMorph] New Newsletter Subscription - ${subscription.email}`,
    html: adminEmailContent
  }

  await transporter.sendMail(mailOptions)
}
