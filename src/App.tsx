import { Main } from './components/main'

export function App() {
  return (
    <div className="min-h-screen">
      <main
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - var(--footer-height) - var(--logo-height))' }}
      >
        <Main />
      </main>
    </div>
  )
}
