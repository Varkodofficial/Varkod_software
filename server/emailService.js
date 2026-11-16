
const nodemailer = require('nodemailer')

// Required environment variables
const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_EMAIL',
]

// Validate environment configuration
for (const key of requiredEnv) {
  const value = process.env[key]

  if (
    !value ||
    !value.trim() ||
    value === 'YOUR_GMAIL_APP_PASSWORD'
  ) {
    throw new Error(`Missing or invalid environment variable: ${key}`)
  }
}

// Validate SMTP port
const port = Number(process.env.SMTP_PORT)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Invalid SMTP_PORT configuration.')
}

// Validate SMTP security setting
if (!['true', 'false'].includes(process.env.SMTP_SECURE)) {
  throw new Error('Invalid SMTP_SECURE configuration.')
}

// Validate Gmail SMTP configuration
if (
  process.env.SMTP_HOST === 'smtp.gmail.com' &&
  (port !== 465 || process.env.SMTP_SECURE !== 'true')
) {
  throw new Error('Invalid Gmail SMTP security configuration.')
}

// Create secure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE === 'true',

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  tls: {
    rejectUnauthorized: true,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
})

// Send contact enquiry
async function sendContactEmail({ name, email, subject, message }) {
  return transporter.sendMail({
    from: {
      name: 'VARKOD Website',
      address: process.env.SMTP_USER,
    },

    to: process.env.CONTACT_EMAIL,

    replyTo: email,

    subject: `Website enquiry: ${subject}`,

    text: [
      'New enquiry received through the VARKOD website.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  })
}

// Verify SMTP connection
async function verifyEmailConnection() {
  return transporter.verify()
}

module.exports = {
  sendContactEmail,
  verifyEmailConnection,
}
