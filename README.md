# Спроектировать схему БД

```sql
-- =====================================================
-- База данных для системы управления товарами и заказами
-- MySQL 8.0+
-- =====================================================

-- Создание базы данных
CREATE DATABASE IF NOT EXISTS testdb 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE testdb;

-- =====================================================
-- ТАБЛИЦА КАТЕГОРИЙ (дерево категорий)
-- =====================================================
CREATE TABLE categories (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор категории',
  `name` varchar(255) NOT NULL COMMENT 'Наименование категории',
  `parent_id` int(11) unsigned DEFAULT NULL COMMENT 'Идентификатор родительской категории (NULL для корневых)',
  `level` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT 'Уровень вложенности (0 - корневой)',
  `path` varchar(1000) NOT NULL COMMENT 'Полный путь категории (например: /1/5/12/)',
  `sort_order` int(11) NOT NULL DEFAULT 0 COMMENT 'Порядок сортировки в рамках родительской категории',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Активна ли категория',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Дата создания',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Дата последнего обновления',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_level` (`level`),
  KEY `idx_path` (`path`(255)),
  KEY `idx_active_sort` (`is_active`,`sort_order`),
  KEY `idx_name` (`name`),
  KEY `idx_categories_parent_level` (`parent_id`,`level`),
  KEY `idx_categories_active_level_sort` (`is_active`,`level`,`sort_order`,`id`,`name`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB 
COMMENT='Таблица категорий товаров с поддержкой неограниченной вложенности';

-- =====================================================
-- ТАБЛИЦА ТОВАРОВ (НОМЕНКЛАТУРА)
-- =====================================================
CREATE TABLE items (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор товара',
    name VARCHAR(500) NOT NULL COMMENT 'Наименование товара',
    description TEXT COMMENT 'Описание товара',
    price DECIMAL(15,2) NOT NULL COMMENT 'Цена товара',
    quantity INT NOT NULL DEFAULT 0 COMMENT 'Количество на складе',
    sku VARCHAR(100) UNIQUE COMMENT 'Артикул товара',
    barcode VARCHAR(50) UNIQUE COMMENT 'Штрих-код товара',
    weight DECIMAL(8,3) COMMENT 'Вес товара в кг',
    dimensions VARCHAR(100) COMMENT 'Размеры товара (например: 100x50x30 см)',
    is_active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Активен ли товар',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата последнего обновления',
    
    PRIMARY KEY (id),
    INDEX idx_name (name),
    INDEX idx_price (price),
    INDEX idx_quantity (quantity),
    INDEX idx_active (is_active),
    INDEX idx_sku (sku),
    INDEX idx_barcode (barcode),
    INDEX idx_created_at (created_at),
    KEY idx_items_active (is_active),
    KEY idx_items_price_range (price,is_active),
    FULLTEXT KEY idx_items_search (name,description),    
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT chk_quantity_non_negative CHECK (quantity >= 0),
    CONSTRAINT chk_weight_positive CHECK (weight IS NULL OR weight > 0)
) ENGINE=InnoDB 
COMMENT='Таблица товаров (номенклатура)';

-- =====================================================
-- ТАБЛИЦА СВЯЗИ ТОВАРОВ И КАТЕГОРИЙ (многие ко многим)
-- =====================================================
CREATE TABLE item_categories (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор связи',
    item_id int(11) UNSIGNED NOT NULL COMMENT 'Идентификатор товара',
    category_id int(11) UNSIGNED NOT NULL COMMENT 'Идентификатор категории',
    sort_order INT NOT NULL DEFAULT 0 COMMENT 'Порядок сортировки товара в категории',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания связи',
    
    PRIMARY KEY (id),
    UNIQUE KEY uk_item_category (item_id, category_id),
    INDEX idx_item_id (item_id),
    INDEX idx_category_id (category_id),
    INDEX idx_sort_order (sort_order),
    
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB 
COMMENT='Таблица связи товаров и категорий (многие ко многим)';

-- =====================================================
-- ТАБЛИЦА КЛИЕНТОВ
-- =====================================================
CREATE TABLE customers (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор клиента',
    name VARCHAR(255) NOT NULL COMMENT 'Наименование клиента',
    contact_person VARCHAR(255) COMMENT 'Контактное лицо',
    email VARCHAR(255) UNIQUE COMMENT 'Email адрес',
    phone VARCHAR(50) COMMENT 'Телефон',
    address TEXT COMMENT 'Адрес',
    city VARCHAR(100) COMMENT 'Город',
    postal_code VARCHAR(20) COMMENT 'Почтовый индекс',
    country VARCHAR(100) COMMENT 'Страна',
    is_active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Активен ли клиент',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата последнего обновления',
    
    PRIMARY KEY (id),
    INDEX idx_name (name),
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_city (city),
    INDEX idx_active (is_active),
    INDEX idx_created_at (created_at),
    
    CONSTRAINT chk_name_length CHECK (CHAR_LENGTH(name) >= 1 AND CHAR_LENGTH(name) <= 255),
    CONSTRAINT chk_email_format CHECK (email IS NULL OR email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
) ENGINE=InnoDB 
COMMENT='Таблица клиентов';

-- =====================================================
-- ТАБЛИЦА ЗАКАЗОВ
-- =====================================================
CREATE TABLE orders (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор заказа',
    customer_id int(11) UNSIGNED NOT NULL COMMENT 'Идентификатор клиента',
    order_number VARCHAR(50) UNIQUE NOT NULL COMMENT 'Номер заказа',
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата заказа',
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') 
           NOT NULL DEFAULT 'pending' COMMENT 'Статус заказа',
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Общая сумма заказа',
    discount_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Сумма скидки',
    tax_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Сумма налога',
    final_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Итоговая сумма к оплате',
    shipping_address TEXT COMMENT 'Адрес доставки',
    billing_address TEXT COMMENT 'Адрес для выставления счета',
    notes TEXT COMMENT 'Примечания к заказу',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Дата последнего обновления',
    
    PRIMARY KEY (id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_order_number (order_number),
    INDEX idx_order_date (order_date),
    INDEX idx_status (status),
    INDEX idx_total_amount (total_amount),
    INDEX idx_created_at (created_at),
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    
    CONSTRAINT chk_total_amount_non_negative CHECK (total_amount >= 0),
    CONSTRAINT chk_discount_amount_non_negative CHECK (discount_amount >= 0),
    CONSTRAINT chk_tax_amount_non_negative CHECK (tax_amount >= 0),
    CONSTRAINT chk_final_amount_non_negative CHECK (final_amount >= 0),
    CONSTRAINT chk_order_number_length CHECK (CHAR_LENGTH(order_number) >= 1 AND CHAR_LENGTH(order_number) <= 50)
) ENGINE=InnoDB 
COMMENT='Таблица заказов';

-- =====================================================
-- ТАБЛИЦА ПОЗИЦИЙ ЗАКАЗА (связь заказов и товаров)
-- =====================================================
CREATE TABLE order_items (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Уникальный идентификатор позиции заказа',
    order_id int(11) UNSIGNED NOT NULL COMMENT 'Идентификатор заказа',
    item_id int(11) UNSIGNED NOT NULL COMMENT 'Идентификатор товара',
    quantity int(11) NOT NULL COMMENT 'Количество товара в заказе',
    unit_price DECIMAL(15,2) NOT NULL COMMENT 'Цена за единицу на момент заказа',
    total_price DECIMAL(15,2) NOT NULL COMMENT 'Общая стоимость позиции',
    discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Процент скидки на позицию',
    discount_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Сумма скидки на позицию',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания',
    
    PRIMARY KEY (id),
    INDEX idx_order_id (order_id),
    INDEX idx_item_id (item_id),
    INDEX idx_quantity (quantity),
    INDEX idx_unit_price (unit_price),
    INDEX idx_total_price (total_price),
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    
    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_unit_price_positive CHECK (unit_price > 0),
    CONSTRAINT chk_total_price_positive CHECK (total_price > 0),
    CONSTRAINT chk_discount_percent_range CHECK (discount_percent >= 0 AND discount_percent <= 100),
    CONSTRAINT chk_discount_amount_non_negative CHECK (discount_amount >= 0),
    CONSTRAINT uk_order_item UNIQUE (order_id, item_id)
) ENGINE=InnoDB 
COMMENT='Таблица позиций заказа (связь заказов и товаров)';

-- =====================================================
-- ДОПОЛНИТЕЛЬНЫЕ ИНДЕКСЫ ДЛЯ ОПТИМИЗАЦИИ
-- =====================================================

-- Составные индексы для частых запросов
CREATE INDEX idx_categories_parent_level ON categories(parent_id, level);
CREATE INDEX idx_items_active ON items(is_active);
CREATE INDEX idx_items_price_range ON items(price, is_active);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX idx_orders_status_date ON orders(status, order_date);
CREATE INDEX idx_order_items_order_total ON order_items(order_id, total_price);

-- Полнотекстовые индексы для поиска
ALTER TABLE items ADD FULLTEXT idx_items_search (name, description);
ALTER TABLE customers ADD FULLTEXT idx_customers_search (name, contact_person, address);


```

## Запросы
Получение информации о сумме товаров заказанных под каждого клиента (Наименование клиента, сумма)
```sql
SELECT 
    c.name as customer_name,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.final_amount), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status != 'cancelled'
GROUP BY c.id, c.name
ORDER BY total_spent DESC;
```

Найти количество дочерних элементов первого уровня вложенности для категорий номенклатуры.

```sql
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
ORDER BY parent.level, parent.sort_order;
```

## Подробная информация:
[Просмотр](https://toptyhin.github.io/testjob/)