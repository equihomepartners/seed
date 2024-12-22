import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes, FaRobot, FaUser } from 'react-icons/fa'
import axios from 'axios'

const systemPrompt = `You are the Equihome AI Agent. Keep your responses short, clear, and easy to understand - no more than 2-3 sentences unless asked for more detail.

RESPONSE STYLE:
- Keep it simple and jargon-free
- Use everyday language
- Be direct and concise
- Only give detailed technical/financial explanations if specifically asked
- Start with the main point
- Break complex topics into simple parts

CORE KNOWLEDGE:
1. Business Model
   - We invest in Australian homes
   - Partner with property owners
   - Use AI to pick the best properties
   - Manage everything professionally

2. Market Opportunity
   - Large Australian property market
   - Strong growth history
   - Safe investment environment

3. Technology Edge
   - Smart AI for property selection
   - Data-driven decisions
   - Real-time market tracking

4. Investment Highlights
   - Professional property management
   - Focus on major cities
   - Clear reporting
   - Expert team

When someone asks about scheduling:
"I'll help you set up a call with our team. Just share your preferred time (Sydney time), name, email, and what you'd like to discuss."

KEY RULES:
1. Keep responses under 3 sentences unless asked for more
2. Use simple language first, only use technical terms if requested
3. If unsure, offer to connect with the team
4. Be friendly but professional`

const ChatBot = () => {
  // Start with chat open
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string}>>([
    {
      type: 'bot',
      text: `Hi! I'm here to tell you about investing with Equihome. What would you like to know?`
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isError, setIsError] = useState(false)

  // Update system prompt to include enhanced tech messaging
  const enhancedSystemPrompt = systemPrompt + `

TECHNOLOGY EXCELLENCE:
1. Predictive Analytics
   - Market frontrunning capabilities
   - AI-driven portfolio optimization
   - Real-time market movement prediction
   - Risk-return optimization algorithms
   - Automated valuation adjustments

2. Data Advantage
   - Access to 4+ trillion data points
   - Strategic partnerships for data access
   - Real-time property market insights
   - Comprehensive market coverage
   - Historical trend analysis
   - Predictive modeling capabilities

3. Competitive Edge
   - First-mover advantage in tech
   - Proprietary algorithms
   - Real-time market analysis
   - Automated decision-making
   - Scalable infrastructure

When discussing technology, emphasize:
1. Our ability to frontrun market movements
2. Access to vast data through partnerships
3. Predictive analytics capabilities
4. Real-time valuation and analysis
5. Market-leading technological advantage`

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check server health
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/health')
        console.log('Server health:', response.data)
        setIsError(false)
      } catch (error) {
        console.error('Server health check failed:', error)
        setIsError(true)
      }
    }
    checkHealth()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { type: 'user' as const, text: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        messages: [
          { role: 'system', content: enhancedSystemPrompt },
          ...messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: 'user', content: inputValue }
        ]
      })

      const botResponse = {
        type: 'bot' as const,
        text: response.data.message
      }

      setMessages(prev => [...prev, botResponse])
      setIsError(false)
    } catch (error) {
      console.error('Chat error:', error)
      setIsError(true)
      const errorResponse = {
        type: 'bot' as const,
        text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment or reach out to our team directly for immediate assistance."
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat Button - only show when chat is closed */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:bg-blue-700 transition-colors duration-300 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          <FaComments className="text-2xl" />
          <div className="absolute w-3 h-3 bg-blue-400 rounded-full animate-ping" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 w-[400px] h-[550px] bg-[#111827] rounded-xl shadow-2xl overflow-hidden border-2 border-[#2563eb] z-50"
          >
            {/* Header */}
            <div className="bg-[#2563eb] p-4 flex justify-between items-center border-b-2 border-[#2563eb]">
              <div className="flex items-center space-x-3">
                <img
                  src="/Equihome Logo.png"
                  alt="Equihome AI"
                  className="w-8 h-8 rounded-full bg-white p-1"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Investment Advisor</h3>
                  <p className="text-xs text-blue-100">Online 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4 bg-[#111827]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl flex items-start space-x-2 ${
                      message.type === 'user'
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#1f2937] text-white'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <img
                        src="/Equihome Logo.png"
                        alt="Equihome AI"
                        className="w-6 h-6 rounded-full bg-white p-0.5 mt-1 flex-shrink-0"
                      />
                    )}
                    {message.type === 'user' && <FaUser className="mt-1 flex-shrink-0 text-sm" />}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1f2937] text-white p-3 rounded-xl flex items-center space-x-2">
                    <img
                      src="/Equihome Logo.png"
                      alt="Equihome AI"
                      className="w-6 h-6 rounded-full bg-white p-0.5"
                    />
                    <span className="text-sm animate-pulse">Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#1f2937] border-t-2 border-[#2563eb]">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our investment opportunities..."
                  className="flex-1 px-4 py-2 rounded-lg bg-[#111827] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center space-x-1.5 text-sm font-medium"
                >
                  <span>Send</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot 