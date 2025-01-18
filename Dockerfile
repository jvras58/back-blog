FROM node:lts

WORKDIR /app

COPY prisma ./prisma

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run dev"]