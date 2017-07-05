FROM node:alpine
# RUN apk add --update nodejs
# RUN apk add --update nodejs nodejs-npm && npm install npm@latest -g

WORKDIR .
COPY api .
RUN npm install

COPY web/dist ./html

EXPOSE 8080
CMD ["npm","start"]
