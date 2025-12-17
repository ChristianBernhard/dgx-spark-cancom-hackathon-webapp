/**
 * Header Component
 * Displays app title and company branding - perfect for LinkedIn screenshots!
 */

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'DGX Spark Hackathon'
const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || 'Your Company'

export default function Header({ onClear, messageCount }) {
  return (
    <header className="flex-shrink-0 px-6 py-4 border-b border-spark-gray-light/50">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          {/* Logo icon */}
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-glow-sm" style={{ background: 'linear-gradient(to bottom right, var(--primary-color), var(--primary-color-light))' }}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          {/* Title stack */}
          <div>
            <h1 className="text-xl font-display font-bold tracking-tight">
              <span className="gradient-text">{APP_TITLE}</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-zinc-500">Attended by</span>
              <span className="text-xs font-medium text-zinc-400">{COMPANY_NAME}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Clear button */}
          {messageCount > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-spark-gray hover:bg-spark-gray-light border border-spark-gray-light hover:border-spark-gray-lighter text-zinc-400 hover:text-white transition-all duration-200 text-sm"
              title="Clear conversation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          {/* GitHub link placeholder */}
          <a
            href="https://github.com/ChristianBernhard/dgx-spark-cancom-hackathon-webapp"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-spark-gray hover:bg-spark-gray-light border border-spark-gray-light hover:border-spark-gray-lighter text-zinc-400 hover:text-white transition-all duration-200"
            title="View on GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

