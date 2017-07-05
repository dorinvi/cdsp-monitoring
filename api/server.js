'use strict';

const config = require('config');
const express = require('express');
const appInfo = require('./package.json');
const version = appInfo.version;
const appName = appInfo.name;

const mongoApi = require('./libs/mongo.js');
const rethinkApi = require('./libs/rethink.js');
const redisApi = require('./libs/redis.js');

const app = express();
const router = express.Router();

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('html'));

// app.get('/', (req, res) => {
//     res.send('<b>' + appName + '</b> API located at: <a href="/api">/api</a>');
// });

app.use('/api', router);

router.get('/', (req, res) => {
    res.json({
        version: version,
        mongo: "/mongo",
        rethink: "/rethink",
        redis: "/redis"
    });
});

router.get('/mongo', (req, res) => {
    mongoApi.info(res);
});

router.get('/rethink', (req, res) => {
    rethinkApi.info(res);
});

router.get('/redis', (req, res) => {
    redisApi.info(res);
});

const SRV_HOST = process.env.ADDR || config.server.host;
const SRV_PORT = process.env.PORT || config.server.port;

const server = app.listen(SRV_PORT, SRV_HOST, () => {
    const host = server.address();
    console.log('Server running on http://%s:%d', host.address, host.port);
}).on('error', function(err) {
    console.error(' %s', JSON.stringify(err));
    //console.error(' %s', err.code);
});