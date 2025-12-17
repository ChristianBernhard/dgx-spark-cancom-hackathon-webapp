/**
 * Chat API - Azure OpenAI Integration
 * 
 * TODO (DGX Spark):
 * ═══════════════════════════════════════════════════════════════════════════
 * Replace Azure OpenAI endpoint with DGX Spark hosted LLM.
 * This app assumes OpenAI-compatible Chat Completions API.
 * 
 * For DGX Spark, update the following:
 * 
 * 1. Change ENDPOINT to your DGX Spark inference URL:
 *    const ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`
 * 
 * 2. Remove or update the API key header:
 *    - Azure uses: 'api-key': API_KEY
 *    - DGX Spark typically uses: 'Authorization': `Bearer ${API_KEY}` (or none)
 * 
 * 3. Update the model name in the request body:
 *    - Azure: model is specified in the URL deployment
 *    - DGX Spark: model: "nvidia/nemotron-nano-9b-v2" (or your loaded model)
 * 
 * Example DGX Spark configuration:
 * ```
 * const DGX_IP = "172.16.80.193" #172.16.80.193
 * const DGX_PORT = 8000
 * const ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`
 * const MODEL_NAME = "nvidia/nemotron-nano-9b-v2"
 * ```
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Azure OpenAI Configuration (from environment)
const AZURE_ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT
const API_KEY = import.meta.env.VITE_AZURE_OPENAI_API_KEY
const DEPLOYMENT = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o'

// Construct the full endpoint URL
// TODO (DGX Spark): Replace with direct endpoint like `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`
const CHAT_ENDPOINT = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`

/**
 * System prompt for the assistant
 * Feel free to customize this for your hackathon use case!
 */
const SYSTEM_PROMPT = `You are a helpful, friendly AI assistant at the DGX Spark Hackathon. 
You help hackathon participants with coding, brainstorming, and technical questions.
Keep responses concise but informative. Use markdown formatting when helpful.`

/**
 * Stream chat completions from Azure OpenAI (or DGX Spark in the future)
 * 
 * @param {Array} messages - Array of {role, content} message objects
 * @param {Function} onChunk - Callback called with each streamed text chunk
 * @returns {Promise<void>}
 */
export async function streamChatCompletion(messages, onChunk) {
  // Validate configuration
  if (!AZURE_ENDPOINT || !API_KEY) {
    throw new Error('Missing Azure OpenAI configuration. Please set VITE_AZURE_OPENAI_ENDPOINT and VITE_AZURE_OPENAI_API_KEY in your .env file.')
  }

  // Prepare messages with system prompt
  const apiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ]

  // TODO (DGX Spark): Update headers for your inference server
  // Azure uses 'api-key', DGX Spark may use 'Authorization: Bearer' or no auth
  const headers = {
    'Content-Type': 'application/json',
    'api-key': API_KEY, // TODO (DGX Spark): Change to 'Authorization': `Bearer ${API_KEY}` or remove
  }

  const body = {
    messages: apiMessages,
    // TODO (DGX Spark): Add 'model' field for DGX Spark: model: "nvidia/nemotron-nano-9b-v2"
    max_tokens: 2048,
    temperature: 0.7,
    top_p: 0.9,
    stream: true,
  }

  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error:', errorText)
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  // Handle streaming response
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    
    // Process complete SSE messages
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // Keep incomplete line in buffer

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue
      
      const data = trimmed.slice(6) // Remove 'data: ' prefix
      if (data === '[DONE]') continue

      try {
        const parsed = JSON.parse(data)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) {
          onChunk(content)
        }
      } catch (e) {
        // Ignore parse errors for incomplete chunks
      }
    }
  }

  // Process any remaining buffer
  if (buffer.trim()) {
    const trimmed = buffer.trim()
    if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
      try {
        const parsed = JSON.parse(trimmed.slice(6))
        const content = parsed.choices?.[0]?.delta?.content
        if (content) {
          onChunk(content)
        }
      } catch (e) {
        // Ignore
      }
    }
  }
}

