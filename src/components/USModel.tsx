import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChartLine, FaGlobe, FaHome, FaRocket, FaChartBar } from 'react-icons/fa'
import UnisonLogo from './UnisonLogo'
import performanceChart from '../assets/performance-chart.svg'

const USModel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-sm font-medium text-sky-600">Market Validation</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Proven US Model</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unison pioneered home equity investments in the US, achieving remarkable success
          </p>
        </motion.div>

        {/* Unison Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <div className="mb-8">
              <UnisonLogo />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Market Pioneer Since 2004</h3>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                Unison revolutionized home financing in the US by introducing equity investments as an alternative to traditional mortgages.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="fintech-card p-6">
                  <div className="text-2xl font-bold text-sky-600 mb-2">$10B+</div>
                  <div className="text-gray-600">Total Investments</div>
                </div>
                <div className="fintech-card p-6">
                  <div className="text-2xl font-bold text-sky-600 mb-2">20%</div>
                  <div className="text-gray-600">Average IRR</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={performanceChart}
              alt="Unison Performance Chart" 
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Market Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Competitive Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fintech-card p-8">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <FaHome className="text-2xl text-sky-600" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Larger Deal Sizes</h4>
              <p className="text-gray-600">
                While Unison's average investments range from $50-100k, our focus on premium Sydney properties enables larger investments with better economics.
              </p>
            </div>

            <div className="fintech-card p-8">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <FaRocket className="text-2xl text-sky-600" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Advanced Tech Stack</h4>
              <p className="text-gray-600">
                Australia's leading property data infrastructure enables instant valuations at 99.9% accuracy, eliminating costly manual appraisals required in the US.
              </p>
            </div>

            <div className="fintech-card p-8">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                <FaGlobe className="text-2xl text-sky-600" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Unified Market</h4>
              <p className="text-gray-600">
                Single regulatory framework across Australia vs. US state-by-state expansion, enabling faster scaling with lower compliance costs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Operational Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-sky-50 rounded-2xl p-8 border border-sky-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Streamlined Operations</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Automated valuation and underwriting reduces processing time from weeks to days</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Lower overhead costs through technology-first approach</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Centralized operations vs Unison's multi-state infrastructure</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Market Opportunity</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Premium property focus with higher equity values than US market</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Strong market fundamentals with consistent growth</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                  <p className="text-gray-600">Proven 20% IRR model validated by Unison's success</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default USModel 