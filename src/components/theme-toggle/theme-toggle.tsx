import { useTheme } from '../../state/theme'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="mt-4 rounded-lg border border-[var(--control-border)] bg-[var(--control-bg)] px-4 py-2 text-2xl transition-all hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  )
}
