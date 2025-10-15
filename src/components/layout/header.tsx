import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "@tanstack/react-router"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
            >
              Главная
            </Link>
            <Link 
              to="/database-schema" 
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
            >
              База данных
            </Link>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Запросы
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Документация
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
