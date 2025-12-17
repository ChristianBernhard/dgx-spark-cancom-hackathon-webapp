import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply primary color from env if provided
const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || '#ff0035'
document.documentElement.style.setProperty('--primary-color', primaryColor)

// Calculate color variants from primary
const hex = primaryColor.replace('#', '')
const r = parseInt(hex.slice(0, 2), 16)
const g = parseInt(hex.slice(2, 4), 16)
const b = parseInt(hex.slice(4, 6), 16)

// Lighter shade (add toward white)
const rLight = Math.min(255, r + 60)
const gLight = Math.min(255, g + 60)
const bLight = Math.min(255, b + 60)
document.documentElement.style.setProperty('--primary-color-light', `rgb(${rLight}, ${gLight}, ${bLight})`)

// Darker shade
const rDark = Math.max(0, r - 30)
const gDark = Math.max(0, g - 30)
const bDark = Math.max(0, b - 30)
document.documentElement.style.setProperty('--primary-color-dark', `rgb(${rDark}, ${gDark}, ${bDark})`)

// Glow effect
document.documentElement.style.setProperty('--primary-color-glow', `rgba(${r}, ${g}, ${b}, 0.25)`)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

