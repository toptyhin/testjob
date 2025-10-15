import{c as _,r as m,j as e,B as t}from"./index-BQftvtGg.js";import{C as f,a as c,b as l,c as n,d,e as o,D as u}from"./container-DiY02G0_.js";import{P as N,C as h}from"./prism-tomorrow-DU0zbxxT.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],v=_("play",y);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],E=_("search",b),p=[{id:"customer_orders",title:"Сумма заказов по клиентам",description:"Получение информации о сумме товаров заказанных под каждого клиента"},{id:"category_hierarchy",title:"Иерархия категорий",description:"Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры"}],r={customer_orders:{sql:`-- Получение информации о сумме товаров заказанных под каждого клиента
SELECT 
    c.id,
    c.name as customer_name,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.final_amount), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status != 'cancelled'
GROUP BY c.id, c.name
ORDER BY total_spent DESC;`,explain:`
id|select_type|table|type |possible_keys                                                             |key            |key_len|ref        |rows|Extra                                       |
--+-----------+-----+-----+--------------------------------------------------------------------------+---------------+-------+-----------+----+--------------------------------------------+
 1|SIMPLE     |c    |index|                                                                          |idx_name       |1022   |           |15  |Using index; Using temporary; Using filesort|
 1|SIMPLE     |o    |ref  |idx_customer_id,idx_status,idx_orders_customer_date,idx_orders_status_date|idx_customer_id|8      |testdb.c.id|1   |Using where                                 |      
      `},category_hierarchy:{sql:`-- Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры
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
ORDER BY parent.level, parent.sort_order;`,explain:`
id|select_type       |table |type|possible_keys                                                                             |key                             |key_len|ref             |rows|Extra                   |
--+------------------+------+----+------------------------------------------------------------------------------------------+--------------------------------+-------+----------------+----+------------------------+
 1|PRIMARY           |parent|ref |idx_active_sort,idx_categories_active_level_sort                                          |idx_categories_active_level_sort|1      |const           |144 |Using where; Using index|
 2|DEPENDENT SUBQUERY|child |ref |idx_parent_id,idx_active_sort,idx_categories_parent_level,idx_categories_active_level_sort|idx_parent_id                   |9      |testdb.parent.id|5   |Using where             |      
      `}};function w(){const[a,x]=m.useState("customer_orders");m.useEffect(()=>{N.highlightAll()},[a]);const j=async()=>{const s=r[a]?.sql;if(s)try{await navigator.clipboard.writeText(s)}catch(i){console.error("Ошибка при копировании:",i)}},g=async()=>{const s=r[a]?.explain;if(s)try{await navigator.clipboard.writeText(s)}catch(i){console.error("Ошибка при копировании:",i)}};return e.jsx("main",{className:"flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]",children:e.jsxs(f,{children:[e.jsx("div",{className:"mb-4 sm:mb-6",children:e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3",children:[e.jsx(E,{className:"h-5 w-5 sm:h-6 sm:w-6 text-primary"}),e.jsx("h1",{className:"text-xl sm:text-2xl font-bold",children:"SQL Запросы"})]})}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6",children:[e.jsxs(c,{className:"max-h-[50vh] flex flex-col",children:[e.jsxs(l,{className:"flex-shrink-0",children:[e.jsx(n,{children:"Список запросов"}),e.jsx(d,{children:"Выберите запрос для просмотра SQL кода и плана выполнения"})]}),e.jsx(o,{className:"flex-1 overflow-y-auto",children:e.jsx("div",{className:"space-y-4",children:p.map(s=>e.jsxs("div",{className:`flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${a===s.id?"bg-accent border-primary":""}`,onClick:()=>x(s.id),children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(u,{className:"h-5 w-5 text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:s.title}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s.description})]})]}),e.jsx(t,{variant:"outline",className:"text-muted-foreground",size:"sm",onClick:()=>x(s.id),children:e.jsx(v,{className:"h-4 w-4"})})]},s.id))})})]}),e.jsxs(c,{className:"max-h-[50vh] flex flex-col",children:[e.jsx(l,{className:"flex-shrink-0",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(n,{children:"SQL Запрос"}),e.jsx(d,{children:p.find(s=>s.id===a)?.title})]}),e.jsxs(t,{variant:"outline",size:"sm",onClick:j,className:"flex items-center gap-2 text-muted-foreground",children:[e.jsx(h,{className:"h-4 w-4"}),"Копировать"]})]})}),e.jsx(o,{className:"flex-1 overflow-y-auto",children:e.jsx("div",{className:"p-4 rounded-lg bg-gray-50 dark:bg-gray-900",children:e.jsx("pre",{className:"text-sm font-mono overflow-x-auto whitespace-pre-wrap",children:e.jsx("code",{className:"language-sql",children:r[a]?.sql||"Запрос не найден"})})})})]})]}),e.jsxs(c,{className:"mb-4 sm:mb-6",children:[e.jsx(l,{children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx(n,{children:"План выполнения (EXPLAIN)"}),e.jsx(d,{children:"Анализ производительности выбранного запроса"})]}),e.jsxs(t,{variant:"outline",size:"sm",onClick:g,className:"flex items-center gap-2 text-muted-foreground",children:[e.jsx(h,{className:"h-4 w-4"}),"Копировать"]})]})}),e.jsx(o,{children:e.jsx("div",{className:"p-4 rounded-lg bg-gray-50 dark:bg-gray-900",children:e.jsx("pre",{className:"text-sm font-mono overflow-x-auto whitespace-pre-wrap",children:e.jsx("code",{className:"language-sql",children:r[a]?.explain||"План выполнения не найден"})})})})]})]})})}const R=w;export{R as component};
