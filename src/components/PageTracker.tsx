import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const PageTracker = () => {
  const location = useLocation()

  useEffect(() => {
    const startTime = Date.now()
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('userEmail')

    if (userId && email) {
      // Track page view on mount
      axios.post('http://209.38.87.210:3002/api/track/activity', {
        userId,
        email,
        page: location.pathname.substring(1) || 'home'
      })

      // Track duration on unmount
      return () => {
        const duration = Math.floor((Date.now() - startTime) / 1000)
        axios.post('http://209.38.87.210:3002/api/track/activity', {
          userId,
          email,
          page: location.pathname.substring(1) || 'home',
          duration
        })
      }
    }
  }, [location.pathname])

  return null
}

export default PageTracker 