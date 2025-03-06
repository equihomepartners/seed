import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

        {/* Transaction Example */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Real Transaction Example</h3>
            <p className="text-xl text-gray-600">A real case study from Sydney's Lower North Shore</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Property Details */}
            <div className="fintech-card p-8 bg-gradient-to-br from-sky-50 to-white">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Property Profile</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-600 mb-1">Location</div>
                    <div className="text-lg font-semibold text-gray-900">Neutral Bay, Sydney</div>
                    <div className="text-sm text-gray-600">Premium Lower North Shore suburb</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Property Type</div>
                    <div className="text-lg font-semibold text-gray-900">Single-Family Home</div>
                    <div className="text-sm text-gray-600">4-bed, 2-bath Federation home, 506m² land</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Market Context</div>
                    <div className="text-sm text-gray-600">
                      • Premium Lower North Shore location with limited new supply<br/>
                      • High owner-occupier ratio (82%) indicating stable values<br/>
                      • Strong rental demand with 2.1% vacancy rate<br/>
                      • Major infrastructure projects: New Metro station (2024)<br/>
                      • Zoning restrictions protect heritage character
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-600 mb-1">Initial Valuation (2021)</div>
                    <div className="text-lg font-semibold text-gray-900">$3,200,000</div>
                    <div className="text-sm text-gray-600">Based on recent comparable sales on Ben Boyd Road</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Risk Assessment</div>
                    <div className="text-sm text-gray-600">
                      • Premium Federation home with period features<br/>
                      • Highly sought-after school catchment<br/>
                      • Large land size for the area<br/>
                      • Walking distance to shops and transport
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Initial Transaction */}
            <div className="fintech-card p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Initial Transaction</h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-gray-600 mb-2">Property Value</div>
                  <div className="text-2xl font-bold text-gray-900">$1,500,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Equity Release (30% LTV)</div>
                  <div className="text-2xl font-bold text-gray-900">$450,000</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Upfront Fee (3%)</div>
                  <div className="text-2xl font-bold text-red-500">-$13,500</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-2">Net to Homeowner</div>
                  <div className="text-2xl font-bold text-sky-600">$436,500</div>
                </div>
              </div>
            </div>

            {/* Use Case */}
            <div className="fintech-card p-8 bg-sky-50">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Investment Journey</h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">Homeowner Profile</div>
                    <div className="text-gray-600">Professional couple in their late 50s with fully paid off home, looking to help their children enter the Sydney property market without selling their family home</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">Security Position</div>
                    <div className="text-gray-600">First registered mortgage on unencumbered property, providing maximum security with no other debt obligations on title</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">Terms & Conditions</div>
                    <div className="text-gray-600">10-year term with early repayment flexibility, mandatory building and contents insurance, property maintenance requirements, and full recourse under Australian law in case of default</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">Events of Default</div>
                    <div className="text-gray-600">Include failure to maintain required insurance, unauthorized sale/transfer of property, breach of maintenance obligations, or bankruptcy - triggering Equihome's right to enforce security</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exit & Returns */}
            <div className="fintech-card p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Exit & Returns (21 Months)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-gray-600 mb-2">New Property Value</div>
                    <div className="text-2xl font-bold text-gray-900">$1,800,000</div>
                    <div className="text-sm text-gray-600">20% appreciation over 21 months</div>
                    <div className="mt-3 text-sm text-gray-600">
                      Value growth supported by:<br/>
                      • Strong market fundamentals in premium suburb<br/>
                      • Limited supply of heritage family homes<br/>
                      • Infrastructure and amenity improvements<br/>
                      • Consistent buyer demand in school catchment
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Validated by:<br/>
                      • Recent comparable sales within 500m<br/>
                      • Independent valuation report<br/>
                      • REA Property Data insights
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-2">Property Gain</div>
                    <div className="text-2xl font-bold text-green-500">+$300,000</div>
                    <div className="text-sm text-gray-600">Verified by independent valuation</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-600 mb-2">Principal Repayment</div>
                    <div className="text-xl font-bold text-gray-900">$450,000</div>
                    <div className="text-sm text-gray-600">Original loan amount</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-2">Simple Interest (5% p.a.)</div>
                    <div className="text-xl font-bold text-gray-900">$39,375</div>
                    <div className="text-sm text-gray-600">(21 months on $450,000)</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-2">Appreciation Share (35%)</div>
                    <div className="text-xl font-bold text-gray-900">$105,000</div>
                    <div className="text-sm text-gray-600">35% of $300,000 gain</div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-gray-600 mb-2">Total Return to Equihome</div>
                    <div className="text-2xl font-bold text-sky-600">$594,375</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Principal: $450,000</div>
                      <div>• Interest: $39,375</div>
                      <div>• Appreciation Share: $105,000</div>
                      <div>• Total IRR: 21.8% (including upfront fee)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution 