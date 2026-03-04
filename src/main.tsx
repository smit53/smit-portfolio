import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          background: '#18181b',
          color: '#a1a1aa',
          minHeight: '100vh',
        }}>
          <h1 style={{ color: '#fafafa', marginBottom: '1rem' }}>Something went wrong</h1>
          <pre style={{ overflow: 'auto', fontSize: '14px' }}>{this.state.error.message}</pre>
          <p style={{ marginTop: '1rem', fontSize: '14px' }}>
            If you see this on the live site, try hard refresh (Ctrl+Shift+R) or clear cache.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
