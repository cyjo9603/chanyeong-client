# Production image, copy all the files and run next
FROM node:23-alpine

# Install pm2
RUN npm install -g pm2

WORKDIR /app

ENV NODE_ENV=production

COPY dist/standalone .
COPY dist/static ./dist/static
COPY pm2.yml ./pm2.yml

CMD [ "pm2-runtime", "start", "pm2.yml" ]