import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="py-12">
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 tt. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com/toptyhin/testjob" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
                GitHub <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
