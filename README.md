# Examen Final Progra 4 - Proyectos Universitarios

## Clave del estudiante

STUDENT_KEY: `2511101ALLC`

Regla: Día(DD) + Mes(MM) + últimos 3 del DPI + iniciales en mayúsculas.

## Backend (Django + DRF)

- Ejecutar migraciones:

```bash
.\.venv\Scripts\python manage.py migrate
```

- Levantar servidor:

```bash
.\.venv\Scripts\python manage.py runserver
```

Endpoints:
- `GET/POST /api/projects/`
- `GET/PUT/PATCH/DELETE /api/projects/<id>/`
- Filtro por estado: `/api/projects/?status=pending|in_review|approved`

## Frontend (Vite + React)

- Instalar dependencias:

```bash
cd frontend && npm install
```

- Ejecutar en desarrollo:

```bash
npm run dev
```

Abrir `http://localhost:5173`.

La constante `STUDENT_KEY` está en `frontend/src/api/client.js`.


