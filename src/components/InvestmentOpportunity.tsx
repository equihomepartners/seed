import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChartLine, FaHandshake, FaMoneyBillWave, FaRocket } from 'react-icons/fa'

const InvestmentOpportunity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.8 }
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section ref={ref} id="investment-opportunity" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Investment Opportunity</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Early-stage equity investment in Australia's leading residential fund manager
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Investment Terms */}
          <motion.div variants={fadeInUp} className="fintech-card p-8">
            <div className="text-2xl font-bold text-sky-600 mb-8">Investment Terms</div>
            <div className="space-y-8">
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">SAFE Convertible</div>
                <div className="text-gray-600">$50,000 minimum investment</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">Direct Equity</div>
                <div className="text-gray-600">$250,000 minimum investment</div>
              </div>
            </div>
          </motion.div>

          {/* Exit Strategy */}
          <motion.div variants={fadeInUp} className="fintech-card p-8">
            <div className="text-2xl font-bold text-sky-600 mb-8">Exit Strategy</div>
            <div className="space-y-8">
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">Timeline</div>
                <div className="text-gray-600">5-7 year investment period</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">Target Value</div>
                <div className="text-gray-600">$600M+ company valuation</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 mb-2">Exit Options</div>
                <div className="text-gray-600">IPO or strategic acquisition</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center pt-12 border-t border-gray-200/50 max-w-3xl mx-auto col-span-1 md:col-span-2"
          >
            <div className="text-3xl font-bold text-sky-600 mb-4">
              Limited Investment Window
            </div>
            <div className="text-xl text-gray-700 mb-3">
              Early-stage opportunity with significant upside potential
            </div>
            <div className="text-gray-600">
              Future equity rounds will be at significantly higher valuations.<br/>
              This is the optimal entry point for investors seeking maximum returns.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InvestmentOpportunity 