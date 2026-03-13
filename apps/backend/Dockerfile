# Use Node.js 24 Alpine as base image
FROM node:24-alpine AS base

# Enable corepack for pnpm (Best Practice)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using BuildKit Cache Mount (CI/CD Best Practice)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

# Development stage
FROM base AS development

# Install all dependencies including devDependencies with Cache Mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["pnpm", "run", "dev"]

# Production stage
FROM base AS production

# Argument for Sentry Auth Token (provided by Render during build)
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

# Install all dependencies to build with Cache Mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN pnpm build

# Final production stage (runtime only)
FROM node:24-alpine AS runner

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only production dependencies and built files
COPY --from=production /app/package.json /app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

COPY --from=production /app/dist ./dist
# Prisma folder is needed for the client
COPY --from=production /app/prisma ./prisma
# Copy generated folder (Client and Zod types)
COPY --from=production /app/generated ./generated
# Copy src folder so swagger-jsdoc can read annotations from .ts files in production
COPY --from=production /app/src ./src

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3000

# Health check (adjusting path to dist/server.js or similar if needed, but node -e works)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "dist/server.js"]
