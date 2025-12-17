# ⚡ DGX Spark Hackathon Starter

A minimal chatbot for the **DGX Spark Hackathon** by **Cancom**.

---

## 🚀 Quick Start

### 1. Serve your model on the Spark

👉 https://build.nvidia.com/spark/nim-llm/instructions

### 2. Configure your Spark connection

Edit `src/api/chat.js` (lines 9-11):

```js
const DGX_IP = "172.16.80.104"   // Run on Spark: hostname -I | awk '{print $1}'
const DGX_PORT = 8000            // Default Spark port
const MODEL_NAME = "meta/llama-3.1-8b-instruct"  // Change accordingly
```

### 3. Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🎨 Customization

Edit `.env` to customize branding:

```env
VITE_APP_TITLE=DGX Spark Hackathon
VITE_COMPANY_NAME=Your Company Name
VITE_PRIMARY_COLOR=#ff0035
```

Edit the values and take a screenshot for LinkedIn! 📸

---

## 📁 Project Structure

```
src/
├── api/chat.js       # 👈 Spark connection (edit this!)
├── components/       # UI components
├── hooks/useChat.js  # Chat state
└── App.jsx           # Main app
```

---

**Built with ❤️ for the DGX Spark Hackathon @ Cancom**
