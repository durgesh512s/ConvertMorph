/**
 * Newsletter Management Utilities
 * Provides functions for managing newsletter subscriptions and analytics
 */

export interface NewsletterSubscriber {
  email: string
  timestamp: string
  userAgent?: string
  ip?: string
  source?: string
}

export interface NewsletterStats {
  totalSubscribers: number
  recentSubscriptions: number
  topSources: Array<{ source: string; count: number }>
  subscriptionTrend: Array<{ date: string; count: number }>
}

/**
 * Validates email address format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Sanitizes email address
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Checks if email domain is from a disposable email service
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'yopmail.com',
    'temp-mail.org',
    'throwaway.email'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? disposableDomains.includes(domain) : false
}

/**
 * Generates a welcome email template
 */
export function generateWelcomeEmail(email: string, customization?: {
  companyName?: string
  logoUrl?: string
  unsubscribeUrl?: string
}): string {
  const {
    companyName = 'ConvertMorph',
    logoUrl = 'https://convertmorph.com/logo/logo-full.svg',
    unsubscribeUrl = 'mailto:support@convertmorph.com?subject=Unsubscribe'
  } = customization || {}

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${companyName} Newsletter</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f8fafc;
        }
        .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 40px 30px; }
        .content h2 { color: #1f2937; margin-top: 0; font-size: 24px; }
        .benefits { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .benefits ul { margin: 0; padding-left: 20px; }
        .benefits li { margin: 8px 0; color: #475569; }
        .cta-button { 
            display: inline-block; 
            background: #3b82f6; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 20px 0; 
            font-weight: 600;
            transition: background-color 0.2s;
        }
        .cta-button:hover { background: #2563eb; }
        .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 30px; 
            border-top: 1px solid #e2e8f0; 
            color: #64748b; 
            font-size: 14px; 
        }
        .footer a { color: #3b82f6; text-decoration: none; }
        .social-links { margin: 20px 0; }
        .social-links a { 
            display: inline-block; 
            margin: 0 10px; 
            color: #64748b; 
            text-decoration: none; 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to ${companyName}!</h1>
            <p>Thank you for subscribing to our newsletter</p>
        </div>
        <div class="content">
            <h2>You're all set!</h2>
            <p>Hi there!</p>
            <p>Welcome to the ${companyName} community! We're excited to have you on board and can't wait to share valuable content with you.</p>
            
            <div class="benefits">
                <h3>What you'll receive:</h3>
                <ul>
                    <li>📄 Latest PDF tips and tricks</li>
                    <li>🛠️ New tool announcements and updates</li>
                    <li>📚 Step-by-step tutorials and guides</li>
                    <li>💡 Best practices for document management</li>
                    <li>🎯 Exclusive tips from our experts</li>
                </ul>
            </div>
            
            <p>We promise to keep your inbox valuable and never spam you. Quality over quantity is our motto!</p>
            
            <a href="https://convertmorph.com/blog" class="cta-button">Explore Our Blog</a>
            
            <p>Have questions or suggestions? Just reply to this email - we'd love to hear from you!</p>
        </div>
        <div class="footer">
            <p>This email was sent to <strong>${email}</strong></p>
            <div class="social-links">
                <a href="https://convertmorph.com">Website</a> |
                <a href="https://convertmorph.com/blog">Blog</a> |
                <a href="https://convertmorph.com/contact">Contact</a>
            </div>
            <p>${companyName} - Free Online PDF Tools</p>
            <p><a href="${unsubscribeUrl}">Unsubscribe</a> | <a href="https://convertmorph.com/privacy">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
  `
}

/**
 * Generates admin notification email template
 */
export function generateAdminNotification(subscription: NewsletterSubscriber): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Newsletter Subscription</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .header { 
            background: #10b981; 
            color: white; 
            padding: 20px; 
            text-align: center; 
        }
        .content { padding: 20px; background: #f0fdf4; }
        .info { 
            background: white; 
            padding: 15px; 
            border-radius: 6px; 
            margin: 10px 0; 
            border-left: 4px solid #10b981;
        }
        .label { font-weight: 600; color: #065f46; }
        .value { color: #374151; margin-top: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📧 New Newsletter Subscription</h2>
        </div>
        <div class="content">
            <div class="info">
                <div class="label">Email Address</div>
                <div class="value">${subscription.email}</div>
            </div>
            <div class="info">
                <div class="label">Subscription Time</div>
                <div class="value">${new Date(subscription.timestamp).toLocaleString()}</div>
            </div>
            ${subscription.source ? `
            <div class="info">
                <div class="label">Source</div>
                <div class="value">${subscription.source}</div>
            </div>
            ` : ''}
            ${subscription.userAgent ? `
            <div class="info">
                <div class="label">User Agent</div>
                <div class="value">${subscription.userAgent}</div>
            </div>
            ` : ''}
            ${subscription.ip ? `
            <div class="info">
                <div class="label">IP Address</div>
                <div class="value">${subscription.ip}</div>
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>
  `
}

/**
 * Rate limiting utility for newsletter subscriptions
 */
export class NewsletterRateLimit {
  private attempts: Map<string, number[]> = new Map()
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts = 3, windowMs = 15 * 60 * 1000) { // 3 attempts per 15 minutes
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    
    // Update the attempts array
    this.attempts.set(identifier, recentAttempts)
    
    return recentAttempts.length >= this.maxAttempts
  }

  recordAttempt(identifier: string): void {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    attempts.push(now)
    this.attempts.set(identifier, attempts)
  }

  getRemainingAttempts(identifier: string): number {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    const recentAttempts = attempts.filter(time => now - time < this.windowMs)
    return Math.max(0, this.maxAttempts - recentAttempts.length)
  }
}

/**
 * Newsletter analytics utilities
 */
export class NewsletterAnalytics {
  static generateDailyReport(subscribers: NewsletterSubscriber[]): NewsletterStats {
    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    const recentSubscriptions = subscribers.filter(
      sub => new Date(sub.timestamp) >= last30Days
    )

    const sourceCount = new Map<string, number>()
    subscribers.forEach(sub => {
      const source = sub.source || 'direct'
      sourceCount.set(source, (sourceCount.get(source) || 0) + 1)
    })

    const topSources = Array.from(sourceCount.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Generate subscription trend for last 7 days
    const subscriptionTrend: Array<{ date: string; count: number }> = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      const count = subscribers.filter(sub => 
        sub.timestamp.startsWith(dateStr)
      ).length
      subscriptionTrend.push({ date: dateStr, count })
    }

    return {
      totalSubscribers: subscribers.length,
      recentSubscriptions: recentSubscriptions.length,
      topSources,
      subscriptionTrend
    }
  }
}
