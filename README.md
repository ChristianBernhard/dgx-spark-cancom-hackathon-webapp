# ⚡ DGX Spark Hackathon Starter

A beautiful, minimal chatbot web app for the **DGX Spark Hackathon** organized by **Cancom**.

Get chatting in minutes — just connect an LLM hosted on the DGX Spark!

![Hackathon Ready](https://img.shields.io/badge/Hackathon-Ready-76B900?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your DGX Spark connection

Open `src/api/chat.js` and set your Spark details:

```js
const DGX_IP = "172.16.80.193"  // Your Spark IP
const DGX_PORT = 8000
const MODEL_NAME = "nvidia/nemotron-nano-9b-v2"  // Your loaded model

const CHAT_ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start chatting! 🎉

---

## 🎨 Customization

Make it yours! Edit `.env` to customize branding:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_TITLE` | Main title in header | `DGX Spark Hackathon` |
| `VITE_COMPANY_NAME` | "Attended by" text | `Your Company Name` |
| `VITE_PRIMARY_COLOR` | Accent color (hex) | `#76B900` |

Edit the values and take a screenshot for LinkedIn!📸 We appreciate you tagging us.

---

## 🔌 DGX Spark Integration

This app uses an **OpenAI-compatible API**, which the DGX Spark inference server provides out of the box.

### Configuration in `src/api/chat.js`

```js
// DGX Spark Configuration
const DGX_IP = "172.16.80.193"
const DGX_PORT = 8000
const MODEL_NAME = "nvidia/nemotron-nano-9b-v2"

const CHAT_ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`

// Headers (no auth needed for local Spark)
const headers = {
  'Content-Type': 'application/json',
}

// Request body
const body = {
  model: MODEL_NAME,
  messages: apiMessages,
  max_tokens: 2048,
  temperature: 0.7,
  stream: true,
}
```

The streaming response format is fully OpenAI-compatible — it just works!

---

## 📁 Project Structure

```
spark-hackathon/
├── src/
│   ├── api/
│   │   └── chat.js          # 👈 DGX Spark connection (edit this!)
│   ├── components/
│   │   ├── ChatInput.jsx    # Input field
│   │   ├── ChatMessage.jsx  # Message bubbles
│   │   └── Header.jsx       # Branding header
│   ├── hooks/
│   │   └── useChat.js       # Chat state management
│   ├── App.jsx              # Main app
│   ├── index.css            # Styles
│   └── main.jsx             # Entry point
└── README.md                # You are here!
```

---

## 🛠️ Tech Stack

- **Vite** - Lightning fast dev server
- **React 18** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Streaming SSE** - Real-time token streaming


---

**Built with ❤️ for the DGX Spark Hackathon @ Cancom**
