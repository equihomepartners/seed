import { motion } from 'framer-motion'
import { FaChartLine, FaShieldAlt, FaHome, FaChartBar, FaMapMarkerAlt, FaChartPie, FaArrowUp, FaArrowDown, FaInfoCircle, FaGlobeAmericas } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { IconType } from 'react-icons'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import GlobalHeader from './GlobalHeader'

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: IconType
  className?: string
}

interface RiskMetricCardProps {
  title: string
  value: string
  description: string
  trend: 'positive' | 'negative'
}

// Sydney regions data with coordinates
const sydneyRegions = {
  'Northern Beaches': { 
    percentage: 20, 
    properties: 50,
    medianPrice: '$2.2M',
    appreciation: '9.2%',
    forecast: 'Strong growth corridor',
    coordinates: [-33.7490, 151.2850]
  },
  'North Shore': { 
    percentage: 25, 
    properties: 62,
    medianPrice: '$2.4M',
    appreciation: '8.8%',
    forecast: 'Premium market stability',
    coordinates: [-33.8340, 151.2070]
  },
  'Eastern Suburbs': { 
    percentage: 30, 
    properties: 75,
    medianPrice: '$2.6M',
    appreciation: '9.5%',
    forecast: 'High demand zone',
    coordinates: [-33.8920, 151.2620]
  },
  'Inner West': { 
    percentage: 15, 
    properties: 38,
    medianPrice: '$2.0M',
    appreciation: '8.2%',
    forecast: 'Emerging growth area',
    coordinates: [-33.8680, 151.1440]
  },
  'South Sydney': { 
    percentage: 10, 
    properties: 25,
    medianPrice: '$1.8M',
    appreciation: '7.8%',
    forecast: 'Development potential',
    coordinates: [-33.9500, 151.1820]
  }
}

// Simulated portfolio data
const portfolioMetrics = {
  totalValue: '$50,000,000',
  numberOfAssets: '250',
  averageEquityPosition: '$200,000',
  averagePropertyValue: '$2.2M',
  ltv: '9.1%',
  projectedReturn: '12-15%',
  targetDeployment: 'Q3 2025',
  appreciationRate: '8.5%'
}

const appreciationTrends = [
  { year: '2020', value: '5.2%' },
  { year: '2021', value: '25.8%' },
  { year: '2022', value: '12.4%' },
  { year: '2023', value: '8.5%' },
  { year: '2024F', value: '9.2%' },
  { year: '2025F', value: '8.8%' }
]

const riskMetrics = [
  {
    title: 'Conservative LTV',
    value: '50%',
    description: 'Maximum LTV ratio per property',
    trend: 'positive' as const
  },
  {
    title: 'House-Only Portfolio',
    value: '100%',
    description: 'No apartments or townhouses',
    trend: 'positive' as const
  },
  {
    title: 'Location Premium',
    value: 'AAA',
    description: 'Premium Sydney locations only',
    trend: 'positive' as const
  }
]

// Add return simulation data
const returnScenarios = {
  conservative: {
    annual: '8-10%',
    fiveYear: '45-55%',
    description: 'Based on historical Sydney house price growth'
  },
  expected: {
    annual: '12-15%',
    fiveYear: '70-85%',
    description: 'Combining capital growth and equity release profits'
  },
  optimistic: {
    annual: '15-18%',
    fiveYear: '90-110%',
    description: 'High-growth areas with strong market performance'
  }
}

// Add investment highlights
const investmentHighlights = [
  {
    title: 'Capital Protected',
    description: 'Houses provide strong value protection compared to other property types',
    icon: FaShieldAlt
  },
  {
    title: 'Premium Locations',
    description: 'Focus on Sydney\'s most desirable and stable suburbs',
    icon: FaMapMarkerAlt
  },
  {
    title: 'Growth Potential',
    description: 'Historical appreciation of 8-12% annually in target areas',
    icon: FaChartLine
  }
]

