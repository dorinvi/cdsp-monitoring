'use strict';

const config = require('config');
const r = require("rethinkdb");

let retValue = {};

let info = (res) => {
    const RETHINK_HOST = process.env.RETHINK_HOST || config.rethink.host;
    const RETHINK_PORT = process.env.RETHINK_PORT || config.rethink.port;
    const RETHINK_TIMEOUT = process.env.RETHINK_TIMEOUT || config.rethink.timeout;

    r.connect({
        host: RETHINK_HOST,
        port: RETHINK_PORT,
        db: 'rethinkdb',
        timeout: RETHINK_TIMEOUT
    }, function(errConnect, conn) {
        if (errConnect) {
            console.log("Error: " + errConnect);
            if (errConnect.message.indexOf("ECONNREFUSED") > 0) {
                errConnect = { "status": "ECONNREFUSED" };
            } else if (errConnect.name === "ReqlTimeoutError") {
                errConnect = { "status": "ETIMEOUT" };
            } else {
                console.log("Error: " + errConnect);
            }
            res.json(errConnect);
        } else {
            r.table('server_status').run(conn, (err, cursor) => {
                cursor.toArray((err, result) => {
                    if (err) throw err;
                    console.log(result);
                    const timeNow = new Date();
                    const timeStarted = new Date(result[0].process.time_started);
                    let timeToString = new Date(timeNow - timeStarted).toISOString().substr(11, 8);
                    retValue = {
                        status: "RUNNING",
                        version: result[0].process.version,
                        uptime: timeToString
                    };
                    res.json(retValue);
                });
            });
        }
    });


    // r.db('rethinkdb').table('server_status').run().then((result) => {
    //     console.log(result);
    //     const timeNow = new Date();
    //     const timeStarted = new Date(result[0].process.time_started);
    //     let timeToString = new Date(timeNow - timeStarted).toISOString().substr(11, 8);
    //     retValue = {
    //         version: result[0].process.version,
    //         uptime: timeToString
    //     };
    //     res.json(retValue);
    // }, (err) => {
    //     res.json(err);
    // });
};

exports.info = info;