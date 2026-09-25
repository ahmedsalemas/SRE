# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev             
COPY src ./src

# ---- runtime stage ----
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY package.json ./
RUN npm uninstall -g npm 
EXPOSE 3000
CMD ["node", "src/index.js"]