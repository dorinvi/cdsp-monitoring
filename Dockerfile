# Build frontend
FROM node:6 AS buildenv

RUN adduser --disabled-password --gecos '' cdsp

# Install Bower & Grunt
RUN npm --silent install -g bower grunt-cli

USER cdsp
WORKDIR /home/cdsp

COPY web .
RUN npm --silent install
RUN npm --silent run-script prod

# Build final image
FROM node:6-alpine
COPY api .
RUN npm --silent install
COPY --from=buildenv /home/cdsp/dist html
EXPOSE 8080
ENTRYPOINT ["npm","start"]