# Task Manager (React + Node)

Aplicación de gestión de tareas: un frontend en React (Vite) que consume una API REST en Express con autenticación JWT y persistencia en PostgreSQL vía Prisma.

##  Instalación local

```bash
git clone https://github.com/karlalen/project-react-node.git
cd project-react-node
npm install
cd backend
npm install
cd ..
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_API_URL=
```

Crea un archivo `.env` en `backend/` con las siguientes claves (sin valores reales en este documento):

```
DATABASE_URL=
JWT_SECRET=
PORT=
```

## Comandos disponibles

### Frontend (raíz del proyecto)

| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`     | Levanta el entorno de desarrollo (Vite)    |
| `npm run build`   | Genera el build de producción              |

### Backend (`backend/`)

| Comando        | Descripción                                   |
|----------------|-------------------------------------------------|
| `npm run dev`   | Levanta el servidor Express en modo desarrollo (ts-node-dev) |

##  Base de datos

PostgreSQL con esquema y migraciones gestionados con Prisma (`backend/prisma/schema.prisma`).
# prueba de protección
