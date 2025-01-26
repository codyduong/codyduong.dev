FROM oven/bun:1.2 AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
RUN bun build --compile --target=bun-linux-x64-modern --minify --bytecode --sourcemap ./server.ts --outfile /app/server --packages external --env "disable"

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=build /app/package.json /app/bun.lockb /app/server ./
COPY --from=build  /app/node_modules ./node_modules
COPY --from=build  /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=5173
EXPOSE 5173

CMD ["/app/server"]
