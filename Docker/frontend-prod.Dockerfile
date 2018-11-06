FROM debian:stretch-slim

RUN apt-get update && \
    apt-get -y install \
        git \
        vim \
        telnet \
        make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
        libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev

RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -

#TODO: Join nginx with the layer above
RUN apt-get -y install nodejs nginx

RUN npm install -g create-react-app && \
    npm install axios -S && \
    create-react-app dockerize-me

RUN npm install typeface-roboto typeface-titillium-web --save

WORKDIR /dockerize-me

COPY Docker/nginx.conf /etc/nginx/nginx.conf
COPY Docker/default /etc/nginx/sites-available/default
COPY src /dockerize-me/src
COPY Docker/package-prod.json /dockerize-me/package.json
RUN sed -i 's/localhost/165.227.49.162/' /dockerize-me/src/App.js
RUN npm run build
