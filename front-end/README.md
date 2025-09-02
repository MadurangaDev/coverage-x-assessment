## Coverage X Assessment – Front-end

React + TypeScript app bootstrapped with Vite. It implements a tasks UI using Material UI, Redux Toolkit, and React Router, with unit tests via Vitest and Testing Library.

### Tech stack
- **React 19**, **TypeScript**, **Vite 7** (SWC)
- **MUI** (Material UI, Joy, Icons), **Emotion**
- **Redux Toolkit**, **React Redux**
- **React Router**
- **React Hook Form** + **Yup**
- **Axios** for HTTP
- **Vitest** + **Testing Library** for tests

### Prerequisites
- Node.js 18+ and npm 9+

### Getting started
```bash
npm install
npm run dev
```
The app runs at `http://localhost:5173` by default.

### Scripts
- **dev**: Start Vite dev server
- **build**: Type-check and build for production (`dist`)
- **preview**: Preview the production build
- **lint**: Run ESLint
- **test**: Run unit tests once (CI mode)
- **test:watch**: Run tests in watch mode
- **coverage**: Run tests with coverage report

```bash
npm run build
npm run preview
npm run test
npm run coverage
```

### API base URL
The Axios instance points to `http://localhost:3000/` by default. Update `src/utils/axiosInstance.ts` if your backend runs elsewhere.

```12:18:src/utils/axiosInstance.ts
const BASE_URL = "http://localhost:3000/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
```

### Project structure
```
src/
  components/        # UI components (atoms, layout, modals, forms)
  pages/             # Route-level pages
  redux/             # Store, slices, actions
  configs/           # Router and app-level configuration
  hooks/             # Custom hooks
  assets/            # Images and SCSS styles
  utils/             # Axios instance and helpers
  typings/           # Enums and interfaces
```

### Path aliases
Configured in `vite.config.ts` for cleaner imports:

```15:38:vite.config.ts
resolve: {
  alias: {
    "@components": path.resolve(__dirname, "src/components/index.ts"),
    "@configs": path.resolve(__dirname, "src/configs/index.ts"),
    "@pages": path.resolve(__dirname, "src/pages/index.ts"),
    "@providers": path.resolve(__dirname, "src/providers/index.ts"),
    "@redux": path.resolve(__dirname, "src/redux/index.ts"),
    "@redux-slices": path.resolve(__dirname, "src/redux/slices/index.ts"),
    "@redux-actions": path.resolve(__dirname, "src/redux/actions/index.ts"),
    "@enums": path.resolve(__dirname, "src/typings/enums/index.ts"),
    "@interfaces": path.resolve(__dirname, "src/typings/interfaces/index.ts"),
    "@responses": path.resolve(
      __dirname,
      "src/typings/interfaces/responses/index.ts"
    ),
    "@requests": path.resolve(
      __dirname,
      "src/typings/interfaces/requests/index.ts"
    ),
    "@constants": path.resolve(__dirname, "src/constants/index.ts"),
    "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
    "@styles": path.resolve(__dirname, "src/assets/styles"),
    "@images": path.resolve(__dirname, "src/assets/images"),
    "@utils": path.resolve(__dirname, "src/utils/index.ts"),
  },
},
```

### Routing
The app uses `createBrowserRouter` with a main `Tasks` route, and a disabled `Settings` placeholder.

```14:23:src/configs/routes.tsx
export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout currentPage={menuItemsEnum.TASKS}>
        <MainPage />
      </MainLayout>
    ),
  },
]);
```

### Testing
Vitest is configured with jsdom, global APIs, and CSS support.
```8:13:vite.config.ts
test: {
  environment: "jsdom",
  setupFiles: ["./vitest.setup.ts"],
  globals: true,
  css: true,
},
```
Run tests and coverage:
```bash
npm run test
npm run coverage
```
Coverage output is written under `coverage/`.

### Docker
Development Dockerfile runs the Vite dev server:
```1:10:Dockerfile
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
```

Example usage:
```bash
docker build -t coveragex-frontend:dev .
docker run --rm -it -p 5173:5173 -v %cd%:/app coveragex-frontend:dev
```

For production static hosting behind NGINX, use `nginx.conf` as a reference for HTML5 history mode.
```1:10:nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
}
```

### Linting
```bash
npm run lint
```

### Notes
- Update the Axios base URL to point to your backend.
- Ensure the backend supports CORS for the dev origin (`http://localhost:5173`).
