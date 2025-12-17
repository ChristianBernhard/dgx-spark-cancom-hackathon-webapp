/**
 * Chat Message Component
 * Renders user and assistant messages with distinct styling
 */

export default function ChatMessage({ message, isLast }) {
  const isUser = message.role === 'user'
  const isError = message.isError

  return (
    <div 
      className={`message-enter flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`
          max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3
          ${isUser 
            ? 'bg-spark-primary text-white rounded-br-md' 
            : isError
              ? 'bg-red-950/50 border border-red-900/50 text-red-200 rounded-bl-md'
              : 'bg-spark-gray border border-spark-gray-light text-zinc-100 rounded-bl-md'
          }
        `}
      >
        {/* Role indicator for assistant */}
        {!isUser && !isError && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-spark-gray-light/50">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--primary-color), var(--primary-color-light))' }}>
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-zinc-400">Assistant</span>
          </div>
        )}

        {/* Error indicator */}
        {isError && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-900/30">
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs font-medium text-red-400">Error</span>
          </div>
        )}

        {/* Message content */}
        <div className={`text-[15px] leading-relaxed whitespace-pre-wrap break-words ${isUser ? '' : 'prose-invert'}`}>
          {message.content || (
            <span className="text-zinc-500 italic">Generating response...</span>
          )}
        </div>
      </div>
    </div>
  )
}

