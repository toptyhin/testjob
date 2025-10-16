import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
    >
      {theme === 'light' ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
      <span className="sr-only">
        {theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
      </span>
    </Button>
  )
}
