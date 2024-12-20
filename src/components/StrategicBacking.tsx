import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const StrategicBacking = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="bg-[#0B1121] py-24 relative overflow-hidden">
      {/* Dark teal background for Strategic Partners */}
      <div className="absolute inset-0 bg-[#1A2F3A] opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Strategic Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Strategic Partners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg">
              <img src="/rea_logo.png" alt="REA Group" className="h-14 mb-8" />
              <p className="text-gray-600 text-lg">
                Market credibility and extensive property data access
              </p>
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg">
              <img src="/proptrack_logo.png" alt="PropTrack" className="h-14 mb-8" />
              <p className="text-gray-600 text-lg">
                AI-powered property valuation and market analytics
              </p>
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center shadow-lg">
              <img src="/mortgagechoice_logo.png" alt="Mortgage Choice" className="h-14 mb-8" />
              <p className="text-gray-600 text-lg">
                Nationwide distribution network and broker relationships
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sovereign Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1E1E2E]/90 backdrop-blur-sm rounded-3xl p-16"
        >
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Backed by Leading Sovereign Wealth Fund
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#252538] rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">$500M</div>
              <div className="text-purple-300 text-lg">Initial commitment</div>
            </div>

            <div className="bg-[#252538] rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">Future</div>
              <div className="text-purple-300 text-lg">Expansion potential</div>
            </div>

            <div className="bg-[#252538] rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">Global</div>
              <div className="text-purple-300 text-lg">Validation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StrategicBacking
