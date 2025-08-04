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

    // Only log in development mode
    if (import.meta.env.DEV) {
      console.log('Syncing progress...', { userId, email, progress })
    }

    try {
      // Try to track activity via API endpoint first
      try {
        if (import.meta.env.DEV) {
          console.log('Trying API endpoint for activity tracking...')
        }

        const response = await fetch('/api/track-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            email,
            page: location.pathname.substring(1) || 'home',
            action: 'view'
          })
        })

        const result = await response.json()
        
        if (!response.ok || !result.success) {
          throw new Error(`API tracking failed: ${result.error || result.message || 'Unknown error'}`)
        }

        if (import.meta.env.DEV) {
          console.log('✅ Activity tracking via API successful:', result)
        }
      } catch (apiError) {
        console.error('❌ API endpoint failed:', apiError)
        
        // If API endpoint fails, try the direct endpoint
        if (import.meta.env.DEV) {
          console.log('Trying direct endpoint as fallback...')
        }

        try {
          const fallbackResponse = await axios.post(`${API_URL}/track/activity`, {
            userId,
            email,
            page: location.pathname.substring(1) || 'home'
          })

          if (import.meta.env.DEV) {
            console.log('✅ Activity tracking via direct endpoint successful:', fallbackResponse.data)
          }
        } catch (directError) {
          console.error('❌ Both tracking endpoints failed:', {
            apiError: apiError instanceof Error ? apiError.message : apiError,
            directError: directError instanceof Error ? directError.message : directError
          })
          
          // Store failure info for debugging
          localStorage.setItem('trackingErrors', JSON.stringify({
            timestamp: new Date().toISOString(),
            apiError: apiError instanceof Error ? apiError.message : String(apiError),
            directError: directError instanceof Error ? directError.message : String(directError),
            userId,
            email,
            page: location.pathname
          }))
        }
      }

      // Update progress if user is logged in
      if (email !== 'anonymous') {
        try {
          if (import.meta.env.DEV) {
            console.log('Updating user progress...')
          }

          await axios.post(`${API_URL}/track/progress`, {
            userId,
            progress
          })

          if (import.meta.env.DEV) {
            console.log('Progress update successful')
          }
        } catch (progressError) {
          // Silently fail if progress update fails
          if (import.meta.env.DEV) {
            console.log('Progress update failed, continuing execution')
          }
        }
      }
    } catch (error) {
      // Silently fail - don't let tracking errors affect the user experience
      if (import.meta.env.DEV) {
        console.log('Activity tracking failed, but continuing execution')
      }
    }
  }

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('PageTracker mounted/updated', { pathname: location.pathname })
    }

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

    if (import.meta.env.DEV) {
      console.log('Page view stored in localStorage')
    }

    // Sync with backend - but don't block on it
    syncProgress().catch(() => {
      if (import.meta.env.DEV) {
        console.log('Error in syncProgress, but continuing execution')
      }
    })

    // Track duration on unmount
    return () => {
      if (import.meta.env.DEV) {
        console.log('PageTracker unmounting')
      }

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

      if (import.meta.env.DEV) {
        console.log('Page duration stored in localStorage')
      }

      // Sync again on unmount - but don't block on it
      syncProgress().catch(() => {
        if (import.meta.env.DEV) {
          console.log('Error in syncProgress on unmount, but continuing execution')
        }
      })
    }
  }, [location.pathname])

  return null
}

export default PageTracker