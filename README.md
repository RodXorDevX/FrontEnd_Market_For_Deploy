# FrontEnd Marketplace

Frontend de la aplicación Marketplace Trends - Una plataforma de e-commerce moderna para comprar y vender productos.

## 🚀 Tecnologías

- **React 18** - Biblioteca JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de desarrollo y build ultrarrápida
- **React Router DOM** - Enrutamiento declarativo para React
- **React Bootstrap** - Biblioteca de componentes Bootstrap para React
- **React Icons** - Biblioteca de iconos para React
- **Axios** - Cliente HTTP basado en promesas
- **CSS3** - Hojas de estilo en cascada
- **ESLint** - Herramienta de linting para JavaScript

## 📁 Estructura del Proyecto

```
FrontEnd_Market_For_Deploy/
├── public/              # Archivos estáticos públicos
│   └── index.html      # Plantilla HTML principal
├── src/                # Código fuente de la aplicación
│   ├── assets/         # Recursos estáticos
│   │   ├── css/        # Hojas de estilo
│   │   ├── img/        # Imágenes y avatares
│   │   └── icons/      # Iconos personalizados
│   ├── components/     # Componentes React reutilizables
│   │   ├── CardProducto.jsx
│   │   ├── GaleriaPublicaciones.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/          # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── FormularioPublicacion.jsx
│   │   └── ...
│   ├── api/            # Configuración de la API
│   │   └── index.js
│   ├── config.js       # Variables de configuración
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
└── README.md           # Este archivo
```

## 🛠️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RodrigoCQ4/FrontEnd_Market_For_Deploy.git
   cd FrontEnd_Market_For_Deploy
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Editar el archivo `.env` con la URL de tu backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 📱 Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Inicio de sesión con email y contraseña
- Gestión de perfiles de usuario
- Sistema de avatares con imágenes PNG

### Gestión de Productos
- Visualización de catálogo de productos
- Búsqueda y filtrado por categorías
- Creación de nuevas publicaciones
- Edición y eliminación de productos propios
- Sistema de calificación de productos

### Carrito de Compras
- Agregar productos al carrito
- Visualización del carrito
- Gestión de cantidades
- Proceso de checkout

### Navegación
- Menú responsive para dispositivos móviles
- Barra de navegación con logo y enlaces
- Footer con enlaces a redes sociales
- Sistema de rutas protegidas

## 🎨 Componentes Principales

### Navbar
- Logo animado con efecto de viento
- Menú hamburguesa para móviles
- Carrito de compras flotante
- Avatar de usuario autenticado
- Enlaces a login, register y perfil

### Footer
- Información de contacto
- Enlaces a redes sociales (YouTube, TikTok, etc.)
- Animaciones wave en los iconos
- Diseño responsivo

### Galería de Productos
- Grid de productos con diseño responsive
- Cards de producto con información completa
- Sistema de categorías dinámicas
- Búsqueda en tiempo real

### Formulario de Publicación
- Campos para título, descripción, precio
- Selección de categorías desde API
- Gestión de stock
- Subida de imágenes mediante URL

## 🎯 Estilos CSS

### Características
- Diseño responsive con Media Queries
- Animaciones CSS personalizadas (wind-blow, wave-float, pendulum-swing)
- Gradientes modernos y efectos visuales
- Layouts Flexbox y Grid
- Variables CSS para consistencia

### Tema
- Paleta de colores principal: Azul oscuro (#151c33, #1a2747)
- Color de acento: Amarillo dorado (#ffcc00)
- Fuentes: Kantumruy (títulos), Inter (texto)
- Sombras y efectos de profundidad

## 🔐 Variables de Entorno

Las siguientes variables de entorno son necesarias:

```env
VITE_API_URL=http://localhost:3000    # URL del backend API
```

## 🔒 Seguridad

- **Variables de entorno:** Las credenciales se almacenan en `.env` (excluido en `.gitignore`)
- **Sanitización de datos:** Validación de entradas de usuario
- **Tokens JWT:** Almacenamiento seguro en localStorage
- **CORS:** Configurado para comunicación segura con el backend

## 🧪 Scripts de Demo

Para propósitos de desarrollo y demostración:

**Nota:** Los scripts de demo están excluidos del control de versiones por seguridad.

## 🚀 Despliegue

### Producción (Netlify)
- Build estático optimizado
- Variables de entorno configuradas
- Dominio personalizado: `marketplace-trends.netlify.app`

### Desarrollo Local
- Servidor de desarrollo con hot reload
- Proxy configurado para API
- Herramientas de desarrollador integradas

## 📡 Integración con Backend

La aplicación se integra con el backend a través de:

- **API RESTful** con endpoints para usuarios, productos, categorías, carrito y pedidos
- **Axios** para solicitudes HTTP con manejo de errores
- **Tokens JWT** para autenticación
- **Manejo de estados** con React Hooks

## 🎨 Personalización

### Avatares
- Sistema de avatares PNG en `/src/assets/img/avatares/`
- Asignación automática según ID de usuario
- Soporte para imágenes personalizadas

### Iconos
- Uso de React Icons para consistencia visual
- Iconos animados con CSS
- Paleta de colores coherente con el tema

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribuyentes

- RodrigoCQ4 - Desarrollador principal

## 📧 Contacto

Para soporte o preguntas, contactar a: [tu-email@ejemplo.com]

## 🚀 Build y Producción

```bash
# Para producción
npm run build

# Previsualizar build
npm run preview

# Linting del código
npm run lint
```