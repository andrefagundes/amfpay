FROM node:latest

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD dockerize -wait tcp://db:3306 -timeout 180s \
    && npm install \
    && npm run prisma:dev \
    && npx prisma db seed \
    && npm run start