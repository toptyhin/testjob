import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "@tanstack/react-router"
import { ExternalLink } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sidebar-primary">
            <Link 
              to="/" 
              className="text-sm font-medium"
            >
              Главная
            </Link>
            <Link 
              to="/database-schema" 
              className="text-sm font-medium"
            >
              База данных
            </Link>
            <Link 
              to="/queries" 
              className="text-sm font-medium"
            >
              Запросы
            </Link>
            <a href="https://github.com/toptyhin/testjob" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
              GitHub <ExternalLink className="h-3 w-3 ml-1" />
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
