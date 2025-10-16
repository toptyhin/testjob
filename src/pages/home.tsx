import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Database, FileText } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { TaskPage } from "./task"

export function HomePage() {
  const navigate = useNavigate()
  return (
    <main className="flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]">
      <Container>
        <TaskPage />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <Database className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-primary">База данных</CardTitle>
              <CardDescription>
                Управляйте структурой и данными вашей базы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full text-muted-foreground" onClick={() => navigate({ to: "/database-schema" })}>
                Просмотр схемы базы данных
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-primary">SQL Запросы</CardTitle>
              <CardDescription>
                Просмотр SQL запросов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full text-muted-foreground" onClick={() => navigate({ to: "/queries" })}>
                Просмотр запросов
              </Button>
            </CardContent>
          </Card>

        </div>

      </Container>
    </main>
  )
}
