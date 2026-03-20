# Business Process - Server

## Requisitos Previos

- **Node.js**: v18 o superior.
- **PostgreSQL**: Instancia local o remota.
- **npm**: Gestor de paquetes.

## Configuración de la Base de Datos

1. Crea una base de datos.
2. Ejecuta el archivo `schema.sql` para crear las tablas necesarias:
   ```bash
   psql -U tu_usuario -d nombre_db -f schema.sql
   ```

## Instalación

1. Clona el repositorio y navega a la carpeta `/server`.
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz de la carpeta `/server`:

```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_DATABASE=nombre_db
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3000
```

## Ejecución

### Desarrollo (con auto-reload)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`.

## Estructura del Proyecto

- `/controllers`: Lógica de negocio y manejo de la base de datos.
- `/routes`: Definición de endpoints y enrutamiento.
- `blockchain.js`: Utilidad para la generación de hashes encadenados.
- `db.js`: Configuración de la conexión a PostgreSQL.
- `app.js`: Punto de entrada y configuración de middleware.
