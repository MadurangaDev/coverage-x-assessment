## Coverage X Assessment

Monorepo with a production-ready TypeScript/Node backend (Express + Prisma + MySQL) and a React 19 + Vite frontend. Includes full testing setups, code coverage, Docker/Docker Compose workflows, and prebuilt Docker Hub images.

- GitHub repository: [`MadurangaDev/coverage-x-assessment`](https://github.com/MadurangaDev/coverage-x-assessment.git)

### Stack
- Back-end: Node.js, Express, TypeScript, Prisma (MySQL), Jest + Supertest, Swagger
- Front-end: React 19, Vite 7, TypeScript, MUI, Redux Toolkit, Vitest + Testing Library
- Infra: Docker, Docker Compose, NGINX (frontend runtime), MySQL 8

### Repository layout
```
back-end/           # Express + Prisma API (TypeScript)
front-end/          # React + Vite single-page app
docker-compose.yml  # Full stack (db + backend + frontend)
```

### Default ports
- Backend API: http://localhost:3000/
- Swagger UI: http://localhost:3000/api-docs
- Frontend app: http://localhost:5173/ (dev) or http://localhost:5173/ → NGINX (docker)
- MySQL: localhost:3306 (docker)

---
## 1) Setup with Docker (clone repo + compose) - Recommended

This runs MySQL + backend + frontend together.

Prereqs: Docker and Docker Compose.

```bash
git clone https://github.com/MadurangaDev/coverage-x-assessment.git
cd coverage-x-assessment
docker compose up
```

Services (from `docker-compose.yml`):
- `db` (MySQL 8): exposes 3306, database `to_do_coverage_x`
- `back-end` (Express API): exposes 3000, `DATABASE_URL=mysql://root@db:3306/to_do_coverage_x`
- `front-end` (React + NGINX): exposes 5173 → 80, built with `VITE_API_BASE_URL=http://localhost:3000/`

Access:
- Frontend: http://localhost:5173/
- API: http://localhost:3000/
- Swagger: http://localhost:3000/api-docs

Stop the stack with `Ctrl+C` or run in detached mode: `docker compose up -d`. Tear down: `docker compose down` (add `-v` to remove the database volume).

---

## 2) Setup without Docker (regular codebase)

You can run each app independently. Ensure you have Node.js 18+ and npm 9+.

### Back-end (API)
1) Install deps
```bash
cd back-end
npm install
```

2) Create .env
```env
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/to_do_coverage_x"
NODE_ENV=development
```

3) Prepare DB and Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Develop and test
```bash
npm run dev               # start with nodemon
npm test                  # run tests
npm run test:coverage     # coverage report (coverage/)
```

5) Build and run
```bash
npm run build
npm start                 # serves dist/server.js at PORT (3000)
```

Visit API: http://localhost:3000/ and Swagger: http://localhost:3000/api-docs

### Front-end (SPA)
1) Install deps
```bash
cd front-end
npm install
```

2) Start dev server
```bash
npm run dev
```

The app runs at http://localhost:5173/. By default Axios targets `http://localhost:3000/` (see `src/utils/axiosInstance.ts`). For production builds you can pass `VITE_API_BASE_URL` at build time.

3) Tests and build
```bash
npm run test
npm run coverage
npm run build
npm run preview
```

---

## 3) Run using Docker Hub images

Use prebuilt images (no local build needed):

- Frontend image: `madurangathedeveloper/fronend`
- Backend image:  `madurangathedeveloper/backend`
- Database image: `madurangathedeveloper/coverage-x-db`

Example: run all three with a user-defined network so services can resolve each other.

```bash
# 1) Create a network
docker network create coveragex-net

# 2) Start MySQL (db)
docker run -d --name coveragex-db \
  --network coveragex-net \
  -e MYSQL_DATABASE=to_do_coverage_x \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -p 3306:3306 \
  madurangathedeveloper/coverage-x-db

# 3) Start backend (depends on db)
docker run -d --name coveragex-backend \
  --network coveragex-net \
  -e PORT=3000 \
  -e DATABASE_URL=mysql://root@coveragex-db:3306/to_do_coverage_x \
  -e NODE_ENV=production \
  -p 3000:3000 \
  madurangathedeveloper/backend

# 4) Start frontend (NGINX; set API base URL)
docker run -d --name coveragex-frontend \
  --network coveragex-net \
  -e VITE_API_BASE_URL=http://localhost:3000/ \
  -p 5173:80 \
  madurangathedeveloper/fronend
```

