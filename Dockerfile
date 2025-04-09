# Stage 1: Build
FROM node:18-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate


WORKDIR /app

# Copy only dependency files first for better caching
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy rest of the app files
COPY . .
RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Only production deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --prod

# Copy built files
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/dist ./dist

# Copy .env as .env.production (if exists), default name is .env.development
COPY --from=builder /app/.env.development ./.env.development 

EXPOSE ${PORT}

CMD ["node", "-r", "tsconfig-paths/register", "dist/src/server.js"]