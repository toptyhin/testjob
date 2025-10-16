import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Database, Search, Copy, Play } from "lucide-react"
import { useState, useEffect } from "react"
import Prism from 'prismjs'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-tomorrow.css'

  // Список запросов с описаниями
  const queryList = [
    {
      id: "customer_orders",
      title: "Сумма заказов по клиентам",
      description: "Получение информации о сумме товаров заказанных под каждого клиента",
    },
    {
      id: "category_hierarchy",
      title: "Иерархия категорий",
      description: "Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры",
    },

  ]

  // SQL запросы и их EXPLAIN планы
  const queries = {
    customer_orders: {
      sql: `-- Получение информации о сумме товаров заказанных под каждого клиента
SELECT 
    c.id,
    c.name as customer_name,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.final_amount), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status != 'cancelled'
GROUP BY c.id, c.name
ORDER BY total_spent DESC;`,
      explain: `
id|select_type|table|type |possible_keys                                                             |key            |key_len|ref        |rows|Extra                                       |
--+-----------+-----+-----+--------------------------------------------------------------------------+---------------+-------+-----------+----+--------------------------------------------+
 1|SIMPLE     |c    |index|                                                                          |idx_name       |1022   |           |15  |Using index; Using temporary; Using filesort|
 1|SIMPLE     |o    |ref  |idx_customer_id,idx_status,idx_orders_customer_date,idx_orders_status_date|idx_customer_id|8      |testdb.c.id|1   |Using where                                 |      
      `
    },
    category_hierarchy: {
      sql: `-- Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры
SELECT 
    parent.name AS 'Категория',
    (
        SELECT COUNT(*) 
        FROM categories child 
        WHERE child.parent_id = parent.id 
        AND child.is_active = TRUE
    ) AS 'Количество дочерних категорий'
FROM categories parent
WHERE parent.is_active = TRUE
ORDER BY parent.level, parent.sort_order;`,
      explain: `
id|select_type       |table |type|possible_keys                                                                             |key                             |key_len|ref             |rows|Extra                   |
--+------------------+------+----+------------------------------------------------------------------------------------------+--------------------------------+-------+----------------+----+------------------------+
 1|PRIMARY           |parent|ref |idx_active_sort,idx_categories_active_level_sort                                          |idx_categories_active_level_sort|1      |const           |144 |Using where; Using index|
 2|DEPENDENT SUBQUERY|child |ref |idx_parent_id,idx_active_sort,idx_categories_parent_level,idx_categories_active_level_sort|idx_parent_id                   |9      |testdb.parent.id|5   |Using where             |      
      `
    },

  }


export function QueriesPage() {
  const [selectedQuery, setSelectedQuery] = useState<string>("customer_orders")
  
  // Инициализация подсветки синтаксиса при изменении выбранного запроса
  useEffect(() => {
    Prism.highlightAll()
  }, [selectedQuery])

  // Функция для копирования SQL в буфер обмена
  const copySQLToClipboard = async () => {
    const sql = queries[selectedQuery as keyof typeof queries]?.sql
    if (sql) {
      try {
        await navigator.clipboard.writeText(sql)
        // Можно добавить уведомление об успешном копировании
      } catch (err) {
        console.error('Ошибка при копировании:', err)
      }
    }
  }

  // Функция для копирования EXPLAIN в буфер обмена
  const copyExplainToClipboard = async () => {
    const explain = queries[selectedQuery as keyof typeof queries]?.explain
    if (explain) {
      try {
        await navigator.clipboard.writeText(explain)
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
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">SQL Запросы</h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Left Block - Query List */}
          <Card className="max-h-[50vh] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Список запросов</CardTitle>
              <CardDescription>
                Выберите запрос для просмотра SQL кода и плана выполнения
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {queryList.map((query) => (
                  <div 
                    key={query.id} 
                    className={`flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                      selectedQuery === query.id ? 'bg-accent border-primary' : ''
                    }`}
                    onClick={() => setSelectedQuery(query.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{query.title}</p>
                        <p className="text-sm text-muted-foreground">{query.description}</p>
                        {/* <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {query.category}
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            query.complexity === 'Низкая' ? 'bg-green-100 text-green-800' :
                            query.complexity === 'Средняя' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {query.complexity}
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-muted-foreground"
                      size="sm"
                      onClick={() => setSelectedQuery(query.id)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Block - SQL Query */}
          <Card className="max-h-[50vh] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SQL Запрос</CardTitle>
                  <CardDescription>
                    {queryList.find(q => q.id === selectedQuery)?.title}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={copySQLToClipboard}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Copy className="h-4 w-4" />
                  Копировать
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  <code className="language-sql">
                    {queries[selectedQuery as keyof typeof queries]?.sql || "Запрос не найден"}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Block - EXPLAIN Plan */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>План выполнения (EXPLAIN)</CardTitle>
                <CardDescription>
                  Анализ производительности выбранного запроса
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={copyExplainToClipboard}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Copy className="h-4 w-4" />
                Копировать
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                <code className="language-sql">
                  {queries[selectedQuery as keyof typeof queries]?.explain || "План выполнения не найден"}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}
