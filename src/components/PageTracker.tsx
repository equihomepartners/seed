import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api'

const PageTracker = () => {
  const location = useLocation()

  // Function to sync progress with backend
  const syncProgress = async () => {
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('userEmail')
    const progress = JSON.parse(localStorage.getItem('investorProgress') || '{}')

    if (userId && email) {
      try {
        // Track activity
        await axios.post(`${API_URL}/track/activity`, {
          userId,
          email,
          page: location.pathname.substring(1) || 'home'
        })

        // Update progress
        await axios.post(`${API_URL}/track/progress`, {
          userId,
          progress
        })
      } catch (error) {
        console.error('Error syncing progress:', error)
      }
    }
  }

  useEffect(() => {
    const startTime = Date.now()
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('userEmail')

    if (userId && email) {
      // Track page view in localStorage
      const views = JSON.parse(localStorage.getItem('pageViews') || '[]')
      views.push({
        userId,
        email,
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
          userId,
          email,
          page: location.pathname.substring(1) || 'home',
          duration,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('pageDurations', JSON.stringify(durations))
        
        // Sync again on unmount
        syncProgress()
      }
    }
  }, [location.pathname])

  return null
}

export default PageTracker 