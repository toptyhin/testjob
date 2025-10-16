import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { FileText, Database, ShoppingCart, Mail } from "lucide-react"

export function TaskPage() {
  return (
    <main className="flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-xl font-bold tracking-tight mb-3 text-primary">
            Тестовое задание - PHP разработчик
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto">
            Описание задания для кандидата на позицию PHP разработчика
          </p>
        </div>

        {/* Основная информация о задании */}
        <Card className="mb-6 text-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <p>Общая информация</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Срок выполнения:</h3>
              <p className="text-muted-foreground">Неделя</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Куда отправлять:</h3>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">@EMAIL_HERE</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Требования к отправке:</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• В теме письма указать: "Фамилия Имя - PHP разработчик"</li>
                <li>• В теле письма только ссылка на Git репозиторий</li>
                <li>• Принимаются только ссылки на репозитории</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Задание 1: Схема БД */}
        <Card className="mb-6 text-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              1. Проектирование схемы БД
            </CardTitle>
            <CardDescription>
              Обязательно прикреплять к письму
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Тип модели данных:</h3>
              <p className="text-muted-foreground">Реляционная</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Сущности:</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-1">1.1. Номенклатура</h4>
                  <p className="text-muted-foreground text-sm">наименование, кол-во, цена</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-1">1.2. Каталог номенклатуры/Дерево категорий</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Необходимо хранить данные о категориях товара, при этом сами категории могут иметь неограниченный уровень вложенности
                  </p>
                  <div className="bg-muted-foreground p-3 rounded-lg text-sidebar">
                    <p className="text-sm font-medium mb-2">Пример дерева категорий:</p>
                    <pre className="text-xs whitespace-pre-wrap">
{`Бытовая техника
  Стиральные машины
  Холодильники
    однокамерные
    двухкамерные
  Телевизоры
  …
Компьютеры
  Ноутбуки
    17"
    19"
    ...
  Моноблоки
  …`}
                    </pre>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Схема данных категорий номенклатуры должна безболезненно позволять добавлять категории любого уровня вложенности. На этапе проектирования максимальный уровень вложенности неизвестен.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-1">1.3. Клиенты</h4>
                  <p className="text-muted-foreground text-sm">наименование, адрес</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-1">1.4. Заказы покупателей</h4>
                  <p className="text-muted-foreground text-sm">Необходимо предусмотреть возможность делать заказ из разного набора товаров.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Важно:</strong> Продумать схему БД, бизнес логику описывать не требуется.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Задание 2: SQL запросы */}
        <Card className="mb-6 text-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              2. SQL запросы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium mb-1">2.1. Получение информации о сумме товаров заказанных под каждого клиента</h4>
                <p className="text-muted-foreground text-sm">Наименование клиента, сумма</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium mb-1">2.2. Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры</h4>
                <div className="bg-muted-foreground p-3 rounded-lg mt-2 text-sidebar">
                  <p className="text-sm font-medium mb-2">Пример:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Категория</th>
                          <th className="text-left p-2">Количество дочерних</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Бытовая техника</td>
                          <td className="p-2">3</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Стиральные машины</td>
                          <td className="p-2">0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Холодильники</td>
                          <td className="p-2">2</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">однокамерные</td>
                          <td className="p-2">0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">двухкамерные</td>
                          <td className="p-2">0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Телевизоры</td>
                          <td className="p-2">0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Компьютеры</td>
                          <td className="p-2">2</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Ноутбуки</td>
                          <td className="p-2">2</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Моноблоки</td>
                          <td className="p-2">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Результат выполнения */}
        <Card className="text-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Результат выполнения задания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Датологическая схема данных</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>SQL запросы по пункту 2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
