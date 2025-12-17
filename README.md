# ⚡ DGX Spark Hackathon Starter

A beautiful, minimal chatbot web app for your hackathon project. Built with React, Tailwind CSS, and streaming AI responses.

**This is your starting point.** Get chatting in minutes, then swap in your own DGX Spark model when you're ready!

![Hackathon Ready](https://img.shields.io/badge/Hackathon-Ready-76B900?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

---

## 🚀 Quick Start

### 1. Copy the environment file

```bash
cp .env.example .env
```

### 2. Add your Azure OpenAI API key

Edit `.env` and fill in your credentials:

```env
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
VITE_AZURE_OPENAI_API_KEY=your-api-key-here
VITE_AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the dev server

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
| `VITE_COMPANY_NAME` | "Powered by" text | `Your Company Name` |
| `VITE_PRIMARY_COLOR` | Accent color (hex) | `#76B900` |

Perfect for LinkedIn screenshots! 📸

---

## 🔌 Connect Your DGX Spark Model

This starter uses Azure OpenAI by default, but it's designed to work with any **OpenAI-compatible API**.

### Switching to DGX Spark

1. Open `src/api/chat.js`
2. Find the `TODO (DGX Spark)` comments
3. Update the endpoint and headers:

```js
// Before (Azure)
const CHAT_ENDPOINT = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`

// After (DGX Spark)
const DGX_IP = "172.16.80.193"
const DGX_PORT = 8000
const CHAT_ENDPOINT = `http://${DGX_IP}:${DGX_PORT}/v1/chat/completions`
```

4. Update the request body to include the model:

```js
const body = {
  model: "nvidia/nemotron-nano-9b-v2", // Add this!
  messages: apiMessages,
  // ... rest stays the same
}
```

5. Update headers (DGX Spark may not require auth):

```js
const headers = {
  'Content-Type': 'application/json',
  // 'api-key': API_KEY,  // Remove for DGX Spark
}
```

That's it! The streaming response format is OpenAI-compatible.

---

## 📁 Project Structure

```
spark-hackathon/
├── src/
│   ├── api/
│   │   └── chat.js          # 👈 API integration (edit for DGX Spark)
│   ├── components/
│   │   ├── ChatInput.jsx    # Input field
│   │   ├── ChatMessage.jsx  # Message bubbles
│   │   └── Header.jsx       # Branding header
│   ├── hooks/
│   │   └── useChat.js       # Chat state management
│   ├── App.jsx              # Main app
│   ├── index.css            # Styles
│   └── main.jsx             # Entry point
├── .env.example             # Environment template
└── README.md                # You are here!
```

---

## 🛠️ Tech Stack

- **Vite** - Lightning fast dev server
- **React 18** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Streaming SSE** - Real-time token streaming

---

## 💡 Hackathon Tips

1. **Keep it simple** - This starter has everything you need, don't over-engineer
2. **Focus on your idea** - The chat UI is ready, spend time on what makes your project unique
3. **Test streaming early** - Make sure your DGX Spark model streams responses correctly
4. **Screenshot mode** - Customize the header for impressive demo screenshots!

---

## 📜 License

MIT - Go wild! 🎉

---

**Built with ❤️ for the DGX Spark Hackathon**

