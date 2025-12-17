import { useState, useRef, useEffect } from 'react'

/**
 * Chat Input Component
 * Fixed at bottom, auto-resizing textarea with send button
 */

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }, [input])

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex-shrink-0 border-t border-spark-gray-light/50 bg-spark-darker/80 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 p-2 rounded-2xl bg-spark-gray border border-spark-gray-light focus-within:border-spark-primary/50 focus-within:shadow-glow-sm transition-all duration-200">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-zinc-500 resize-none outline-none text-[15px] leading-relaxed px-2 py-2 max-h-[200px] disabled:opacity-50"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="flex-shrink-0 p-3 rounded-xl bg-spark-primary hover:bg-spark-primary-dark disabled:bg-spark-gray-light disabled:cursor-not-allowed text-white transition-all duration-200 btn-glow disabled:shadow-none"
            >
              {disabled ? (
                // Loading spinner
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                // Send icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Hint text */}
          <p className="text-xs text-zinc-600 mt-2 text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-spark-gray border border-spark-gray-light text-zinc-400 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-spark-gray border border-spark-gray-light text-zinc-400 font-mono text-[10px]">Shift + Enter</kbd> for new line
          </p>
        </form>
      </div>
    </div>
  )
}

