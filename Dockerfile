FROM node:6.2.0
MAINTAINER OutlandishUnicycle

# Replace sh with bash so we can use source
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install Node
RUN apt-get update
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash \
  && source /root/.bashrc \
  && nvm install node \

RUN mkdir discollect
WORKDIR discollect

ADD package.json .

RUN npm install

ADD . .

EXPOSE 3000

CMD ["npm", "start"]
