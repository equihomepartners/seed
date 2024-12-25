import { useState, useRef, useEffect } from 'react'
import { FaComments, FaTimes, FaUser, FaCalendar, FaArrowRight } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const getContextFromPath = (pathname: string) => {
  switch (pathname) {
    case '/pitch':
      return `You are currently in the Business Pitch section. This section provides a complete overview of Equihome's business model, vision, and investment opportunity. Feel free to ask about our business model, team, market opportunity, or investment thesis.`
    case '/book-call':
      return `You are currently in the Investment Discussion section. Here you can schedule a private call with our team to discuss investment opportunities. I can help you understand what to expect from the call or assist with scheduling.`
    case '/portfolio':
      return `You are currently in the Tech Demo section. This section showcases our AI-driven platform and portfolio OS. Note: This section requires completing the investment discussion first.`
    case '/deal-room':
      return `You are currently in the Deal Room section. This contains detailed investment documents and financial models. Note: This section requires completing the tech demo first.`
    default:
      return `You are in the main Launchpad section. This is your central hub for exploring investment opportunities with Equihome. You can access various sections like Business Pitch, Investment Discussion, Tech Demo, and Deal Room from here.`
  }
}

const systemPromptTemplate = (currentContext: string) => `You are the Equihome AI Agent. Keep all responses to 3 sentences or less.

CURRENT CONTEXT:
${currentContext}

CORE BUSINESS MODEL:
- We manage a residential mortgage fund deploying institutional capital
- Our mortgages have a floor rate plus property upside sharing
- No monthly payments required from homeowners

TWO DISTINCT OPPORTUNITIES:
1. Operational Company (Equihome Partners)
   - Building Australia's leading fund manager
   - Value through technology and scale
   - Current $5M raise to grow the business

2. Fund Investment (Institutional Only)
   - Returns from mortgages and property upside
   - $500M sovereign commitment
   - Premium Sydney house focus

INVESTMENT STRUCTURE:
- SAFE (Simple Agreement for Future Equity)
  • Most common startup investment vehicle in US
  • $50,000 minimum
  • 18-26x+ potential ROI
  
- Convertible Note
  • $100,000 minimum
  • 8% interest rate
  • 15-22x+ potential ROI
  
- Direct Equity
  • $250,000 minimum
  • Immediate shareholder rights
  • 8-18x+ potential ROI

PLATFORM SECTIONS:
1. Business Pitch (/pitch)
   - Complete business overview
   - Investment strategy
   - Team and backing

2. Investment Discussion (/book-call)
   - Schedule team consultation
   - Investment structure details
   - Due diligence process

3. Tech Demo (/portfolio) [Requires Investment Discussion]
   - AI Underwriting Engine
   - Portfolio Intelligence
   - Market Predictions

4. Deal Room (/deal-room) [Requires Tech Demo]
   - Financial Models
   - Term Sheets
   - Due Diligence Pack

RESPONSE STYLE:
- Maximum 3 sentences per response
- Simple, clear language
- Guide users to relevant sections based on their questions

KEY RULES:
1. Never mix up operational company vs fund returns
2. No specific return numbers beyond what's listed
3. For fund queries, direct to institutional team
4. Keep responses brief and clear
5. Guide users to relevant sections
6. If unsure, suggest booking a call

When asked about scheduling:
"Would you like to book a call with our team? Just share your preferred time (Sydney time), email, and what you'd like to discuss."

For locked sections:
"That section requires completing previous steps first. Let's start with the Business Pitch and Investment Discussion to get you access."`;

const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string}>>([{
    type: 'bot',
    text: `Hi! I'm Simon, your Equihome Business Agent. Ask me any questions you have about Equihome.`
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { type: 'user' as const, text: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const currentContext = getContextFromPath(location.pathname);
      const response = await axios.post('http://localhost:3001/api/chat', {
        messages: [
          { role: 'system', content: systemPromptTemplate(currentContext) },
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
    } catch (error) {
      console.error('Chat error:', error)
      const errorResponse = {
        type: 'bot' as const,
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or book a call with our team for immediate assistance."
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-gray-50 rounded-2xl p-4 shadow-lg transition-all duration-300 flex items-center gap-3 border border-gray-200 group"
        >
          <div className="w-10 h-10 flex-shrink-0">
            <img src="/Equihome Logo.png" alt="Equihome" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-900">Ask Simon</div>
            <div className="text-xs text-gray-500">about Equihome</div>
          </div>
          <FaArrowRight className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl w-[420px] max-w-full border border-gray-100 overflow-hidden">
          <div className="flex items-center p-6 border-b border-gray-100">
            <div className="w-8 h-8 flex-shrink-0">
              <img src="/Equihome Logo.png" alt="Equihome" className="w-full h-full object-contain" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Simon</h3>
              <p className="text-gray-500">Equihome Business Agent</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-400 text-lg" />
            </button>
          </div>
          
          <div className="relative">
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'url("/Equihome Logo.png")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '25%',
                opacity: 0.03
              }}
            />
            <div 
              className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white relative" 
              ref={messagesEndRef}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-6 flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-t-2xl rounded-l-2xl'
                        : 'bg-gray-100 text-gray-800 rounded-t-2xl rounded-r-2xl'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'user' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-blue-100">You</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex-shrink-0">
                            <img src="/Equihome Logo.png" alt="Simon" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-xs font-medium text-gray-600">Simon</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-6">
                  <div className="bg-gray-100 p-4 rounded-t-2xl rounded-r-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 flex-shrink-0">
                        <img src="/Equihome Logo.png" alt="Simon" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Simon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-100">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Simon anything..."
                className="w-full p-4 pr-12 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <FaArrowRight className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot 