import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaRocket, FaChartLine, FaClock } from 'react-icons/fa'

const Partnerships = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const partners = [
    {
      name: "REA Group",
      description: "Australia's leading property platform",
      benefit: "Market credibility and extensive property data access",
      logo: "/rea_logo.png"
    },
    {
      name: "PropTrack",
      description: "Advanced property analytics platform",
      benefit: "AI-powered property valuation and market analytics",
      logo: "/proptrack_logo.png"
    },
    {
      name: "Mortgage Choice",
      description: "Leading mortgage broker network",
      benefit: "Nationwide distribution network and broker relationships",
      logo: "/mortgagechoice_logo.png"
    }
  ]

  return (
    <section ref={ref} id="partners" className="min-h-screen py-32 bg-[#0B1121]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Operational Investment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-40"
        >
          <h2 className="text-6xl font-bold mb-6">$5M Operational Investment</h2>
          <p className="text-2xl text-gray-300 mb-24">
            Join us in building the future of home equity investment
          </p>

          <h3 className="text-4xl font-bold mb-16">Investment Highlights</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-[#111827] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="bg-blue-500/20 p-3 rounded-xl mb-6">
                <FaRocket className="text-3xl text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-blue-400 mb-4">8-26x+</div>
              <div className="text-xl font-semibold mb-3">Target Return</div>
              <p className="text-gray-400 text-sm">
                Based on conservative modeling with $500M fund
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#111827] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="bg-blue-500/10 p-4 rounded-xl mb-6">
                <FaChartLine className="text-blue-500 text-3xl" />
              </div>
              <div className="text-4xl font-bold text-blue-500 mb-4">125% YoY</div>
              <div className="text-xl font-semibold mb-3">Revenue Growth</div>
              <p className="text-gray-400 text-sm">
                Projected annual growth rate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#111827] rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <div className="bg-blue-500/10 p-4 rounded-xl mb-6">
                <FaClock className="text-blue-500 text-3xl" />
              </div>
              <div className="text-4xl font-bold text-blue-500 mb-4">5-7 Years</div>
              <div className="text-xl font-semibold mb-3">Exit Timeline</div>
              <p className="text-gray-400 text-sm">
                Strategic sale or IPO
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Strategic Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-40"
        >
          <h2 className="text-5xl font-bold mb-6">Strategic Partners</h2>
          <p className="text-xl text-gray-300 mb-24">
            Industry leaders backing our vision
          </p>

          <div className="flex flex-wrap justify-center items-stretch gap-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center max-w-sm"
              >
                <div className="bg-white rounded-2xl p-8 mb-8 w-full flex items-center justify-center h-32">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3">{partner.name}</h3>
                <p className="text-gray-400 mb-4">{partner.description}</p>
                <p className="text-blue-400">{partner.benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sovereign Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Sovereign Fund</h2>
          <p className="text-xl text-gray-300 mb-16">
            Institutional backing from a leading sovereign wealth fund
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#111827] rounded-2xl p-12 flex flex-col items-center justify-center"
            >
              <div className="text-7xl font-bold text-blue-500 mb-4">$500M</div>
              <div className="text-2xl text-gray-300">Fund Commitment</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#111827] rounded-2xl p-12 flex flex-col items-center justify-center"
            >
              <div className="text-4xl font-bold text-gray-200 mb-4">Strategic Partnership</div>
              <div className="text-xl text-gray-400">Long-term institutional backing and market expertise</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Partnerships