'use strict';

const config = require('config');
const MongoClient = require('mongodb').MongoClient;
const MONGO_HOST = process.env.MONGO_HOST || config.mongo.host;
const MONGO_PORT = process.env.MONGO_PORT || config.mongo.port;
const url = 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT;

let retValue = {};

let info = (res) => {
    let promise = new Promise((resolve, reject) => {
        let conn = MongoClient.connect(url, (errConnect, db) => {
            if (errConnect) {
                if (errConnect.message.indexOf("ECONNREFUSED") > 0) {
                    errConnect = { "status": "ECONNREFUSED" };
                } else {
                    console.log("Error: " + errConnect);
                }
                reject(errConnect);
            } else {
                var adminDb = db.admin();
                adminDb.serverStatus(function(err, info) {
                    let timeToString = new Date(info.uptimeMillis).toISOString().substr(11, 8);
                    retValue = {
                        status: "RUNNING",
                        version: info.version,
                        uptime: timeToString,
                        network: {
                            bytesIn: info.network.bytesIn,
                            bytesOut: info.network.bytesOut,
                            numReqests: info.network.numRequests
                        }
                    };
                    if (err) reject(err);
                    else resolve(retValue);
                });
            }
        });
    });

    promise.then(
        (info) => {
            res.json(info);
        }, err => {
            res.json(err);
        });
};

exports.info = info;