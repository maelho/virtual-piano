import { Main } from './components/main'
import { ThemeContextProvider } from './state/theme'

export function App() {
  return (
    <ThemeContextProvider>
      <div className="min-h-screen bg-[var(--app-bg)] text-[var(--text-primary)]">
        <main
          className="flex items-center justify-center"
          style={{ minHeight: 'calc(100vh - var(--footer-height) - var(--logo-height))' }}
        >
          <Main />
        </main>
      </div>
    </ThemeContextProvider>
  )
}
