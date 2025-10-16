import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { MermaidDiagram } from "@/components/ui/mermaid-diagram"
import { Database, Table as TableIcon, Key, Hash, Copy } from "lucide-react"
import { useState, useEffect } from "react"
import Prism from 'prismjs'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-tomorrow.css'

const erdDiagram = `erDiagram
CATEGORIES {
    int id PK "Уникальный идентификатор категории"
    varchar name "Наименование категории"
    int parent_id FK "Идентификатор родительской категории"
    tinyint level "Уровень вложенности"
    varchar path "Полный путь категории"
    int sort_order "Порядок сортировки"
    boolean is_active "Активна ли категория"
    timestamp created_at "Дата создания"
    timestamp updated_at "Дата обновления"
}

ITEMS {
    int id PK "Уникальный идентификатор товара"
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
    int id PK "Уникальный идентификатор связи"
    int item_id FK "Идентификатор товара"
    int category_id FK "Идентификатор категории"
    int sort_order "Порядок сортировки товара в категории"
    timestamp created_at "Дата создания связи"
}

CUSTOMERS {
    int id PK "Уникальный идентификатор клиента"
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
    int id PK "Уникальный идентификатор заказа"
    int customer_id FK "Идентификатор клиента"
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
    int id PK "Уникальный идентификатор позиции заказа"
    int order_id FK "Идентификатор заказа"
    int item_id FK "Идентификатор товара"
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

// DDL для всех таблиц
const tableDDL = {
categories: `CREATE TABLE categories (
id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор категории',
name varchar(255) NOT NULL COMMENT 'Наименование категории',
parent_id int(11) unsigned DEFAULT NULL COMMENT 'Идентификатор родительской категории (NULL для корневых)',
level tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT 'Уровень вложенности (0 - корневой)',
path varchar(1000) NOT NULL COMMENT 'Полный путь категории (например: /1/5/12/)',
sort_order int(11) NOT NULL DEFAULT 0 COMMENT 'Порядок сортировки в рамках родительской категории',
is_active tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Активна ли категория',
created_at timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Дата создания',
updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Дата последнего обновления',
PRIMARY KEY (id),
KEY idx_parent_id (parent_id),
KEY idx_level (level),
KEY idx_path (path(255)),
KEY idx_active_sort (is_active,sort_order),
KEY idx_name (name),
KEY idx_categories_parent_level (parent_id,level),
KEY idx_categories_active_level_sort (is_active,level,sort_order,id,name),
CONSTRAINT categories_ibfk_1 FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

items: `CREATE TABLE items (
id int(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
description TEXT NULL,
price DECIMAL(10,2) NOT NULL,
quantity INT NOT NULL DEFAULT 0,
sku VARCHAR(100) NOT NULL,
barcode VARCHAR(50) NULL,
weight DECIMAL(8,3) NULL,
dimensions VARCHAR(100) NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
UNIQUE KEY uk_items_sku (sku),
UNIQUE KEY uk_items_barcode (barcode),
KEY idx_items_name (name),
KEY idx_items_price (price),
KEY idx_items_quantity (quantity),
KEY idx_items_is_active (is_active),
KEY idx_items_created_at (created_at)
KEY idx_items_price_range (price,is_active),
FULLTEXT KEY idx_items_search (name,description),
CONSTRAINT chk_price_positive CHECK (price > 0),
CONSTRAINT chk_quantity_non_negative CHECK (quantity >= 0),
CONSTRAINT chk_weight_positive CHECK (weight IS NULL OR weight > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

item_categories: `CREATE TABLE item_categories (
id int(11) NOT NULL AUTO_INCREMENT,
item_id int(11) NOT NULL,
category_id int(11) NOT NULL,
sort_order INT NOT NULL DEFAULT 0,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
UNIQUE KEY uk_item_categories_item_category (item_id, category_id),
KEY idx_item_categories_item_id (item_id),
KEY idx_item_categories_category_id (category_id),
KEY idx_item_categories_sort_order (sort_order),
CONSTRAINT fk_item_categories_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
CONSTRAINT fk_item_categories_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

customers: `CREATE TABLE customers (
id int(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
contact_person VARCHAR(255) NULL,
email VARCHAR(100) NOT NULL,
phone VARCHAR(20) NULL,
address TEXT NULL,
city VARCHAR(100) NULL,
postal_code VARCHAR(20) NULL,
country VARCHAR(100) NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
UNIQUE KEY uk_customers_email (email),
KEY idx_customers_name (name),
KEY idx_customers_contact_person (contact_person),
KEY idx_customers_phone (phone),
KEY idx_customers_city (city),
KEY idx_customers_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

orders: `CREATE TABLE orders (
id int(11) NOT NULL AUTO_INCREMENT,
customer_id int(11) NOT NULL,
order_number VARCHAR(50) NOT NULL,
order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
final_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
shipping_address TEXT NULL,
billing_address TEXT NULL,
notes TEXT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
UNIQUE KEY uk_orders_order_number (order_number),
KEY idx_orders_customer_id (customer_id),
KEY idx_orders_order_date (order_date),
KEY idx_orders_status (status),
KEY idx_orders_total_amount (total_amount),
KEY idx_orders_created_at (created_at),
CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

order_items: `CREATE TABLE order_items (
id int(11) NOT NULL AUTO_INCREMENT,
order_id int(11) NOT NULL,
item_id int(11) NOT NULL,
quantity int(11) NOT NULL,
unit_price DECIMAL(10,2) NOT NULL,
total_price DECIMAL(10,2) NOT NULL,
discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0.00,
discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
KEY idx_order_items_order_id (order_id),
KEY idx_order_items_item_id (item_id),
KEY idx_order_items_quantity (quantity),
KEY idx_order_items_unit_price (unit_price),
KEY idx_order_items_total_price (total_price),
CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
CONSTRAINT fk_order_items_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,


}

// Структуры столбцов для всех таблиц
const tableColumns = {
categories: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "name", type: "VARCHAR(255)", nullable: false, key: "" },
  { name: "parent_id", type: "INT", nullable: true, key: "FK" },
  { name: "level", type: "TINYINT", nullable: false, key: "" },
  { name: "path", type: "VARCHAR(1000)", nullable: false, key: "" },
  { name: "sort_order", type: "INT", nullable: false, key: "" },
  { name: "is_active", type: "BOOLEAN", nullable: false, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" },
  { name: "updated_at", type: "TIMESTAMP", nullable: false, key: "" }
],
items: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "name", type: "VARCHAR(255)", nullable: false, key: "" },
  { name: "description", type: "TEXT", nullable: true, key: "" },
  { name: "price", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "quantity", type: "INT", nullable: false, key: "" },
  { name: "sku", type: "VARCHAR(100)", nullable: false, key: "UNI" },
  { name: "barcode", type: "VARCHAR(50)", nullable: true, key: "UNI" },
  { name: "weight", type: "DECIMAL(8,3)", nullable: true, key: "" },
  { name: "dimensions", type: "VARCHAR(100)", nullable: true, key: "" },
  { name: "is_active", type: "BOOLEAN", nullable: false, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" },
  { name: "updated_at", type: "TIMESTAMP", nullable: false, key: "" }
],
item_categories: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "item_id", type: "INT", nullable: false, key: "FK" },
  { name: "category_id", type: "INT", nullable: false, key: "FK" },
  { name: "sort_order", type: "INT", nullable: false, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" }
],
customers: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "name", type: "VARCHAR(255)", nullable: false, key: "" },
  { name: "contact_person", type: "VARCHAR(255)", nullable: true, key: "" },
  { name: "email", type: "VARCHAR(100)", nullable: false, key: "UNI" },
  { name: "phone", type: "VARCHAR(20)", nullable: true, key: "" },
  { name: "address", type: "TEXT", nullable: true, key: "" },
  { name: "city", type: "VARCHAR(100)", nullable: true, key: "" },
  { name: "postal_code", type: "VARCHAR(20)", nullable: true, key: "" },
  { name: "country", type: "VARCHAR(100)", nullable: true, key: "" },
  { name: "is_active", type: "BOOLEAN", nullable: false, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" },
  { name: "updated_at", type: "TIMESTAMP", nullable: false, key: "" }
],
orders: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "customer_id", type: "INT", nullable: false, key: "FK" },
  { name: "order_number", type: "VARCHAR(50)", nullable: false, key: "UNI" },
  { name: "order_date", type: "TIMESTAMP", nullable: false, key: "" },
  { name: "status", type: "ENUM", nullable: false, key: "" },
  { name: "total_amount", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "discount_amount", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "tax_amount", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "final_amount", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "shipping_address", type: "TEXT", nullable: true, key: "" },
  { name: "billing_address", type: "TEXT", nullable: true, key: "" },
  { name: "notes", type: "TEXT", nullable: true, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" },
  { name: "updated_at", type: "TIMESTAMP", nullable: false, key: "" }
],
order_items: [
  { name: "id", type: "INT", nullable: false, key: "PRI" },
  { name: "order_id", type: "INT", nullable: false, key: "FK" },
  { name: "item_id", type: "INT", nullable: false, key: "FK" },
  { name: "quantity", type: "INT", nullable: false, key: "" },
  { name: "unit_price", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "total_price", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "discount_percent", type: "DECIMAL(5,2)", nullable: false, key: "" },
  { name: "discount_amount", type: "DECIMAL(10,2)", nullable: false, key: "" },
  { name: "created_at", type: "TIMESTAMP", nullable: false, key: "" }
],
}


export function DatabaseSchemaPage() {
  const [selectedTable, setSelectedTable] = useState<string>("items")
  
  // Инициализация подсветки синтаксиса при изменении выбранной таблицы
  useEffect(() => {
    Prism.highlightAll()
  }, [selectedTable])

  // Функция для копирования DDL в буфер обмена
  const copyDDLToClipboard = async () => {
    const ddl = tableDDL[selectedTable as keyof typeof tableDDL]
    if (ddl) {
      try {
        await navigator.clipboard.writeText(ddl)
        // Можно добавить уведомление об успешном копировании
      } catch (err) {
        console.error('Ошибка при копировании:', err)
      }
    }
  }
  
  return (
    <main className="flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]">
      <Container>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">Схема базы данных</h1>
          </div>
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
                    <Button 
                      variant="outline" 
                      className="text-muted-foreground"
                      size="sm"
                      onClick={() => setSelectedTable(table.name)}
                    >
                      Просмотр
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Структура таблицы {selectedTable}</CardTitle>
              <CardDescription>
                Детальная информация о столбцах таблицы {selectedTable}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(tableColumns[selectedTable as keyof typeof tableColumns] || []).map((column) => (
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

        {/* DDL Display */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>DDL таблицы {selectedTable}</CardTitle>
                <CardDescription>
                  SQL-код для создания таблицы {selectedTable}
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={copyDDLToClipboard}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Copy className="h-4 w-4" />
                Копировать
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
              <code className="language-sql">
                {tableDDL[selectedTable as keyof typeof tableDDL] || "DDL не найден"}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
