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


# Decisiones Técnicas - Prueba Técnica

## 1. Simulación de Blockchain

Para cumplir con el requisito de "hash encadenado", se implementó una lógica donde cada evento (Creación o Actualización) genera un registro en la tabla `step_history`.

- **Hasing**: Se utiliza SHA-256 (vía el módulo `crypto` de Node.js) para generar los hashes.
- **Encadenamiento**: Cada nuevo registro en el historial incluye el `previous_hash` del registro inmediatamente anterior en la base de datos. Si es el primer registro, se utiliza el valor semilla `'0'`.
- **Integridad**: El hash se genera a partir del contenido del objeto (JSON del paso) más el hash anterior, asegurando que cualquier cambio en la cadena sea detectable.

## 2. Modelo Relacional y Arquitectura

Se ha seguido una **Arquitectura en Capas** para separar responsabilidades y facilitar el mantenimiento:

- **Estructura de Datos**: Se separa el estado actual (`steps`) del historial inmutable (`step_history`).
- **Controladores (Controllers)**: Se extrajo la lógica de negocio de las rutas hacia controladores específicos (`stepController`, `historyController`). Esto limpia las rutas y permite reutilizar código.
- **Variables de Entorno**: Se utiliza un archivo `.env` gestionado por `dotenv` para proteger las credenciales de la base de datos, evitando que información sensible esté expuesta en el código fuente.

## 3. Manejo de Errores

- **Backend**: Se implementó un middleware de error global en `app.js`. Todas las funciones de los controladores usan el patrón `try/catch` y pasan los errores a `next(err)`. El servidor responde con JSON descriptivo y códigos de estado HTTP semánticos (201 para creación, 400 para errores de cliente, 404 para no encontrado).

## 4. Estructura de Rutas y Servicios

- **Organización Modular**: Las rutas están divididas en módulos legibles (`/steps`, `/step_history`).

