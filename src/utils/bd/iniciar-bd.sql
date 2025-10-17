-- ==============================
--  ROLES Y USUARIOS
-- ==============================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,  -- 'admin', 'manager', 'user'
  description TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  FERIAS / EVENTOS
-- ==============================
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150),
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  INDUSTRIAS
-- ==============================
CREATE TABLE industries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- ==============================
--  PROVEEDORES
-- ==============================
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  contact_name VARCHAR(100),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  booth_number VARCHAR(50),
  presentation TEXT,  -- carta o descripción (IA más adelante)
  industry_id INT REFERENCES industries(id),
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  CATEGORÍAS DE PRODUCTOS
-- ==============================
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- ==============================
--  VISITAS A STANDS
-- ==============================
CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  supplier_id INT REFERENCES suppliers(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id),
  event_id INT REFERENCES events(id),
  visit_date TIMESTAMP DEFAULT now(),
  notes TEXT,
  general_mood VARCHAR(50), -- "excelente", "regular", etc.
  created_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  PRODUCTOS
-- ==============================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  supplier_id INT REFERENCES suppliers(id) ON DELETE CASCADE,
  visit_id INT REFERENCES visits(id) ON DELETE SET NULL, -- visita en la que se registró
  category_id INT REFERENCES product_categories(id),
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(12,2),
  currency VARCHAR(10) DEFAULT 'USD',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  HISTORIAL DE PRECIOS
-- ==============================
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  visit_id INT REFERENCES visits(id) ON DELETE CASCADE,
  old_price NUMERIC(12,2),
  new_price NUMERIC(12,2),
  currency VARCHAR(10) DEFAULT 'USD',
  change_date TIMESTAMP DEFAULT now(),
  notes TEXT
);

-- ==============================
--  IMÁGENES (del stand, proveedor, producto)
-- ==============================
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  supplier_id INT REFERENCES suppliers(id) ON DELETE CASCADE,
  visit_id INT REFERENCES visits(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  user_id INT REFERENCES users(id),
  url TEXT NOT NULL, -- puede ser S3, Firebase o ruta local
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- ==============================
--  FAVORITOS / DESTACADOS
-- ==============================
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  supplier_id INT REFERENCES suppliers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (user_id, supplier_id)  -- no se repiten favoritos
);

-- ==============================
--  AUDITORÍA / LOG DE ACCIONES
-- ==============================
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  entity_type VARCHAR(50),  -- 'supplier', 'visit', 'product', etc.
  entity_id INT,
  action VARCHAR(50),       -- 'CREATE', 'UPDATE', 'DELETE'
  description TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);