# Infrastructure monitoring

Service that monitors MongoDB, RethinkDB and Redis.

## Running Standalone
* Build the API (go to the `api` folder):
```
npm install
npm start
```
* Build the Web UI (go to the `web` folder):
```
npm install
npm run-script devel
```
_Note: The result will be in the `dist` folder_

## Running in docker environment
* Build/run/start:
```
docker build -t <imagename:version> .
docker run --name <CONTAINER_NAME> -e "REDIS_HOST=<IP>" -e "RETHINK_HOST=<IP>" -e "MONGO_HOST=<IP>" -p 8081:8080 <imagename:version>
docker start <CONTAINER_NAME>
```

> For `docker run` the following options can be also used:  
> - `-d` to run in the background  
> - `-it` to run in terminal interactive, (add `sh` at the end) 

* Using docker compose:
```
docker-compose up
```
> To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.

