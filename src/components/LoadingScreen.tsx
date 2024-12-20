import { motion } from 'framer-motion'
import { useEffect } from 'react'

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="w-[300px] h-[300px] flex items-center justify-center p-4"
      >
        <img
          src="/Equihome Logo.png"
          alt="Equihome Partners"
          className="w-full h-full object-contain"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen 