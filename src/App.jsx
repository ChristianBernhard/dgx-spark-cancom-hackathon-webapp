import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import Header from './components/Header'
import { useChat } from './hooks/useChat'

function App() {
  const { messages, isStreaming, sendMessage, clearMessages } = useChat()
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full w-full bg-ambient noise flex flex-col relative">
      {/* Header */}
      <Header onClear={clearMessages} messageCount={messages.length} />

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message} 
                isLast={index === messages.length - 1}
              />
            ))
          )}
          
          {/* Streaming indicator */}
          {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex items-center gap-2 px-4 py-3 message-enter">
              <div className="flex gap-1.5">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <span className="text-sm text-zinc-500 ml-2">Thinking...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={isStreaming} />
    </div>
  )
}

function EmptyState() {
  const suggestions = [
    "What can you help me with?",
    "Explain quantum computing simply",
    "Write a haiku about AI",
    "Help me brainstorm project ideas"
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-spark-gray border border-spark-gray-light flex items-center justify-center mb-6 shadow-glow-sm">
        <svg className="w-10 h-10 text-spark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </div>

      {/* Welcome text */}
      <h2 className="text-2xl font-display font-semibold text-white mb-2">
        Start a conversation
      </h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        Ask me anything! I'm here to help with coding, ideas, explanations, and more.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            className="px-4 py-2 rounded-full glass text-sm text-zinc-300 hover:text-white hover:border-spark-primary/50 transition-all duration-200 hover:shadow-glow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App

