import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const StrategicBacking = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen bg-white relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-sky-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-sm font-medium text-sky-600">Partners</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Strategic Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Backed by industry leaders in property and finance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg border border-gray-200"
          >
            <img src="/rea_logo.png" alt="REA Group" className="h-14 mb-8" />
            <p className="text-gray-600 text-lg">
              Market credibility and extensive property data access
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg border border-gray-200"
          >
            <img src="/proptrack_logo.png" alt="PropTrack" className="h-14 mb-8" />
            <p className="text-gray-600 text-lg">
              AI-powered property valuation and market analytics
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg border border-gray-200"
          >
            <img src="/mortgagechoice_logo.png" alt="Mortgage Choice" className="h-14 mb-8" />
            <p className="text-gray-600 text-lg">
              Nationwide distribution network and broker relationships
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StrategicBacking
