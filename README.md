# coverage-x-assessment

## Run with Docker

Requirements: Docker and Docker Compose.

Services started:
- MySQL 8 (empty root password), database `to_do_coverage_x`
- Backend (Node/Express, built in container)
- Frontend (Vite build served by Nginx)

Commands:

```bash
docker compose build
docker compose up -d
```

URLs:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

Environment details:
- MySQL user: `root`
- MySQL password: empty
- MySQL database: `to_do_coverage_x`
- Backend `DATABASE_URL`: `mysql://root@db:3306/to_do_coverage_x`
- Frontend build arg `VITE_API_BASE_URL` is set to `http://back-end:3000/` in compose (adjust if needed)

To stop:

```bash
docker compose down
```
