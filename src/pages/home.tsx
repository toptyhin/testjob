import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Database, FileText } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

export function HomePage() {
  const navigate = useNavigate()
  return (
    <main className="flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-xl font-bold tracking-tight mb-3 text-primary">
            Добро пожаловать в TestDB
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto">
            Тестовое задание на создание структуры БД
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Button variant="outline" className="text-foreground" size="lg" onClick={() => navigate({ to: "/task" })}>Задача</Button>
          </div>
        </div>

        {/* Features Grid */}
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
              <Button variant="outline" className="w-full text-foreground" onClick={() => navigate({ to: "/database-schema" })}>
                Просмотр схемы базы данных
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-primary">SQL Запросы</CardTitle>
              <CardDescription>
                Выполняйте и сохраняйте SQL запросы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full text-foreground">
                Создать запрос
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Последние запросы</CardTitle>
              <CardDescription>
                Недавно выполненные SQL запросы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">SELECT * FROM users</p>
                    <p className="text-sm text-muted-foreground">2 минуты назад</p>
                  </div>
                  <Button variant="ghost" size="sm">Выполнить</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">INSERT INTO categories...</p>
                    <p className="text-sm text-muted-foreground">15 минут назад</p>
                  </div>
                  <Button variant="ghost" size="sm">Выполнить</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистика базы</CardTitle>
              <CardDescription>
                Общая информация о вашей базе данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Таблицы:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Записи:</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Размер:</span>
                  <span className="font-medium">2.5 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Последнее обновление:</span>
                  <span className="font-medium">Сегодня</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}
