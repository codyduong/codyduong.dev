FROM oven/bun:1.1 AS build

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1.1
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/bun.lockb ./
COPY /public ./public
COPY ./server.ts ./server.ts
RUN bun install --frozen-lockfile --production
ENV NODE_ENV=production
ENV PORT=5173
EXPOSE 5173

CMD ["bun", "./server.ts"]
