import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'
import * as nodemailer from 'nodemailer'
import connectToDatabase from './server/db'
import AccessRequest from './server/models/AccessRequest'

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

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(express.json())

// Request logging middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  console.log('Request headers:', req.headers)
  next()
})

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  console.log('Health check request received')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// OpenAI Chat endpoint
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
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
app.post('/api/schedule-call', async (req: express.Request, res: express.Response) => {
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

// Access Request endpoint
app.post('/api/request-access', async (req: express.Request, res: express.Response) => {
  const { name, email, requestType } = req.body

  try {
    // Connect to MongoDB
    await connectToDatabase()

    // Create new access request in MongoDB
    const accessRequest = new AccessRequest({
      name,
      email,
      requestType,
      status: 'pending',
      timestamp: new Date()
    })

    // Save to database
    await accessRequest.save()

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'sujay@equihome.com.au', // Admin email
      subject: 'New Deal Room Access Request',
      html: `
        <h2>New Deal Room Access Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Request Type:</strong> ${requestType}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <br>
        <p>To grant access, please log in to the admin dashboard.</p>
      `
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Access Request Confirmation - Equihome Partners',
      html: `
        <h2>Thank you for requesting access to the Equihome Deal Room</h2>
        <p>We have received your request for access to our exclusive deal room.</p>
        <p>Our team will review your request and grant access shortly.</p>
        <p>You will receive an email notification when access is granted.</p>
        <br>
        <p>Best regards,</p>
        <p>Equihome Partners Team</p>
      `
    })

    res.status(200).json({ message: 'Access request sent successfully', requestId: accessRequest._id })
  } catch (error) {
    console.error('Error processing access request:', error)
    res.status(500).json({ message: 'Failed to process access request' })
  }
})

// Get all access requests (admin only)
app.get('/api/access-requests', async (req: express.Request, res: express.Response) => {
  try {
    // Connect to MongoDB
    await connectToDatabase()

    // Get all access requests
    const requests = await AccessRequest.find().sort({ timestamp: -1 })

    res.status(200).json(requests)
  } catch (error) {
    console.error('Error fetching access requests:', error)
    res.status(500).json({ message: 'Failed to fetch access requests' })
  }
})

// Update access request status (admin only)
app.put('/api/access-requests/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params
  const { status, adminEmail } = req.body

  try {
    // Connect to MongoDB
    await connectToDatabase()

    // Find the request
    const request = await AccessRequest.findById(id)

    if (!request) {
      return res.status(404).json({ message: 'Access request not found' })
    }

    // Update status
    request.status = status

    if (status === 'approved') {
      request.approvedAt = new Date()
      request.approvedBy = adminEmail || 'admin'

      // Send approval email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Deal Room Access Approved - Equihome Partners',
        html: `
          <h2>Your Access Request Has Been Approved</h2>
          <p>We're pleased to inform you that your request for access to the Equihome Deal Room has been approved.</p>
          <p>You can now access the Deal Room by logging in to your account.</p>
          <br>
          <p>Best regards,</p>
          <p>Equihome Partners Team</p>
        `
      })
    } else if (status === 'denied') {
      // Send denial email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Deal Room Access Request - Equihome Partners',
        html: `
          <h2>Regarding Your Access Request</h2>
          <p>Thank you for your interest in accessing the Equihome Deal Room.</p>
          <p>After careful consideration, we are unable to grant access at this time.</p>
          <p>If you have any questions, please contact our team directly.</p>
          <br>
          <p>Best regards,</p>
          <p>Equihome Partners Team</p>
        `
      })
    }

    // Save changes
    await request.save()

    res.status(200).json({ message: `Access request ${status}`, request })
  } catch (error) {
    console.error('Error updating access request:', error)
    res.status(500).json({ message: 'Failed to update access request' })
  }
})

// Check if user has access to a specific resource
app.get('/api/check-access', async (req: express.Request, res: express.Response) => {
  const { email, resourceType } = req.query

  if (!email || !resourceType) {
    return res.status(400).json({ message: 'Email and resourceType are required' })
  }

  try {
    // Connect to MongoDB
    await connectToDatabase()

    // Check if user has an approved access request for this resource
    const request = await AccessRequest.findOne({
      email: email,
      requestType: resourceType,
      status: 'approved'
    })

    if (request) {
      res.status(200).json({ hasAccess: true, since: request.approvedAt })
    } else {
      res.status(200).json({ hasAccess: false })
    }
  } catch (error) {
    console.error('Error checking access:', error)
    res.status(500).json({ message: 'Failed to check access' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing')
})