import{c as x,r as i,b as G,j as e,B as m}from"./index-BAyeVDyF.js";import{C as F,D as k,a as l,b as c,c as d,e as o,d as w}from"./container-CdqfKdXN.js";import{aF as E}from"./mermaid-BFlLVMMm.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],C=x("hash",q);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],L=x("key",Z);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Y=x("rotate-ccw",W);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]],M=x("table",X);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Q=x("zoom-in",J);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],se=x("zoom-out",ee);function te({chart:h,className:g=""}){const r=i.useRef(null),[s,j]=i.useState(1),[R,S]=i.useState(!1),[T,P]=i.useState({x:0,y:0}),[u,I]=i.useState({x:0,y:0}),[f,p]=i.useState(!0),[b,N]=i.useState(!1),{theme:v}=G(),U=t=>t==="dark"?{theme:"dark",themeVariables:{primaryColor:"#3b82f6",primaryTextColor:"#f8fafc",primaryBorderColor:"#1e40af",lineColor:"#64748b",secondaryColor:"#1e293b",tertiaryColor:"#0f172a",background:"#0f172a",mainBkg:"#1e293b",secondBkg:"#334155",tertiaryBkg:"#475569",section0:"#1e293b",section1:"#1e293b",section2:"#1e293b",section3:"#1e293b"}}:{theme:"base",themeVariables:{primaryColor:"#3b82f6",primaryTextColor:"#1f2937",primaryBorderColor:"#1e40af",lineColor:"#6b7280",secondaryColor:"#f3f4f6",tertiaryColor:"#ffffff",background:"#ffffff",mainBkg:"#ffffff",secondBkg:"#f9fafb",tertiaryBkg:"#f3f4f6",section0:"#ffffff",section1:"#f9fafb",section2:"#f3f4f6",section3:"#e5e7eb"}},A=()=>{j(t=>Math.min(t*1.2,3))},D=()=>{j(t=>Math.max(t/1.2,.3))},$=()=>{j(1),I({x:0,y:0})},H=t=>{S(!0),P({x:t.clientX-u.x,y:t.clientY-u.y})},B=t=>{R&&I({x:t.clientX-T.x,y:t.clientY-T.y})},O=()=>{S(!1)},z=t=>{t.preventDefault(),t.deltaY<0?A():D()};return i.useEffect(()=>{if(!r.current||!h)return;let t=!0,_=null;p(!0),N(!1),r.current.innerHTML="";const K=U(v);if(typeof E>"u"){console.error("Mermaid не загружен"),N(!0),p(!1);return}E.initialize({startOnLoad:!1,theme:K.theme,themeVariables:K.themeVariables,er:{useMaxWidth:!0}});const V=`mermaid-${Math.random().toString(36).substr(2,9)}`;return _=setTimeout(()=>{t&&E.render(V,h).then(({svg:y})=>{if(!t||!r.current)return;r.current.innerHTML=y;const n=r.current.querySelector("svg");n&&(n.style.maxWidth="100%",n.style.height="auto",n.style.display="block",n.style.margin="0 auto",v==="dark"&&(n.style.backgroundColor="#0f172a",n.querySelectorAll("*").forEach(a=>{a.tagName==="rect"||a.tagName==="circle"||a.tagName==="ellipse"||a.tagName==="polygon"?(a.style.fill="#1e293b",a.style.stroke="#475569"):a.tagName==="text"?a.style.fill="#f8fafc":a.tagName==="path"&&a.classList.contains("edgePath")&&(a.style.stroke="#64748b",a.style.fill="none")}))),t&&p(!1)}).catch(y=>{t&&(console.error("Ошибка рендеринга Mermaid диаграммы:",y),N(!0),p(!1),r.current&&(r.current.innerHTML=`<div class="text-red-500 text-center py-8">
            <p>Ошибка загрузки диаграммы</p>
            <p class="text-xs mt-2">${y.message}</p>
          </div>`))})},100),()=>{t=!1,_&&clearTimeout(_)}},[h,v]),e.jsxs("div",{className:`relative ${g}`,children:[!f&&!b&&e.jsxs("div",{className:"absolute top-4 right-4 z-10 flex gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border",children:[e.jsx(m,{variant:"outline",size:"sm",onClick:D,disabled:s<=.3,className:"h-8 w-8 p-0",children:e.jsx(se,{className:"h-4 w-4 text-foreground"})}),e.jsxs("div",{className:"flex items-center px-2 text-sm font-medium min-w-[60px] justify-center",children:[Math.round(s*100),"%"]}),e.jsx(m,{variant:"outline",size:"sm",onClick:A,disabled:s>=3,className:"h-8 w-8 p-0",children:e.jsx(Q,{className:"h-4 w-4 text-foreground"})}),e.jsx(m,{variant:"outline",size:"sm",onClick:$,className:"h-8 w-8 p-0",children:e.jsx(Y,{className:"h-4 w-4 text-foreground"})})]}),e.jsxs("div",{className:"overflow-hidden cursor-grab active:cursor-grabbing bg-card border border-border relative rounded-md w-full h-[800px]",onMouseDown:H,onMouseMove:B,onMouseUp:O,onMouseLeave:O,onWheel:z,children:[f&&e.jsx("div",{className:"flex items-center justify-center h-full w-full",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Загрузка диаграммы..."})]})}),b&&e.jsx("div",{className:"flex items-center justify-center h-full w-full min-h-[800px] w-full",children:e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-red-500 mb-2",children:"Ошибка загрузки диаграммы"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Попробуйте обновить страницу"})]})}),e.jsx("div",{ref:r,className:"mermaid-diagram",style:{transform:`scale(${s}) translate(${u.x/s}px, ${u.y/s}px)`,transformOrigin:"center center",transition:R?"none":"transform 0.2s ease",display:f?"none":"flex",justifyContent:"center",alignItems:"center",height:"800px",width:"100%",padding:"20px"}})]}),!f&&!b&&e.jsx("div",{className:"absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm rounded px-2 py-1 border",children:"Используйте колесико мыши для зума, перетаскивайте для перемещения"})]})}function ae(){const h=`erDiagram
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
    ITEMS ||--o{ ORDER_ITEMS : "item_id"`,g=[{name:"categories",description:"Категории товаров с поддержкой иерархии",columns:9,rows:25,indexes:6},{name:"items",description:"Каталог товаров",columns:12,rows:500,indexes:7},{name:"item_categories",description:"Связь товаров и категорий (многие ко многим)",columns:5,rows:750,indexes:4},{name:"customers",description:"Клиенты системы",columns:12,rows:150,indexes:6},{name:"orders",description:"Заказы клиентов",columns:14,rows:1200,indexes:6},{name:"order_items",description:"Позиции заказов",columns:8,rows:3500,indexes:5}],r=[{name:"id",type:"INTEGER",nullable:!1,key:"PRI"},{name:"username",type:"VARCHAR(50)",nullable:!1,key:"UNI"},{name:"email",type:"VARCHAR(100)",nullable:!1,key:"UNI"},{name:"password_hash",type:"VARCHAR(255)",nullable:!1,key:""},{name:"first_name",type:"VARCHAR(50)",nullable:!0,key:""},{name:"last_name",type:"VARCHAR(50)",nullable:!0,key:""},{name:"created_at",type:"TIMESTAMP",nullable:!1,key:""},{name:"updated_at",type:"TIMESTAMP",nullable:!1,key:""}];return e.jsx("main",{className:"flex-1 py-4 sm:py-6 min-h-[calc(100vh-6rem)]",children:e.jsxs(F,{children:[e.jsxs("div",{className:"mb-4 sm:mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3",children:[e.jsx(k,{className:"h-5 w-5 sm:h-6 sm:w-6 text-primary"}),e.jsx("h1",{className:"text-xl sm:text-2xl font-bold",children:"Схема базы данных"})]}),e.jsx("p",{className:"text-muted-foreground",children:"Управление структурой таблиц, индексов и связей в базе данных"})]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6",children:[e.jsxs(l,{children:[e.jsxs(c,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[e.jsx(d,{className:"text-sm font-medium",children:"Таблицы"}),e.jsx(M,{className:"h-4 w-4 text-muted-foreground"})]}),e.jsxs(o,{children:[e.jsx("div",{className:"text-xl font-bold",children:"6"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Активных таблиц"})]})]}),e.jsxs(l,{children:[e.jsxs(c,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[e.jsx(d,{className:"text-sm font-medium",children:"Столбцы"}),e.jsx(L,{className:"h-4 w-4 text-muted-foreground"})]}),e.jsxs(o,{children:[e.jsx("div",{className:"text-xl font-bold",children:"60"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Всего столбцов"})]})]}),e.jsxs(l,{children:[e.jsxs(c,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[e.jsx(d,{className:"text-sm font-medium",children:"Записи"}),e.jsx(k,{className:"h-4 w-4 text-muted-foreground"})]}),e.jsxs(o,{children:[e.jsx("div",{className:"text-xl font-bold",children:"6,125"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Всего записей"})]})]}),e.jsxs(l,{children:[e.jsxs(c,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[e.jsx(d,{className:"text-sm font-medium",children:"Индексы"}),e.jsx(C,{className:"h-4 w-4 text-muted-foreground"})]}),e.jsxs(o,{children:[e.jsx("div",{className:"text-xl font-bold",children:"34"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Всего индексов"})]})]})]}),e.jsxs(l,{className:"mb-4 sm:mb-6 diagram-card",children:[e.jsxs(c,{children:[e.jsx(d,{children:"Диаграмма связей базы данных (ERD)"}),e.jsx(w,{children:"Визуальное представление структуры таблиц и их взаимосвязей"})]}),e.jsx(o,{children:e.jsx(te,{chart:h,className:"w-full"})})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6",children:[e.jsxs(l,{children:[e.jsxs(c,{children:[e.jsx(d,{children:"Таблицы базы данных"}),e.jsx(w,{children:"Список всех таблиц в базе данных"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-4",children:g.map(s=>e.jsxs("div",{className:"flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(M,{className:"h-5 w-5 text-primary"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:s.name}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s.description}),e.jsxs("div",{className:"flex gap-4 text-xs text-muted-foreground mt-1",children:[e.jsxs("span",{children:[s.columns," столбцов"]}),e.jsxs("span",{children:[s.rows," записей"]}),e.jsxs("span",{children:[s.indexes," индексов"]})]})]})]}),e.jsx(m,{variant:"ghost",size:"sm",children:"Просмотр"})]},s.name))})})]}),e.jsxs(l,{children:[e.jsxs(c,{children:[e.jsx(d,{children:"Структура таблицы users"}),e.jsx(w,{children:"Детальная информация о столбцах таблицы users"})]}),e.jsx(o,{children:e.jsx("div",{className:"space-y-2",children:r.map(s=>e.jsxs("div",{className:"flex items-center justify-between p-2 border rounded",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-mono text-sm font-medium",children:s.name}),s.key==="PRI"&&e.jsx(L,{className:"h-3 w-3 text-primary"}),s.key==="UNI"&&e.jsx(C,{className:"h-3 w-3 text-blue-500"})]}),e.jsx("span",{className:"text-sm text-muted-foreground",children:s.type})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[s.nullable&&e.jsx("span",{className:"text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded",children:"NULL"}),s.key&&e.jsx("span",{className:`text-xs px-2 py-1 rounded ${s.key==="PRI"?"bg-red-100 text-red-800":"bg-blue-100 text-blue-800"}`,children:s.key})]})]},s.name))})})]})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs(m,{children:[e.jsx(k,{className:"h-4 w-4 mr-2"}),"Создать таблицу"]}),e.jsxs(m,{variant:"outline",children:[e.jsx(M,{className:"h-4 w-4 mr-2"}),"Импорт схемы"]}),e.jsxs(m,{variant:"outline",children:[e.jsx(C,{className:"h-4 w-4 mr-2"}),"Управление индексами"]})]})]})})}const ce=ae;export{ce as component};
