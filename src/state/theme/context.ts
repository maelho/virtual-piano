import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export type ContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ContextValue>({
  theme: 'dark',
  setTheme() {},
})

export const useTheme = () => useContext(ThemeContext)
