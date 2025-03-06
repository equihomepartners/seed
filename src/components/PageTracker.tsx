import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const API_URL = import.meta.env.VITE_API_URL || 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api'

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

    console.log('Syncing progress...', { userId, email, progress })

    try {
      // Track activity
      console.log('Sending activity tracking request...')
      await axios.post(`${API_URL}/track/activity`, {
        userId,
        email,
        page: location.pathname.substring(1) || 'home'
      })
      console.log('Activity tracking successful')

      // Update progress if user is logged in
      if (email !== 'anonymous') {
        console.log('Updating user progress...')
        await axios.post(`${API_URL}/track/progress`, {
          userId,
          progress
        })
        console.log('Progress update successful')
      }
    } catch (error) {
      console.error('Error syncing progress:', error)
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        })
      }
    }
  }

  useEffect(() => {
    console.log('PageTracker mounted/updated', { pathname: location.pathname })
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
    console.log('Page view stored in localStorage')

    // Sync with backend
    syncProgress()

    // Track duration on unmount
    return () => {
      console.log('PageTracker unmounting')
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
      console.log('Page duration stored in localStorage')
      
      // Sync again on unmount
      syncProgress()
    }
  }, [location.pathname])

  return null
}

export default PageTracker 