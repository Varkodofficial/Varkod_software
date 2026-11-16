
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const { sendContactEmail, verifyEmailConnection } = require('./emailService')

const app = express()

const PORT = Number(process.env.PORT) || 5000

app.disable('x-powered-by')

app.use(helmet())

// Allow requests only from the configured frontend
const allowedOrigin =
  process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
)

// Limit incoming request body size
app.use(express.json({ limit: '10kb' }))

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
})

app.use('/api/', apiLimiter)

// Additional protection for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiries. Please try again later.',
  },
})

// Backend health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'VARKOD backend is running!',
  })
})

// Contact form API
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}

    // Validate required fields
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanSubject = subject.trim()
    const cleanMessage = message.trim()

    // Validate empty fields and maximum lengths
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      })
    }

    if (
      cleanName.length > 80 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 120 ||
      cleanMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: 'One or more fields exceed the allowed length.',
      })
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailPattern.test(cleanEmail) ||
      /[\r\n]/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
    }

    // Prevent control characters in name and subject
    if (/[\r\n]/.test(cleanName) || /[\r\n]/.test(cleanSubject)) {
      return res.status(400).json({
        success: false,
        message: 'Please check your name and subject.',
      })
    }

    // Send enquiry through SMTP
    await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    })

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been sent successfully.',
    })
  } catch (error) {
    console.error('Contact email delivery failed:', error.message)

    return res.status(502).json({
      success: false,
      message: 'Unable to send your enquiry right now. Please try again later.',
    })
  }
})

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found.',
  })
})

// Central error handler
app.use((err, req, res, next) => {
  console.error('Backend error:', err.message)

  if (res.headersSent) {
    return next(err)
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request is too large.',
    })
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request.',
    })
  }

  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred.',
  })
})

// Start backend
app.listen(PORT, '0.0.0.0', () => {
  console.log(`VARKOD backend running on port ${PORT}`)

  // Verify Resend configuration
  verifyEmailConnection()
    .then(() => {
      console.log('Resend configuration verified successfully.')
    })
    .catch((error) => {
      console.error(
        'Resend configuration verification failed:',
        error.message
      )
    })
})