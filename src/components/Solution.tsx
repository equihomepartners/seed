import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'
import DealExample from './DealExample'

const Solution = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Solution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Providing seamless access to home equity without the burden of monthly payments
        </p>
      </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
        {/* Traditional Process */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="fintech-card p-8 bg-gray-50 border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">×</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Traditional Process</h3>
            </div>

            <div className="space-y-6">
              {/* Rates & Payments */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Rates & Payments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variable Rate</span>
                    <span className="font-medium text-red-600">6.5-7.5% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fixed Rate (2yr)</span>
                    <span className="font-medium text-gray-900">6.99% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium text-red-600">Required</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Example Payment*</span>
                    <span className="font-medium text-gray-900">$3,160/month</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">*On $450k loan at 6.99% over 30 years</div>
                </div>
              </div>

              {/* Underwriting Process */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Underwriting Process</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Extensive income verification and serviceability assessment</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Credit history and existing debt obligations review</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Employment stability and income source verification</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Additional Requirements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-medium text-gray-900">$500-1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuation Fee</span>
                    <span className="font-medium text-gray-900">$300-600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Legal Fees</span>
                    <span className="font-medium text-gray-900">$800-1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-medium text-red-600">30-45 days</span>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>

        {/* Equihome Solution */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="fintech-card p-8 bg-gradient-to-br from-sky-50 to-white border-2 border-sky-200 shadow-lg relative overflow-hidden"
          >
            {/* Add subtle pattern overlay */}
            <div className="absolute inset-0 bg-sky-50 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(2,132,199,0.15) 2px, transparent 0)' }} />

            <div className="relative">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-sky-600 text-xl">✓</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Equihome Solution</h3>
              </div>

              <div className="space-y-6">
                {/* Process Highlights */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Streamlined Process</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Approval Time</span>
                      <span className="font-medium text-green-600">Under 21 Days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Application Process</span>
                      <span className="font-medium text-gray-900">Digital-First</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Documentation</span>
                      <span className="font-medium text-gray-900">Minimal</span>
                    </div>
                  </div>
                </div>

                {/* Asset-Focused Underwriting */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Asset-Focused Underwriting</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <span className="text-gray-600">90% of underwriting focused on property quality and market fundamentals</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <span className="text-gray-600">Selective investment criteria for premium returns</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <span className="text-gray-600">Focus on high-quality properties in strong growth areas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fees Section */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Fees & Charges</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upfront Fee</span>
                      <span className="font-medium text-gray-900">3% of amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium text-gray-900">5% p.a. simple (paid at exit)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payments</span>
                      <span className="font-medium text-green-600">None</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Appreciation Share</span>
                      <span className="font-medium text-gray-900">Proportional to loan amount and LTV entry</span>
                    </div>
                  </div>
                </div>

                {/* Terms Section */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Key Terms</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Term Length</span>
                      <span className="font-medium text-gray-900">10 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lending Range</span>
                      <span className="font-medium text-gray-900">Up to 70% LTV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Profile</span>
                      <span className="font-medium text-gray-900">Unencumbered</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Type</span>
                      <span className="font-medium text-gray-900">1st Mortgage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Early Exit</span>
                      <span className="font-medium text-gray-900">Allowed</span>
                    </div>
                  </div>
                </div>

                {/* End of Terms Section */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Offering Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-32 py-16 bg-gradient-to-b from-gray-50 to-white rounded-3xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-2 text-gray-900">Product Offering</h3>
            <p className="text-xl font-medium mb-4 text-gray-700">
              Empowering Homeowners with Cash Flow-Free Financing
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specializing in equity release to provide innovative solutions to homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Refinance Card */}
            <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
              <div className="bg-blue-700 p-6 text-center">
                <h4 className="text-2xl font-bold text-white">Refinance</h4>
              </div>
              <div className="bg-gray-900 text-white p-6 flex flex-col space-y-4 min-h-[320px]">
                <p className="text-center pb-4 border-b border-gray-700 text-sm md:text-base">
                  Refinance your existing mortgage
                </p>

                <div className="text-center py-2 border-b border-gray-700">
                  <p className="font-medium text-sm md:text-base">Unlock Home Equity</p>
                </div>

                <div className="space-y-2 py-2 text-center">
                  <p className="text-sm">Deferred Payments</p>
                  <p className="text-sm">Fixed Simple Interest</p>
                  <p className="text-sm">Appreciation Share</p>
                  <p className="text-sm">Shared Risk & Reward</p>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-700">
                  <p className="text-center font-medium text-sm">10 Year Term, Exit Anytime</p>
                </div>
              </div>
            </div>

            {/* Transitional Card */}
            <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
              <div className="bg-blue-700 p-6 text-center">
                <h4 className="text-2xl font-bold text-white">Transitional</h4>
              </div>
              <div className="bg-gray-900 text-white p-6 flex flex-col space-y-4 min-h-[320px]">
                <p className="text-center pb-4 border-b border-gray-700 text-sm md:text-base">
                  Bridge the gap when buying a new home before selling your current one
                </p>

                <div className="text-center py-2 border-b border-gray-700">
                  <p className="font-medium text-sm md:text-base">Unlock Home Equity</p>
                </div>

                <div className="space-y-2 py-2 text-center">
                  <p className="text-sm">Deferred Payments</p>
                  <p className="text-sm">Fixed Simple Interest</p>
                  <p className="text-sm">Appreciation Share</p>
                  <p className="text-sm">Shared Risk & Reward</p>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-700">
                  <p className="text-center font-medium text-sm">1 Year Timeline to Buy New Property</p>
                </div>
              </div>
            </div>

            {/* Equity Release Card */}
            <div className="rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
              <div className="bg-blue-700 p-6 text-center">
                <h4 className="text-2xl font-bold text-white">Equity Release</h4>
              </div>
              <div className="bg-gray-900 text-white p-6 flex flex-col space-y-4 min-h-[320px]">
                <p className="text-center pb-4 border-b border-gray-700 text-sm md:text-base">
                  Unlock the equity in your home
                </p>

                <div className="text-center py-2 border-b border-gray-700">
                  <p className="font-medium text-sm md:text-base">Unlock Home Equity</p>
                </div>

                <div className="space-y-2 py-2 text-center">
                  <p className="text-sm">Deferred Payments</p>
                  <p className="text-sm">Fixed Simple Interest</p>
                  <p className="text-sm">Appreciation Share</p>
                  <p className="text-sm">Shared Risk & Reward</p>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-700">
                  <p className="text-center font-medium text-sm">10 Year Term, Exit Anytime</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Example */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Real Transaction Example</h3>
            <p className="text-xl text-gray-600">A real case study from Sydney's Lower North Shore</p>
          </div>

          <DealExample />
        </motion.div>
      </div>
    </section>
  )
}

export default Solution