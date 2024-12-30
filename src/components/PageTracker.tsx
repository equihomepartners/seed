import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageTracker = () => {
  const location = useLocation()

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
      }
    }
  }, [location.pathname])

  return null
}

export default PageTracker 