// Replace SydneyMapBackground with Leaflet map
const SydneyMap = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Sydney Portfolio Distribution</h3>
      <div className="relative w-full aspect-[4/3] bg-[#0a0f1a] rounded-xl overflow-hidden">
        <MapContainer
          center={[-33.8688, 151.2093]}
          zoom={11}
          style={{ height: '100%', width: '100%', background: '#0a0f1a' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            className="map-tiles"
          />
          {Object.entries(sydneyRegions).map(([region, data]) => (
            <CircleMarker
              key={region}
              center={data.coordinates as [number, number]}
              radius={25}
              pathOptions={{
                fillColor: '#3b82f6',
                fillOpacity: 0.3,
                color: '#3b82f6',
                weight: 2,
              }}
            >
              <div className="circle-label">
                <div className="text-lg font-bold text-white">{data.percentage}%</div>
                <div className="text-sm text-blue-400">{data.properties}</div>
              </div>
              <Popup className="custom-popup">
                <div className="bg-[#1a2234] rounded-lg p-3 text-white">
                  <div className="text-sm font-bold mb-2">{region}</div>
                  <div className="text-base font-bold text-blue-400 mb-1">{data.percentage}%</div>
                  <div className="text-xs text-gray-400">{data.properties} properties</div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <div className="text-xs text-gray-400">Median Price</div>
                      <div className="text-sm font-semibold text-blue-400">{data.medianPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Growth</div>
                      <div className="text-sm font-semibold text-green-400">{data.appreciation}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">{data.forecast}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-[#0a0f1a] rounded-xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Distribution Strategy</h4>
            <p className="text-sm text-gray-400">
              Strategic allocation across Sydney's premium suburbs, focusing on established areas with strong growth potential.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Selection Criteria</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• High owner-occupier ratio</li>
              <li>• Strong historical growth</li>
              <li>• Premium infrastructure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add custom styles for the map
const mapStyles = `
  .leaflet-container {
    background: #ffffff !important;
  }
  .custom-popup .leaflet-popup-content-wrapper {
    background: transparent;
    box-shadow: none;
  }
  .custom-popup .leaflet-popup-tip {
    background: #1a2234;
  }
  .custom-popup .leaflet-popup-content {
    margin: 0;
  }
  .map-tiles {
    filter: brightness(0.95) contrast(1.1);
  }
`

// Add styles to head
const style = document.createElement('style')
style.textContent = mapStyles
document.head.appendChild(style)

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon: Icon, className = '' }) => (
  <div className={`bg-[#111827] rounded-xl border border-blue-500/20 p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <Icon className="text-2xl text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
  </div>
)

const RiskMetricCard: React.FC<RiskMetricCardProps> = ({ title, value, description, trend }) => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className={`flex items-center ${trend === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
      </div>
    </div>
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
)

const ReturnScenarios = () => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <h3 className="text-lg font-semibold text-white mb-6">Return Scenarios</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(returnScenarios).map(([scenario, data]) => (
        <div key={scenario} className="bg-[#0a0f1a] rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-3 capitalize">{scenario}</h4>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-400">Annual Return</div>
              <div className="text-xl font-bold text-blue-400">{data.annual}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">5-Year Return</div>
              <div className="text-xl font-bold text-green-400">{data.fiveYear}</div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{data.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const InvestmentHighlights = () => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <h3 className="text-lg font-semibold text-white mb-6">Why Houses in Premium Sydney Locations?</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {investmentHighlights.map((highlight, index) => (
        <div key={index} className="bg-[#0a0f1a] rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <highlight.icon className="text-xl text-blue-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">{highlight.title}</h4>
          </div>
          <p className="text-sm text-gray-400">{highlight.description}</p>
        </div>
      ))}
    </div>
  </div>
)

const AppreciationChart = () => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <h3 className="text-lg font-semibold text-white mb-6">Market Performance Analysis</h3>
    <div className="mb-4">
      <p className="text-sm text-gray-400">
        Historical and projected appreciation rates for premium Sydney houses, showing resilience 
        through market cycles and consistent long-term growth potential.
      </p>
    </div>
    <div className="space-y-4">
      {appreciationTrends.map((trend) => (
        <div key={trend.year}>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{trend.year}</span>
            <span>{trend.value}</span>
          </div>
          <div className="w-full h-2 bg-[#0a0f1a] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${parseFloat(trend.value)}0%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <FaInfoCircle className="text-blue-400" />
        <span>Past performance is not indicative of future results</span>
      </div>
    </div>
  </div>
)

const StrategyOverview = () => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <h3 className="text-lg font-semibold text-white mb-6">Investment Strategy</h3>
    <div className="space-y-6">
      <div className="bg-[#0a0f1a] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Research-Backed Approach</h4>
        <p className="text-sm text-gray-400">
          Our portfolio strategy is based on extensive research with both homeowners and institutional investors, 
          focusing on premium Sydney houses in established areas with strong growth potential.
        </p>
      </div>
      <div className="bg-[#0a0f1a] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Deployment Strategy</h4>
        <p className="text-sm text-gray-400">
          Initial deployment in Q3 2025 will be rapidly executed once oversubscribed, allowing us to 
          cherry-pick properties aligned with market trends and maximize portfolio value.
        </p>
      </div>
      <div className="bg-[#0a0f1a] rounded-xl p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Risk Management</h4>
        <p className="text-sm text-gray-400">
          Conservative 50% LTV ratio, focus on premium Sydney locations, and houses-only policy 
          provides strong downside protection while maintaining appreciation potential.
        </p>
      </div>
    </div>
  </div>
)

// Add risk parameters explanation
const riskParameters = [
  {
    title: 'Property Value Buffer',
    value: '50%',
    description: 'We maintain a 50% buffer between our position and property value, providing significant protection against market fluctuations.'
  },
  {
    title: 'Location Quality',
    value: 'Premium',
    description: 'Focus on established areas with strong historical growth and high owner-occupier ratios.'
  },
  {
    title: 'Property Type',
    value: 'Houses Only',
    description: 'Exclusively single-family homes, which have shown the most stable value retention in Sydney.'
  },
  {
    title: 'Market Timing',
    value: 'Strategic',
    description: 'Deployment aligned with market conditions and homeowner demand.'
  }
]

const RiskExplanation = () => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
    <h3 className="text-lg font-semibold text-white mb-6">Risk Management Framework</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {riskParameters.map((param, index) => (
        <div key={index} className="bg-[#0a0f1a] rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <FaShieldAlt className="text-xl text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">{param.title}</h4>
              <div className="text-blue-400 text-sm">{param.value}</div>
            </div>
          </div>
          <p className="text-sm text-gray-400">{param.description}</p>
        </div>
      ))}
    </div>
  </div>
)

// Add section header component for consistency
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="h-px flex-grow mx-6 bg-blue-500/20" />
  </div>
)

const PortfolioOS: React.FC = () => {
  // Calculate progress percentage
  const totalRound = 5000000 // $5M
  const currentRaised = 550000 // $550K
  const progressPercentage = (currentRaised / totalRound) * 100

  // Calculate days remaining
  const endDate = new Date('2025-01-31')
  const startDate = new Date('2024-12-16')
  const today = new Date()
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Portfolio performance metrics
  const portfolioMetrics = {
    sharpeRatio: '1.8',
    sortino: '2.1',
    maxDrawdown: '-12%',
    volatility: '9.8%',
    expectedReturn: '14.2%',
    riskScore: '82'
  }

  // Simulated cash flows
  const cashFlowProjections = [
    { year: 2025, value: 1000000 },
    { year: 2026, value: 1250000 },
    { year: 2027, value: 1562500 },
    { year: 2028, value: 1953125 },
    { year: 2029, value: 2441406 }
  ]

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="portfolio-os" />
      
      {/* Fundraising Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-blue-500/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="text-gray-400">Seed Round Progress</div>
            <div className="text-white font-medium">${(currentRaised / 1000000).toFixed(1)}M raised of $5M</div>
          </div>
          <div className="relative h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="text-gray-500">Dec 16, 2024</div>
            <div className="text-gray-400">{daysRemaining} days remaining</div>
            <div className="text-gray-500">Jan 31, 2025</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[180px]">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title and Description */}
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h1 className="text-[2.25rem] font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Portfolio Simulation
            </h1>
            <p className="text-sm leading-relaxed text-gray-400 max-w-3xl mx-auto">
              Example portfolio simulation for our first $50M deployment, targeting premium houses in the $2-3M range across Sydney's most desirable suburbs.
            </p>
            <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <p className="text-xs text-blue-300">
                Note: The return scenarios shown below are for our institutional fund investors. As a seed round investor, 
                your returns will be tied to Equihome's success and growth as a fund manager.
              </p>
            </div>
          </div>

          {/* Portfolio Strength and Breakdown */}
          <div className="mb-16">
            <SectionHeader title="Portfolio Breakdown" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portfolio Protection and Metrics */}
              <div className="space-y-6">
                <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Portfolio Protection</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Value Buffer</div>
                      <div className="text-2xl font-bold text-green-400">50%</div>
                      <div className="text-xs text-gray-400 mt-1">Maximum LTV ratio</div>
                    </div>
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Property Type</div>
                      <div className="text-2xl font-bold text-blue-400">AAA</div>
                      <div className="text-xs text-gray-400 mt-1">Premium houses only</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Portfolio Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-white">Total Portfolio Value</div>
                          <div className="text-xs text-gray-400">Target deployment</div>
                        </div>
                        <div className="text-xl font-bold text-blue-400">$50M</div>
                      </div>
                    </div>
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-white">Average Loan Size</div>
                          <div className="text-xs text-gray-400">Per property</div>
                        </div>
                        <div className="text-xl font-bold text-green-400">$250K</div>
                      </div>
                    </div>
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-white">Property Value Range</div>
                          <div className="text-xs text-gray-400">Target segment</div>
                        </div>
                        <div className="text-xl font-bold text-purple-400">$2-3M</div>
                      </div>
                    </div>
                    <div className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-white">Target Loans</div>
                          <div className="text-xs text-gray-400">Initial portfolio</div>
                        </div>
                        <div className="text-xl font-bold text-yellow-400">200</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IRR Scenarios */}
              <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">IRR Scenarios</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm text-white">Recession Case</div>
                        <div className="text-xs text-gray-400">Market downturn</div>
                      </div>
                      <div className="text-lg font-bold text-blue-400">8-10%</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Based on 2008 GFC recovery patterns in premium Sydney areas
                    </div>
                    <div className="mt-2 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-blue-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm text-white">Conservative Case</div>
                        <div className="text-xs text-gray-400">Slow growth</div>
                      </div>
                      <div className="text-lg font-bold text-green-400">12-14%</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Historical minimum returns in stable market conditions
                    </div>
                    <div className="mt-2 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-green-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm text-white">Base Case</div>
                        <div className="text-xs text-gray-400">Expected scenario</div>
                      </div>
                      <div className="text-lg font-bold text-purple-400">16-18%</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Based on current market trends and growth patterns
                    </div>
                    <div className="mt-2 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-purple-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-sm text-white">Best Case</div>
                        <div className="text-xs text-gray-400">Strong growth</div>
                      </div>
                      <div className="text-lg font-bold text-yellow-400">20-25%</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Based on 2021-like market conditions with high growth
                    </div>
                    <div className="mt-2 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Returns Comparison */}
          <div className="mb-16">
            <SectionHeader title="Investment Returns Comparison" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IRR Comparison */}
              <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">IRR Comparison (5-Year Average)</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Bank Term Deposit', value: '4.5%', risk: 'Very Low', note: 'Fixed Income' },
                    { name: 'Traditional Mortgage', value: '6.2%', risk: 'Low', note: 'Bank Lending' },
                    { name: 'Commercial Property', value: '8.5%', risk: 'Medium', note: 'Office/Retail' },
                    { name: 'REITs', value: '10.2%', risk: 'Medium-High', note: 'Listed Property' },
                    { name: 'Private Equity', value: '15.5%', risk: 'Very High', note: 'High Risk' },
                    { name: 'Equihome Base Case', value: '16-18%', risk: 'Low-Medium', note: 'Premium Houses' }
                  ].map((asset) => (
                    <div key={asset.name} className="bg-[#0a0f1a] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-sm text-white">{asset.name}</div>
                          <div className="text-xs text-gray-400">Risk Level: {asset.risk}</div>
                        </div>
                        <div className={`text-lg font-bold ${
                          asset.name === 'Equihome Base Case' ? 'text-blue-400' : 'text-gray-400'
                        }`}>{asset.value}</div>
                      </div>
                      <div className="mt-2 h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(parseFloat(asset.value) / 16) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            asset.name === 'Equihome Base Case' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : 'bg-gray-500'
                          }`}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{asset.note}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-xs text-blue-300">
                    Equihome combines institutional-grade returns with the safety of premium residential real estate.
                  </p>
                </div>
              </div>

              {/* Real Estate Safety */}
              <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Why Premium Residential Real Estate is Safest</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mt-1">
                        <FaHome className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Essential Asset Class</div>
                        <div className="text-xs text-gray-400">Housing is a basic human need, ensuring consistent demand regardless of market conditions</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mt-1">
                        <FaShieldAlt className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Value Stability</div>
                        <div className="text-xs text-gray-400">Premium houses have shown the lowest volatility compared to all other real estate types</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mt-1">
                        <FaChartLine className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Historical Performance</div>
                        <div className="text-xs text-gray-400">Sydney premium houses have never experienced a sustained downturn over any 10-year period</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center mt-1">
                        <FaMapMarkerAlt className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Location Advantage</div>
                        <div className="text-xs text-gray-400">Premium areas maintain value even in downturns due to limited supply and high owner-occupier ratios</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-xs text-blue-300">
                    Our focus on premium houses in top Sydney locations provides institutional-grade returns with significantly lower risk than traditional high-yield investments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Real Estate Safety Section */}
          <div className="mb-16">
            <SectionHeader title="Global Real Estate Safety" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Market Size and Stability */}
              <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Largest Asset Class Globally</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mt-1">
                        <FaGlobeAmericas className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Global Market Size</div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">$280T</div>
                        <div className="text-xs text-gray-400">Residential real estate represents over 75% of global wealth</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mt-1">
                        <FaChartBar className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Market Stability</div>
                        <div className="text-2xl font-bold text-green-400 mb-1">2.1x</div>
                        <div className="text-xs text-gray-400">Lower volatility than commercial property and equities</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mt-1">
                        <FaShieldAlt className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Inflation Protection</div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">97%</div>
                        <div className="text-xs text-gray-400">Historical correlation with inflation, providing natural hedge</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Residential Advantages */}
              <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Premium Residential Advantages</h3>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mt-1">
                        <FaHome className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Essential Asset</div>
                        <div className="text-xs text-gray-400">Housing is a basic human need with consistent demand across market cycles</div>
                        <div className="mt-2 text-xs text-blue-300">↑ 99.9% occupancy rates in premium areas</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mt-1">
                        <FaChartLine className="text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Value Resilience</div>
                        <div className="text-xs text-gray-400">Premium houses maintain value better than any other property type</div>
                        <div className="mt-2 text-xs text-green-300">↑ 8.5% average annual appreciation since 1901</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center mt-1">
                        <FaMapMarkerAlt className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-sm text-white mb-1">Supply Constraints</div>
                        <div className="text-xs text-gray-400">Limited land in premium areas creates natural value protection</div>
                        <div className="mt-2 text-xs text-yellow-300">↑ Less than 1% annual supply growth in target areas</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-xs text-blue-300">
                    Premium residential real estate combines the safety of the world's largest asset class with 
                    the superior returns of Sydney's most exclusive markets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="mb-16">
            <SectionHeader title="Portfolio Distribution" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SydneyMap />
                <div className="mt-6">
                  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Why These Areas?</h4>
                    <p className="text-sm text-gray-400">
                      Selected regions represent Sydney's most stable housing markets with strong 
                      owner-occupier ratios, established infrastructure, and consistent growth patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <AppreciationChart />
                <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Market Insights</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-400">• Premium areas show resilience in downturns</li>
                    <li className="text-sm text-gray-400">• Strong correlation with economic growth</li>
                    <li className="text-sm text-gray-400">• High owner-occupier demand maintains values</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-blue-500/20 bg-[#0a0f1a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">About Equihome</h4>
              <p className="text-sm text-gray-400">
                Revolutionizing residential real estate investment through institutional-grade portfolio management and technology.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                For investor inquiries:<br />
                invest@equihome.com
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Location</h4>
              <p className="text-sm text-gray-400">
                Sydney, Australia<br />
                Serving institutional and sophisticated investors globally
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500/20">
            <div className="text-xs text-gray-400">
              © 2024 Equihome. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioOS 