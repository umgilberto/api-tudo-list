FROM node:20.12.2-bullseye-slim as buildapp
WORKDIR /src
COPY --chown=node:node . /src/
RUN npm ci --omit=dev --cache .npm --prefer-offline
RUN npm run build

FROM node:20.12.2-bullseye-slim as build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

FROM node:20.12.2-bullseye-slim
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER root
RUN apt-get update && apt-get install -y chromium
ENV CHROMIUM_PATH /usr/bin/chromium
ENV NODE_ENV production
USER node
WORKDIR /usr/app
COPY --chown=node:node . /usr/app/
COPY --from=buildapp --chown=node:node /src/node_modules /usr/app/
COPY --from=buildapp --chown=node:node /src/dist /usr/app/

CMD ["dumb-init", "node", "dist/main.js"]
