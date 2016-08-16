FROM debian:jessie

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV appDir /app

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.2.0

RUN apt-get update
RUN apt-get install -y -q curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN mkdir discollect
WORKDIR discollect

RUN apt-get install -y node-gyp

ADD package.json .

ADD .

EXPOSE 3000
