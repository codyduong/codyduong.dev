FROM oven/bun:edge as build

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:edge
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/bun.lockb ./
RUN bun install --production
EXPOSE 8080
CMD ["bun", "dist/server.js"]
