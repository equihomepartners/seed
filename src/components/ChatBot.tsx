import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes } from 'react-icons/fa'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', text: string}>>([
    {
      type: 'bot',
      text: 'Hello! I can help you learn more about Equihome Partners. What would you like to know about?'
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const topics = {
    'business model': `Equihome Partners provides home equity investments without monthly payments. We take a share of future appreciation in exchange for upfront capital.`,
    'deal structure': `Our typical investment structure includes:
    - 3% upfront fee
    - 5% simple interest (no monthly payments)
    - Term up to 10 years
    - Share in property appreciation`,
    'market opportunity': `Australia has a $5.5T untapped home equity market. Homeowners are looking for alternatives to traditional lending.`,
    'investment terms': `We offer flexible terms:
    - Investments up to $2M
    - No monthly payments
    - Early exit options
    - Fair appreciation sharing`,
    'example deals': `Our Neutral Bay case study shows:
    - Property Value: $2.3M
    - Investment: $650K
    - Term: 4.5 years
    - Projected IRR: 15-20%`,
    'team': `Our team combines expertise in:
    - Property technology
    - Financial services
    - Risk management
    - Data analytics`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { type: 'user' as const, text: inputValue }
    setMessages(prev => [...prev, userMessage])

    // Find matching topic
    const matchingTopic = Object.entries(topics).find(([key]) => 
      inputValue.toLowerCase().includes(key)
    )

    const botResponse = {
      type: 'bot' as const,
      text: matchingTopic 
        ? matchingTopic[1]
        : `I'm not sure about that specific topic. Would you like to know about our business model, deal structure, market opportunity, investment terms, example deals, or our team?`
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse])
    }, 500)

    setInputValue('')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaComments className="text-2xl" />
        <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 w-96 h-[32rem] bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Equihome AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about Equihome..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
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