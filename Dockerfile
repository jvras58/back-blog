FROM node:lts

WORKDIR /app

COPY prisma ./prisma

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run postinstall && npm run migrate && npm run seed && npm run dev"]