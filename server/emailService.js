
const { Resend } = require('resend')

// Validate required environment variables
const requiredEnv = [
  'RESEND_API_KEY',
  'RESEND_TEST_TO',
]

for (const key of requiredEnv) {
  const value = process.env[key]

  if (!value || !value.trim()) {
    throw new Error(`Missing or invalid environment variable: ${key}`)
  }
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Testing sender (no custom domain required)
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  'VARKOD Website <onboarding@resend.dev>'

// Send contact enquiry
async function sendContactEmail({ name, email, subject, message }) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,

    // During testing, this must be your Resend account email
    to: [process.env.RESEND_TEST_TO],

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

  if (error) {
    console.error('Resend email error:', error.message)
    throw new Error('Unable to send contact email.')
  }

  console.log('Contact email sent successfully:', data.id)

  return data
}

// Validate Resend configuration
async function verifyEmailConnection() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing.')
  }

  if (!process.env.RESEND_TEST_TO) {
    throw new Error('RESEND_TEST_TO is missing.')
  }

  return true
}

module.exports = {
  sendContactEmail,
  verifyEmailConnection,
}
