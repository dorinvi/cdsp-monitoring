'use strict';

const config = require('config');
const redis = require("redis");

let retValue = {};

let info = (res) => {
    const REDIS_HOST = process.env.REDIS_HOST || config.redis.host;
    const REDIS_PORT = process.env.REDIS_PORT || config.redis.port;
    console.log("REDIS Connect: " + REDIS_HOST + ':' + REDIS_PORT);
    let client = redis.createClient(REDIS_PORT, REDIS_HOST);

    client.on("error", (err) => {
        res.json({ status: err.code });
        client.quit();
    });

    client.on("ready", () => {
        let promise = new Promise((resolve, reject) => {
            client.info(function(err, serverInfo) {
                let info = parseInfo(serverInfo);
                console.log(info);
                let timeToString = new Date(info.uptime_in_seconds * 1000).toISOString().substr(11, 8);
                retValue = {
                    status: "RUNNING",
                    version: info.redis_version,
                    uptime: timeToString,
                    network: {
                        bytesIn: parseInt(info.total_net_input_bytes),
                        bytesOut: parseInt(info.total_net_output_bytes)
                    }
                };
                if (err) reject(err);
                else resolve(retValue);
            });
        });
        promise.then(
            (info) => {
                res.json(info);
                client.quit();
            }, err => {
                res.json(err);
                client.quit();
            });
    });

};

let parseInfo = (info) => {
    var lines = info.split("\r\n");
    var obj = {};
    for (var i = 0, l = info.length; i < l; i++) {
        var line = lines[i];
        if (line && line.split) {
            line = line.split(":");
            if (line.length > 1) {
                var key = line.shift();
                obj[key] = line.join(":");
            }
        }
    }
    return obj;
};

exports.info = info;