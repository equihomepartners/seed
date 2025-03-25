import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChartLine, FaShieldAlt, FaHome, FaChartBar, FaMapMarkerAlt, FaChartPie, 
         FaRobot, FaDatabase, FaLightbulb, FaSearch, FaCogs, FaBrain, FaBuilding,
         FaMoneyBillWave, FaUserTie, FaClock, FaChartArea, FaInfoCircle, FaCrosshairs,
         FaPercentage, FaBullseye, FaHandshake, FaDollarSign } from 'react-icons/fa'

const TechnologyPlatform = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const metrics = [
    {
      value: '95%',
      label: 'TARGET SUCCESS RATE',
      description: 'Precision in identifying high-potential investment opportunities',
      icon: <FaBullseye className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '80%',
      label: 'REDUCED HEADCOUNT',
      description: 'Technology replaces traditional analyst, sales, and engineering roles',
      icon: <FaRobot className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '99.9%',
      label: 'FASTER PROCESSING',
      description: 'Accelerated analysis and decision-making capabilities',
      icon: <FaClock className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '85%',
      label: 'MARKETING EFFICIENCY',
      description: 'Reduced marketing spend through precise targeting',
      icon: <FaChartBar className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '1T+',
      label: 'DATA POINTS',
      description: 'Comprehensive ML models analyzing macro/micro market fundamentals',
      icon: <FaDatabase className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '3.2x',
      label: 'BROKER EFFICIENCY',
      description: 'Increased broker productivity through targeted leads',
      icon: <FaHandshake className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: '2000+',
      label: 'SUBURBS ANALYZED',
      description: 'Comprehensive market coverage across Australia',
      icon: <FaMapMarkerAlt className="w-8 h-8 text-blue-600 mb-4" />
    },
    {
      value: 'Top 10%',
      label: 'MARKET POSITION',
      description: 'Focus on premium Sydney residential properties',
      icon: <FaBuilding className="w-8 h-8 text-blue-600 mb-4" />
    }
  ]

  const systems = [
    {
      title: "Traffic Light Zones (TFL)",
      icon: <FaCrosshairs />,
      description: "Our proprietary AI-driven risk rating system analyzes over 300 economic indicators to classify suburbs into green, yellow, and red zones. The system continuously monitors market conditions and updates risk assessments in real-time.",
      features: [
        "Real-time suburb risk assessment",
        "Growth potential prediction",
        "Economic indicator analysis",
        "Automated risk alerts"
      ],
      benefits: "Enables precise targeting of high-potential areas while avoiding risky suburbs."
    },
    {
      title: "Portfolio Management",
      icon: <FaChartPie />,
      description: "Advanced CIO Dashboard powered by Monte Carlo simulations, analyzing thousands of market scenarios to optimize portfolio performance. Our system processes real-time market data to provide actionable insights for portfolio rebalancing.",
      features: [
        "Real-time portfolio tracking",
        "Risk exposure monitoring",
        "Performance optimization",
        "Scenario analysis"
      ],
      benefits: "Maximizes portfolio returns through data-driven decision making."
    },
    {
      title: "Automated Underwriting",
      icon: <FaRobot />,
      description: "AI-powered system that processes and ranks investment opportunities in real-time, reducing manual analysis from weeks to hours. Our platform integrates with multiple data sources to provide comprehensive property analysis.",
      features: [
        "Instant property analysis",
        "Automated risk assessment",
        "Smart deal filtering",
        "Real-time valuation"
      ],
      benefits: "Dramatically reduces processing time while ensuring consistent, data-backed decisions."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
            INSTITUTIONAL GRADE TECHNOLOGY
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            End-to-End Investment Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Combining advanced AI with deep real estate expertise for precise market positioning
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              {metric.icon}
              <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="text-sm font-semibold text-gray-500 mb-2">{metric.label}</div>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Platform Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FaCrosshairs className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Traffic Light Zones</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Advanced zoning algorithm that identifies high-potential investment areas using multiple data points
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Real-time market analysis</li>
              <li>• Risk-adjusted scoring</li>
              <li>• Demographic insights</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FaChartLine className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Portfolio Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive portfolio optimization system for institutional-grade performance
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Dynamic rebalancing</li>
              <li>• Risk monitoring</li>
              <li>• Performance analytics</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <FaRobot className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Underwriting</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered underwriting system for faster, more accurate assessments
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Automated valuations</li>
              <li>• Risk assessment</li>
              <li>• Market comparables</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Equihome Advantage</h3>
          <p className="text-gray-600">
            Our institutional-grade platform combines cutting-edge technology with deep market expertise,
            enabling precise targeting and superior risk-adjusted returns in the Australian residential
            real estate market.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TechnologyPlatform 