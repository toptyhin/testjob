import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { MermaidDiagram } from "@/components/ui/mermaid-diagram"
import { Database, Table as TableIcon, Key, Hash } from "lucide-react"

export function DatabaseSchemaPage() {
  const erdDiagram = `erDiagram
    CATEGORIES {
        bigint id PK "Уникальный идентификатор категории"
        varchar name "Наименование категории"
        bigint parent_id FK "Идентификатор родительской категории"
        tinyint level "Уровень вложенности"
        varchar path "Полный путь категории"
        int sort_order "Порядок сортировки"
        boolean is_active "Активна ли категория"
        timestamp created_at "Дата создания"
        timestamp updated_at "Дата обновления"
    }
    
    ITEMS {
        bigint id PK "Уникальный идентификатор товара"
        varchar name "Наименование товара"
        text description "Описание товара"
        decimal price "Цена товара"
        int quantity "Количество на складе"
        varchar sku UK "Артикул товара"
        varchar barcode UK "Штрих-код товара"
        decimal weight "Вес товара в кг"
        varchar dimensions "Размеры товара"
        boolean is_active "Активен ли товар"
        timestamp created_at "Дата создания"
        timestamp updated_at "Дата обновления"
    }
    
    ITEM_CATEGORIES {
        bigint id PK "Уникальный идентификатор связи"
        bigint item_id FK "Идентификатор товара"
        bigint category_id FK "Идентификатор категории"
        int sort_order "Порядок сортировки товара в категории"
        timestamp created_at "Дата создания связи"
    }
    
    CUSTOMERS {
        bigint id PK "Уникальный идентификатор клиента"
        varchar name "Наименование клиента"
        varchar contact_person "Контактное лицо"
        varchar email UK "Email адрес"
        varchar phone "Телефон"
        text address "Адрес"
        varchar city "Город"
        varchar postal_code "Почтовый индекс"
        varchar country "Страна"
        varchar tax_id "Налоговый номер"
        boolean is_active "Активен ли клиент"
        timestamp created_at "Дата создания"
        timestamp updated_at "Дата обновления"
    }
    
    ORDERS {
        bigint id PK "Уникальный идентификатор заказа"
        bigint customer_id FK "Идентификатор клиента"
        varchar order_number UK "Номер заказа"
        timestamp order_date "Дата заказа"
        enum status "Статус заказа"
        decimal total_amount "Общая сумма заказа"
        decimal discount_amount "Сумма скидки"
        decimal tax_amount "Сумма налога"
        decimal final_amount "Итоговая сумма к оплате"
        text shipping_address "Адрес доставки"
        text billing_address "Адрес для выставления счета"
        text notes "Примечания к заказу"
        timestamp created_at "Дата создания"
        timestamp updated_at "Дата обновления"
    }
    
    ORDER_ITEMS {
        bigint id PK "Уникальный идентификатор позиции заказа"
        bigint order_id FK "Идентификатор заказа"
        bigint item_id FK "Идентификатор товара"
        int quantity "Количество товара в заказе"
        decimal unit_price "Цена за единицу на момент заказа"
        decimal total_price "Общая стоимость позиции"
        decimal discount_percent "Процент скидки на позицию"
        decimal discount_amount "Сумма скидки на позицию"
        timestamp created_at "Дата создания"
    }

    %% Связи между таблицами
    CATEGORIES ||--o{ CATEGORIES : "parent_id (самосвязь)"
    CATEGORIES ||--o{ ITEM_CATEGORIES : "category_id"
    ITEMS ||--o{ ITEM_CATEGORIES : "item_id"
    CUSTOMERS ||--o{ ORDERS : "customer_id"
    ORDERS ||--o{ ORDER_ITEMS : "order_id"
    ITEMS ||--o{ ORDER_ITEMS : "item_id"`

  const tables = [
    {
      name: "categories",
      description: "Категории товаров с поддержкой иерархии",
      columns: 9,
      rows: 25,
      indexes: 6
    },
    {
      name: "items",
      description: "Каталог товаров",
      columns: 12,
      rows: 500,
      indexes: 7
    },
    {
      name: "item_categories",
      description: "Связь товаров и категорий (многие ко многим)",
      columns: 5,
      rows: 750,
      indexes: 4
    },
    {
      name: "customers",
      description: "Клиенты системы",
      columns: 12,
      rows: 150,
      indexes: 6
    },
    {
      name: "orders",
      description: "Заказы клиентов",
      columns: 14,
      rows: 1200,
      indexes: 6
    },
    {
      name: "order_items",
      description: "Позиции заказов",
      columns: 8,
      rows: 3500,
      indexes: 5
    }
  ]

  const columns = [
    { name: "id", type: "INTEGER", nullable: false, key: "PRI" },
    { name: "username", type: "VARCHAR(50)", nullable: false, key: "UNI" },
    { name: "email", type: "VARCHAR(100)", nullable: false, key: "UNI" },
    { name: "password_hash", type: "VARCHAR(255)", nullable: false, key: "" },
    { name: "first_name", type: "VARCHAR(50)", nullable: true, key: "" },
    { name: "last_name", type: "VARCHAR(50)", nullable: true, key: "" },
    { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" },
    { name: "updated_at", type: "TIMESTAMP", nullable: false, key: "" }
  ]

  return (
    <main className="flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]">
      <Container>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">Схема базы данных</h1>
          </div>
          <p className="text-muted-foreground">
            Управление структурой таблиц, индексов и связей в базе данных
          </p>
        </div>

        {/* Database Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Таблицы</CardTitle>
              <TableIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Активных таблиц
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Столбцы</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">60</div>
              <p className="text-xs text-muted-foreground">
                Всего столбцов
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Записи</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">6,125</div>
              <p className="text-xs text-muted-foreground">
                Всего записей
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Индексы</CardTitle>
              <Hash className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">
                Всего индексов
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ERD Diagram */}
        <Card className="mb-4 sm:mb-6 diagram-card">
          <CardHeader>
            <CardTitle>Диаграмма связей базы данных (ERD)</CardTitle>
            <CardDescription>
              Визуальное представление структуры таблиц и их взаимосвязей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MermaidDiagram chart={erdDiagram} className="w-full" />
          </CardContent>
        </Card>

        {/* Tables List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Таблицы базы данных</CardTitle>
              <CardDescription>
                Список всех таблиц в базе данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tables.map((table) => (
                  <div key={table.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <TableIcon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{table.name}</p>
                        <p className="text-sm text-muted-foreground">{table.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>{table.columns} столбцов</span>
                          <span>{table.rows} записей</span>
                          <span>{table.indexes} индексов</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Просмотр
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Структура таблицы users</CardTitle>
              <CardDescription>
                Детальная информация о столбцах таблицы users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={column.name} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">{column.name}</span>
                        {column.key === "PRI" && <Key className="h-3 w-3 text-primary" />}
                        {column.key === "UNI" && <Hash className="h-3 w-3 text-blue-500" />}
                      </div>
                      <span className="text-sm text-muted-foreground">{column.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {column.nullable && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          NULL
                        </span>
                      )}
                      {column.key && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          column.key === "PRI" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {column.key}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button>
            <Database className="h-4 w-4 mr-2" />
            Создать таблицу
          </Button>
          <Button variant="outline">
            <TableIcon className="h-4 w-4 mr-2" />
            Импорт схемы
          </Button>
          <Button variant="outline">
            <Hash className="h-4 w-4 mr-2" />
            Управление индексами
          </Button>
        </div>
      </Container>
    </main>
  )
}
