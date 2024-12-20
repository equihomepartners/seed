import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SovereignFund = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen bg-[#0B1121] relative overflow-hidden flex items-center">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Backed by Leading Sovereign Wealth Fund
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#252538] rounded-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl lg:text-7xl font-bold text-purple-400 mb-4">$500M</div>
              <div className="text-purple-300 text-xl">Initial commitment</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-[#252538] rounded-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl lg:text-7xl font-bold text-purple-400 mb-4">Future</div>
              <div className="text-purple-300 text-xl">Expansion potential</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-[#252538] rounded-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl lg:text-7xl font-bold text-purple-400 mb-4">Global</div>
              <div className="text-purple-300 text-xl">Validation</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SovereignFund 