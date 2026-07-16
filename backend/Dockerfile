# backend/Dockerfile
#
#  - Entry point real: backend/src/index.ts
#  - "npm run build" en package.json es "tsc --noEmit" (solo type-check,
#    NO genera JS). Para producción compilamos con tsc de verdad.
#  - Prisma nunca se genera solo con npm ci: hace falta "prisma generate"
#    explícito (igual que en job de CI).
#  - Puerto 3000, para quedar consistente con lo que ya usas en CI/e2e
#    (PORT: 3000, VITE_API_URL: http://localhost:3000).

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# DATABASE_URL dummy SOLO para que "prisma generate" no falle en build-time.
# El valor real lo inyecta docker-compose en runtime (no se usa para conectar aquí).
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN npx prisma generate

# Build real de TypeScript -> JS (distinto del script "build" del package.json,
# que solo hace type-check). Si tu tsconfig.json tiene "rootDir": "src", el
# resultado queda en dist/index.js. Si no, ajusta el CMD a dist/src/index.js.
RUN npx tsc --outDir dist

# Ya no hacen falta devDependencies (typescript, ts-node-dev, vitest, etc.)
RUN npm prune --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]