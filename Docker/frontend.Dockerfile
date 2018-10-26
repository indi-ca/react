FROM debian:stretch-slim

RUN apt-get update && \
    apt-get -y install \
        git \
        vim \
        telnet \
        make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
        libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -

RUN apt-get install -y nodejs
RUN npm install -g create-react-app
RUN create-react-app dockerize-me

WORKDIR /dockerize-me
RUN npm run build

RUN apt-get install -y nginx

COPY Docker/nginx.conf /etc/nginx/nginx.conf
COPY Docker/default /etc/nginx/sites-available/default

