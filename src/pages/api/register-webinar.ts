import type { NextApiRequest, NextApiResponse } from 'next'

type RegistrationData = {
  name: string
  email: string
  company?: string
  eventDetails: {
    title: string
    date: string
    startTime: string
    endTime: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const data: RegistrationData = req.body

    // Here you would typically store this in your database
    console.log('New registration:', data)

    // For now, just return success
    return res.status(200).json({ 
      success: true,
      message: 'Registration successful',
      data: {
        name: data.name,
        email: data.email,
        eventDetails: data.eventDetails
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 