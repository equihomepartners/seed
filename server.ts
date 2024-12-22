import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'
import * as nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

app.use(cors())
app.use(express.json())

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// OpenAI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received chat request:', req.body)
    const { messages } = req.body

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    console.log('OpenAI response:', completion.choices[0].message)
    res.json({
      message: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({
      error: 'Error processing your request'
    })
  }
})

// Email endpoint
app.post('/api/schedule-call', async (req, res) => {
  const { name, email, company, timePreference, message } = req.body

  try {
    // Send email to team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TEAM_EMAIL,
      subject: 'New Call Schedule Request',
      html: `
        <h2>New Call Schedule Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Preferred Time (Sydney):</strong> ${timePreference}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Call Request Confirmation - Equihome Partners',
      html: `
        <h2>Thank you for scheduling a call with Equihome Partners</h2>
        <p>We have received your request for a call during the following time:</p>
        <p><strong>${timePreference}</strong> (Sydney Time)</p>
        <p>Our team will reach out to you shortly to confirm the exact time for the call.</p>
        <br>
        <p>Best regards,</p>
        <p>Equihome Partners Team</p>
      `
    })

    res.status(200).json({ message: 'Request sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: 'Failed to send request' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing')
}) 