/**
 * DGX Spark Chat API
 * OpenAI-compatible inference endpoint
 */

// ============================================
// CONFIGURE YOUR DGX SPARK CONNECTION HERE
// ============================================
const DGX_IP = "172.16.80.104"
const DGX_PORT = 8000
const MODEL_NAME = "meta/llama-3.1-8b-instruct"
// ============================================

const CHAT_ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`

const SYSTEM_PROMPT = `You are a helpful AI assistant at the DGX Spark Hackathon. Keep responses concise and helpful.`

/**
 * Stream chat completions from DGX Spark
 */
export async function streamChatCompletion(messages, onChunk) {
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 2048,
      temperature: 0.7,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (!line.startsWith('data: ') || line === 'data: [DONE]') continue
      try {
        const content = JSON.parse(line.slice(6)).choices?.[0]?.delta?.content
        if (content) onChunk(content)
      } catch {}
    }
  }
}
