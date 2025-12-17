import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply primary color from env if provided
const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || '#76B900'
document.documentElement.style.setProperty('--primary-color', primaryColor)

// Calculate darker shade and glow
const hex = primaryColor.replace('#', '')
const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 30)
const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 30)
const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 30)
document.documentElement.style.setProperty('--primary-color-dark', `rgb(${r}, ${g}, ${b})`)
document.documentElement.style.setProperty('--primary-color-glow', `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, 0.25)`)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

