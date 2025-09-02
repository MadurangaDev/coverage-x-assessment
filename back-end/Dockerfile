FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm i

FROM deps AS build
COPY . .
RUN npx prisma generate \
  && npm run build

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY package*.json ./

# Run migrations on startup and then start the server
CMD sh -c "npx prisma migrate deploy && node dist/server.js"