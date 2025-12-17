import { useState, useCallback } from 'react'
import { streamChatCompletion } from '../api/chat'

/**
 * Custom hook for managing chat state and streaming responses
 * 
 * TODO (DGX Spark):
 * This hook uses Azure OpenAI by default. When switching to DGX Spark:
 * 1. Update the streamChatCompletion function in src/api/chat.js
 * 2. The message format remains OpenAI-compatible
 * 3. Only the endpoint and auth mechanism need to change
 */
export function useChat() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isStreaming) return

    // Add user message
    const userMessage = { role: 'user', content: content.trim() }
    setMessages(prev => [...prev, userMessage])
    setIsStreaming(true)

    // Prepare messages for API (include conversation history)
    const apiMessages = [...messages, userMessage]

    try {
      // Add empty assistant message that will be streamed into
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      // Stream the response
      await streamChatCompletion(apiMessages, (chunk) => {
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage.role === 'assistant') {
            lastMessage.content += chunk
          }
          return newMessages
        })
      })
    } catch (error) {
      console.error('Chat error:', error)
      
      // Update the last message with error
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage.role === 'assistant' && !lastMessage.content) {
          lastMessage.content = `Error: ${error.message || 'Failed to get response. Please check your API configuration.'}`
          lastMessage.isError = true
        }
        return newMessages
      })
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isStreaming,
    sendMessage,
    clearMessages
  }
}