Then visit:
- Frontend: http://localhost:5173/
- API: http://localhost:3000/
- Swagger: http://localhost:3000/api-docs

Notes:
- If your Docker host isn’t localhost (e.g., remote server), replace `http://localhost:3000/` with the reachable host URL and rebuild/regenerate the frontend image if needed.
- Persisting DB: add a `-v` volume to the db container (e.g., `-v coveragex-db:/var/lib/mysql`).

---

## Testing & Coverage

Back-end (from `back-end/`):
```bash
npm test
npm run test:coverage   # writes coverage/ and lcov.info; HTML report in coverage/
```

Front-end (from `front-end/`):
```bash
npm run test
npm run coverage        # writes coverage/ with HTML report
```

HTML coverage reports are also tracked under each app’s `coverage/` directory. The repository includes generated reports under `back-end/coverage/` for convenience.

---

## API quick reference

Base URL: `http://localhost:3000/`

- `GET /tasks` — list with pagination and filters
- `POST /tasks` — create task
- `GET /tasks/:id` — get by id
- `PUT /tasks/:id` — update task
- `DELETE /tasks/:id` — soft delete

Interactive docs: `http://localhost:3000/api-docs`

---

## Developer notes

- Prisma commands (backend):
```bash
npx prisma generate
npx prisma migrate dev --name <name>
npx prisma migrate deploy
npx prisma studio
```

- Frontend API base URL
  - Dev uses `src/utils/axiosInstance.ts` (defaults to `http://localhost:3000/`).
  - Docker builds accept `VITE_API_BASE_URL` build arg/env.

---

## License
MIT

---

References: [`GitHub – MadurangaDev/coverage-x-assessment`](https://github.com/MadurangaDev/coverage-x-assessment.git)

---

## Optional: Run individual containers (without Compose)

### Run only the database (MySQL 8)
```bash
docker run -d \
  --name coveragex-db \
  -e MYSQL_DATABASE=to_do_coverage_x \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -p 3306:3306 \
  -v coveragex_db_data:/var/lib/mysql \
  mysql:8.0
```

### Back-end container (connect to host MySQL)
Build from repo root and run:
```bash
docker build -t coveragex-backend ./back-end

docker run -d \
  --name coveragex-backend \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="mysql://root@host.docker.internal:3306/to_do_coverage_x" \
  coveragex-backend
```

Or, if DB is also a container on a shared network:
```bash
docker network create coveragex || true

docker run -d --name coveragex-db --network coveragex \
  -e MYSQL_DATABASE=to_do_coverage_x -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -v coveragex_db_data:/var/lib/mysql mysql:8.0

docker run -d --name coveragex-backend --network coveragex -p 3000:3000 \
  -e PORT=3000 -e NODE_ENV=production \
  -e DATABASE_URL="mysql://root@coveragex-db:3306/to_do_coverage_x" \
  coveragex-backend
```

### Front-end container (NGINX serving production build)
```bash
docker build -t coveragex-frontend \
  --build-arg VITE_API_BASE_URL=http://localhost:3000/ \
  ./front-end

docker run -d \
  --name coveragex-frontend \
  -p 5173:80 \
  coveragex-frontend
```

---

## Useful scripts

Back-end (from `back-end/`)
```bash
npm run dev            # start API in dev (nodemon)
npm run build          # compile TypeScript
npm start              # run compiled server
npm test               # run Jest tests
npm run test:coverage  # coverage report
```

Front-end (from `front-end/`)
```bash
npm run dev       # start Vite dev server
npm run build     # type-check and build
npm run preview   # preview production build
npm run test      # run unit tests (Vitest)
```

---

## Troubleshooting

- If the API container cannot reach host MySQL on Windows, use `host.docker.internal` in `DATABASE_URL`.
- Ensure ports `3000` (API), `5173` (frontend), and `3306` (MySQL) are free.
- Prisma migration issues inside containers: remove the DB volume and retry
  - `docker compose down -v` (Compose) or `docker volume rm coveragex_db_data` (manual).
- If the frontend calls the wrong API URL in Docker Hub mode, rebuild the frontend image with the correct `VITE_API_BASE_URL` and redeploy.
