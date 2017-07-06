FROM node:alpine
# RUN apk add --update nodejs
# RUN apk add --update nodejs nodejs-npm && npm install npm@latest -g

WORKDIR cdsp-monitoring
COPY api .
RUN npm install

COPY web ./web
RUN cd web && npm run-script prod
RUN mv web/dist ./html
RUN rm -rf ./web

EXPOSE 8080
CMD ["npm","start"]
