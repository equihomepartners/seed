import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaBuilding, FaHandshake, FaInfoCircle, FaArrowRight, FaClock, FaPercentage, FaChartBar, FaMoneyBillWave, FaCalendar, FaChevronDown, FaChartPie } from 'react-icons/fa';

const InvestmentBreakdownCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('safe');

  const companyTimeline = [
    {
      period: 'Q4 2024 - Q1 2025',
      title: 'Seed Round',
      description: 'Initial capital raise of $2M',
      details: [
        'Platform development completion',
        'Key team expansion',
        'Strategic partnerships'
      ]
    },
    {
      period: 'Q3 2025',
      title: 'Fund Launch',
      description: '$100M Initial Deployment',
      details: [
        'First property acquisitions',
        'Platform launch',
        'Revenue generation begins'
      ]
    },
    {
      period: '2026',
      title: 'Series A',
      description: '$20M+ Equity Round',
      details: [
        'SAFE conversion event',
        'Market expansion',
        'First dividends for equity holders*'
      ]
    },
    {
      period: '2027-2028',
      title: 'Growth Phase',
      description: 'Rapid Expansion Period',
      details: [
        'Additional funding rounds',
        'National expansion',
        'Increased dividend potential'
      ]
    },
    {
      period: '2029-2031',
      title: 'Exit Window',
      description: 'Strategic Sale or IPO',
      details: [
        'Target valuation $600M+',
        'Major liquidity event',
        'Return realization'
      ]
    }
  ];

  const investmentInstruments = {
    safe: {
      title: 'SAFE (Simple Agreement for Future Equity)',
      description: 'Early-stage investment vehicle with equity conversion rights',
      minInvestment: '$50,000',
      timeline: {
        phase1: {
          title: 'Initial Investment',
          time: 'Immediate',
          description: 'Quick documentation and capital transfer'
        },
        phase2: {
          title: 'Growth Period',
          time: '12-18 months',
          description: 'Company expansion and value creation'
        },
        phase3: {
          title: 'Conversion Event',
          time: 'Next equity round',
          description: 'Conversion to equity at negotiated terms'
        }
      },
      benefits: [
        'Priority access to future rounds',
        'Aggressive conversion terms for early commitment',
        'Rapid closing process (as fast as 48 hours)',
        'Streamlined investment process',
        'Simple, founder-friendly documentation'
      ],
      returns: [
        'Equity conversion at next round',
        'Potential 18-26x+ ROI at exit',
        'No dividends until conversion',
        'First priority in liquidation'
      ],
      keyPoints: [
        'Terms negotiated based on investment size',
        'Flexible investment timing',
        'Value tied to company growth'
      ]
    },
    convertible: {
      title: 'Convertible Note',
      description: 'Debt instrument that converts to equity with added interest benefits',
      minInvestment: '$100,000',
      timeline: {
        phase1: {
          title: 'Note Issuance',
          time: 'Immediate',
          description: 'Documentation and investment'
        },
        phase2: {
          title: 'Interest Period',
          time: '24 months',
          description: 'Interest accrual and company growth'
        },
        phase3: {
          title: 'Conversion or Maturity',
          time: 'At next round or 24 months',
          description: 'Convert to equity or extend note'
        }
      },
      benefits: [
        '8% annual interest rate',
        'Flexible conversion options',
        'Negotiable terms for larger investments',
        'Security of debt instrument',
        'Priority status in capital structure'
      ],
      returns: [
        'Guaranteed interest returns',
        'Equity conversion at attractive terms',
        'Potential 15-22x+ ROI at exit',
        'Second priority in liquidation'
      ],
      keyPoints: [
        'Interest provides downside protection',
        'Multiple conversion scenarios',
        'Earlier liquidity options'
      ]
    },
    equity: {
      title: 'Direct Equity Investment',
      description: 'Immediate ownership stake with full shareholder benefits',
      minInvestment: '$250,000',
      timeline: {
        phase1: {
          title: 'Due Diligence',
          time: '2-3 weeks',
          description: 'Review and documentation'
        },
        phase2: {
          title: 'Shareholder Rights',
          time: 'Immediate post-closing',
          description: 'Full shareholder benefits'
        },
        phase3: {
          title: 'Value Realization',
          time: 'Ongoing + Exit',
          description: 'Dividends and capital appreciation'
        }
      },
      benefits: [
        'Immediate shareholder status',
        'Strategic partnership opportunities',
        'Direct ownership stake',
        'Regular financial updates and involvement',
        'Priority access to future opportunities'
      ],
      returns: [
        'Performance-based dividends',
        'Pro-rata rights for future rounds',
        'Potential 8-18x+ ROI at exit',
        'Capital gains on exit'
      ],
      keyPoints: [
        'Most direct form of ownership',
        'Strategic involvement opportunities',
        'Long-term growth participation'
      ]
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={false}
        animate={isExpanded ? { height: 'auto' } : { height: '240px' }}
        className="bg-[#111827] rounded-2xl overflow-hidden shadow-xl border border-blue-500/20"
      >
        {/* Preview Card */}
        <div 
          className="p-10 cursor-pointer hover:bg-blue-500/10 transition-all duration-300 group relative"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <FaChartPie className="text-2xl text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Investment Structure</h3>
                <p className="text-sm text-blue-400 mt-1">Click to view detailed breakdown</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-blue-400 bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300"
            >
              <FaChevronDown className="text-xl" />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-8 relative">
            <div className="bg-[#0a0f1a] p-4 rounded-xl group-hover:bg-[#0d1424] transition-colors duration-300">
              <div className="text-gray-400 text-sm mb-1">Investment Range</div>
              <div className="text-2xl font-bold text-blue-400">$50K - $1M+</div>
            </div>
            <div className="bg-[#0a0f1a] p-4 rounded-xl group-hover:bg-[#0d1424] transition-colors duration-300">
              <div className="text-gray-400 text-sm mb-1">Target Exit</div>
              <div className="text-2xl font-bold">5-7 Years</div>
            </div>
            <div className="bg-[#0a0f1a] p-4 rounded-xl group-hover:bg-[#0d1424] transition-colors duration-300">
              <div className="text-gray-400 text-sm mb-1">ROI Potential</div>
              <div className="text-2xl font-bold text-green-400">8-26x+</div>
            </div>
          </div>

          <div className="mt-4 bg-[#0a0f1a] p-4 rounded-xl group-hover:bg-[#0d1424] transition-colors duration-300">
            <div className="text-gray-400 text-sm mb-1">Investment Entity</div>
            <div className="text-lg font-bold text-white">Equihome Capital Group Inc.</div>
            <div className="text-sm text-blue-400">US C-Corporation</div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-8 pb-8">
            {/* Company Timeline Section - Horizontal */}
            <div className="border-t border-gray-800 pt-8 mb-12">
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <FaCalendar className="mr-3 text-blue-400" />
                Company Growth Timeline
              </h4>
              
              <div className="relative">
                {/* Horizontal Timeline Line */}
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                
                {/* Timeline Items */}
                <div className="grid grid-cols-5 gap-4 relative">
                  {companyTimeline.map((phase, index) => (
                    <div key={index} className="relative pt-8">
                      {/* Timeline Node */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white" />
                      
                      {/* Content Card */}
                      <div 
                        className="bg-[#1a2234] rounded-xl p-4 hover:bg-[#1e2738] transition-colors cursor-pointer group relative"
                        onClick={() => {/* Add click handler if needed */}}
                      >
                        <div className="text-purple-400 text-xs mb-1">{phase.period}</div>
                        <div className="font-semibold text-white text-sm mb-1">{phase.title}</div>
                        <div className="text-blue-400 text-xs font-medium mb-2">{phase.description}</div>
                        
                        {/* Hover Details */}
                        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-64 bg-[#1a2234] rounded-lg p-4 shadow-xl border border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="space-y-2">
                            {phase.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1 mr-2" />
                                <span className="text-gray-300 text-xs">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Instruments Section */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                {/* Instrument Selection Tabs */}
                <div className="flex space-x-4 mb-8">
                  {Object.entries(investmentInstruments).map(([key, instrument]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === key
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                      }`}
                    >
                      {instrument.title}
                    </button>
                  ))}
                </div>

                {/* Active Instrument Details */}
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{investmentInstruments[activeTab].title}</h4>
                    <p className="text-gray-400">{investmentInstruments[activeTab].description}</p>
                    <div className="mt-4 inline-block px-4 py-2 bg-blue-500/10 rounded-lg">
                      <span className="text-sm text-blue-400">Minimum Investment: {investmentInstruments[activeTab].minInvestment}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h5 className="text-lg font-semibold mb-4 flex items-center">
                      <FaClock className="mr-2 text-blue-400" />
                      Investment Journey
                    </h5>
                    <div className="relative">
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/20" />
                      <div className="space-y-6">
                        {Object.entries(investmentInstruments[activeTab].timeline).map(([key, phase]) => (
                          <div key={key} className="relative flex items-start pl-16">
                            <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full bg-blue-500/20 border-2 border-blue-500" />
                            <div className="bg-[#1a2234] rounded-xl p-4 flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-white">{phase.title}</div>
                                <div className="text-blue-400 text-sm">{phase.time}</div>
                              </div>
                              <div className="text-gray-400 text-sm">{phase.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefits and Returns Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Benefits */}
                    <div>
                      <h5 className="text-lg font-semibold mb-4 flex items-center">
                        <FaHandshake className="mr-2 text-blue-400" />
                        Key Benefits
                      </h5>
                      <div className="space-y-3">
                        {investmentInstruments[activeTab].benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2" />
                            <span className="text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Returns */}
                    <div>
                      <h5 className="text-lg font-semibold mb-4 flex items-center">
                        <FaChartLine className="mr-2 text-green-400" />
                        Return Structure
                      </h5>
                      <div className="space-y-3">
                        {investmentInstruments[activeTab].returns.map((return_, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2" />
                            <span className="text-gray-300">{return_}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h5 className="text-lg font-semibold mb-4 flex items-center">
                      <FaInfoCircle className="mr-2 text-blue-400" />
                      Key Points to Consider
                    </h5>
                    <div className="bg-[#1a2234] rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {investmentInstruments[activeTab].keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2" />
                            <span className="text-gray-300 text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-blue-500/5 rounded-xl p-6 border border-blue-500/20">
                    <div className="flex items-start space-x-3">
                      <FaInfoCircle className="text-blue-400 mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                          Terms are customized for strategic investors and can be expedited for committed partners. 
                          All returns are projections based on our current business model and market conditions.
                        </p>
                        <p className="text-sm text-gray-300">
                          Schedule a call with our investment team to discuss specific terms and conditions for your investment level.
                        </p>
                        {activeTab === 'safe' && (
                          <div className="mt-4 pt-4 border-t border-blue-500/20">
                            <p className="text-sm text-gray-300">
                              SAFE (Simple Agreement for Future Equity) is the most common investment vehicle for startups in the United States. Learn more about SAFE agreements on <a href="https://www.ycombinator.com/documents#about" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Y Combinator's SAFE documentation</a>.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InvestmentBreakdownCard; 