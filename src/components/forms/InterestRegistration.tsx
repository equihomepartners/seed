import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaBuilding, FaDollarSign, FaGlobe, FaPhone, FaEnvelope, FaLinkedin, FaCalendar } from 'react-icons/fa'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  investorType: string
  investmentRange: string
  investmentInstrument: string
  linkedinProfile: string
  investmentTimeline: string
  priorInvestments: string
  interests: string[]
  additionalNotes: string
}

const InterestRegistration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    investorType: '',
    investmentRange: '',
    investmentInstrument: '',
    linkedinProfile: '',
    investmentTimeline: '',
    priorInvestments: '',
    interests: [],
    additionalNotes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store registration data in localStorage
      localStorage.setItem('investorProgress', JSON.stringify({
        ...JSON.parse(localStorage.getItem('investorProgress') || '{}'),
        interestRegistered: true,
        registrationData: formData,
        registrationDate: new Date().toISOString()
      }))

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1121] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Register Your Interest</h1>
          <p className="text-gray-400">Complete this form to begin your investment journey with EquiHome</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#111827] rounded-xl p-8 border border-blue-500/20">
          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLinkedin className="text-gray-500" />
                </div>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Investment Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Investment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Investor Type</label>
                <select
                  name="investorType"
                  value={formData.investorType}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="angel">Angel Investor</option>
                  <option value="vc">Venture Capital</option>
                  <option value="pe">Private Equity</option>
                  <option value="family_office">Family Office</option>
                  <option value="corporate">Corporate Investor</option>
                  <option value="individual">Individual Investor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Investment Range</label>
                <select
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="25-50k">$25,000 - $50,000</option>
                  <option value="50-100k">$50,000 - $100,000</option>
                  <option value="100-250k">$100,000 - $250,000</option>
                  <option value="250-500k">$250,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Investment Timeline</label>
                <select
                  name="investmentTimeline"
                  value={formData.investmentTimeline}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Ready to invest immediately</option>
                  <option value="1-week">Within 1 week</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="3-weeks">Within 3 weeks</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="6-weeks">Within 6 weeks</option>
                  <option value="2-months">Within 2 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Investment Instrument</label>
                <select
                  name="investmentInstrument"
                  value={formData.investmentInstrument}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select instrument</option>
                  <option value="equity">Direct Equity</option>
                  <option value="safe">SAFE (Simple Agreement for Future Equity)</option>
                  <option value="convertible">Convertible Note</option>
                  <option value="preferred">Preferred Shares</option>
                  <option value="revenue">Revenue Share Agreement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Prior Investment Experience</label>
              <textarea
                name="priorInvestments"
                value={formData.priorInvestments}
                onChange={handleInputChange}
                rows={3}
                placeholder="Please describe your previous investment experience in real estate or technology ventures..."
                className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Areas of Interest</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Real Estate Technology',
                  'Property Management',
                  'Blockchain/Web3',
                  'AI/Machine Learning',
                  'PropTech Innovation',
                  'Smart Home Technology'
                ].map((interest) => (
                  <label key={interest} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleCheckboxChange(interest)}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-700 bg-[#0a0f1a] focus:ring-blue-500"
                    />
                    <span className="text-gray-300">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any additional information you'd like to share..."
                className="block w-full px-3 py-2 border border-gray-700 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InterestRegistration 