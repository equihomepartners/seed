import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const API_URL = 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api'

const PageTracker = () => {
  const location = useLocation()

  // Function to get or create user ID
  const getOrCreateUserId = () => {
    let userId = localStorage.getItem('userId')
    if (!userId) {
      userId = uuidv4()
      localStorage.setItem('userId', userId)
    }
    return userId
  }

  // Function to sync progress with backend
  const syncProgress = async () => {
    const userId = getOrCreateUserId()
    const email = localStorage.getItem('userEmail') || 'anonymous'
    const progress = JSON.parse(localStorage.getItem('investorProgress') || '{}')

    try {
      // Track activity
      await axios.post(`${API_URL}/track/activity`, {
        userId,
        email,
        page: location.pathname.substring(1) || 'home'
      })

      // Update progress if user is logged in
      if (email !== 'anonymous') {
        await axios.post(`${API_URL}/track/progress`, {
          userId,
          progress
        })
      }
    } catch (error) {
      console.error('Error syncing progress:', error)
    }
  }

  useEffect(() => {
    const startTime = Date.now()
    
    // Track page view in localStorage
    const views = JSON.parse(localStorage.getItem('pageViews') || '[]')
    views.push({
      userId: getOrCreateUserId(),
      email: localStorage.getItem('userEmail') || 'anonymous',
      page: location.pathname.substring(1) || 'home',
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('pageViews', JSON.stringify(views))

    // Sync with backend
    syncProgress()

    // Track duration on unmount
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      const durations = JSON.parse(localStorage.getItem('pageDurations') || '[]')
      durations.push({
        userId: getOrCreateUserId(),
        email: localStorage.getItem('userEmail') || 'anonymous',
        page: location.pathname.substring(1) || 'home',
        duration,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('pageDurations', JSON.stringify(durations))
      
      // Sync again on unmount
      syncProgress()
    }
  }, [location.pathname])

  return null
}

export default PageTracker 