import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const InvestmentOpportunity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} id="investment-opportunity" className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-24"
        >
          {/* Header */}
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-7xl font-bold mb-4">Investment Opportunity</h2>
            <p className="text-xl text-gray-400 mb-6">
              Equihome Capital Group, Inc. | C-Corp US Based Company
            </p>
            <div className="text-lg text-gray-300">
              Join us in revolutionizing the $5.5T home equity market with a unique early-stage investment opportunity
            </div>
          </motion.div>

          {/* Investment Overview */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-x-24 gap-y-16 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-3">Investment Amount</div>
              <div className="text-5xl font-bold mb-2">$50K+</div>
              <div className="text-gray-400">Minimum Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-3">Target Return</div>
              <div className="text-5xl font-bold mb-2">8-26x+ ROI</div>
              <div className="text-gray-400">Projected Return</div>
            </div>
          </motion.div>

          {/* Investment Details */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-3 gap-20 max-w-4xl mx-auto pt-12 border-t border-gray-800/50"
          >
            {/* Investment Structure */}
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-8">Investment Structure</div>
              <div className="space-y-8">
                <div>
                  <div className="text-xl font-bold text-white mb-2">SAFE</div>
                  <div className="text-gray-400">Simple Agreement for Future Equity</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2">Convertible Note</div>
                  <div className="text-gray-400">Debt converting to equity</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2">Direct Equity</div>
                  <div className="text-gray-400">Immediate ownership stake</div>
                </div>
              </div>
            </div>

            {/* Exit Strategy */}
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-8">Exit Strategy</div>
              <div className="space-y-8">
                <div>
                  <div className="text-xl font-bold text-white mb-2">Timeline</div>
                  <div className="text-gray-400">5-7 Years</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2">Target Value</div>
                  <div className="text-gray-400">$600M+ (Conservative)</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2">Method</div>
                  <div className="text-gray-400">Strategic sale or IPO</div>
                </div>
              </div>
            </div>

            {/* Returns & Reporting */}
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-8">Returns & Reporting</div>
              <div className="space-y-8">
                <div>
                  <div className="text-xl font-bold text-white mb-2">Dividends</div>
                  <div className="text-gray-400">Performance-based returns from operational cashflows</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2">Updates</div>
                  <div className="text-gray-400">Quarterly financial reports and metrics</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            variants={fadeInUp}
            className="text-center pt-12 border-t border-gray-800/50 max-w-3xl mx-auto"
          >
            <div className="text-3xl font-bold text-blue-400 mb-4">
              Limited Investment Window
            </div>
            <div className="text-xl text-gray-300 mb-3">
              Early-stage opportunity with significant upside potential
            </div>
            <div className="text-gray-400">
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