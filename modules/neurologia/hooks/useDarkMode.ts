import { useTheme } from '../../../utils/theme'

export function useDarkMode() {
  const { theme, toggleTheme } = useTheme()

  const setTheme = (next: 'dark' | 'light') => {
    if (next !== theme) {
      toggleTheme()
    }
  }

  return { theme, setTheme }
}
