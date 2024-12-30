import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const SplashScreen = () => {
  const navigate = useNavigate()
  const [hasAgreed, setHasAgreed] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    
    if (!email) {
      setEmailError('Please enter your email')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if (!hasAgreed) {
      setEmailError('Please agree to the terms')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Generate session ID
      const userId = generateSessionId()

      // Store user data
      localStorage.setItem('sessionActive', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userId', userId)
      localStorage.setItem('signInTime', new Date().toISOString())

      // If it's admin email, handle admin authentication
      if (email.toLowerCase() === 'sujay@equihome.com.au') {
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminEmail', email)
        navigate('/admin')
      } else {
        // Handle regular user
        window.location.reload()
      }
    } catch (error) {
      console.error('Error during sign-in:', error)
      setEmailError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/sydney_image.jpeg"
          alt="Sydney"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.3) blur(1px)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {/* Large stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        {/* Small stars */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.2px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center w-full max-w-4xl mx-auto space-y-8"
        >
          {/* Main Text */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200">
              Equihome's Seed Round Investment Opportunity
            </span>
          </h1>

          {/* Email Input and Disclaimer */}
          <div className="max-w-md mx-auto space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="Enter your email to continue"
                className="w-full px-4 py-3 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {emailError && (
                <p className="text-red-400 text-sm">{emailError}</p>
              )}
            </div>

            {/* Disclaimer Checkbox */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/5">
              <label className="flex items-start gap-2 text-left cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-500 text-blue-500 focus:ring-blue-500 transition-colors"
                />
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                  I acknowledge that all information presented is proprietary to Equihome Partners and cannot be shared without explicit written consent.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!hasAgreed || isSubmitting}
              className={`w-full px-10 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                hasAgreed && !isSubmitting
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={hasAgreed && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={hasAgreed && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? 'Processing...' : 'Enter'}
            </motion.button>
          </div>
        </motion.div>

        {/* Copyright Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-3 text-center text-xs text-gray-400"
        >
          © 2024 Equihome Partners. All rights reserved.
          <br />
          Confidential and Proprietary.
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SplashScreen 