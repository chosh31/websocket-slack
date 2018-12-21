const config = require('./config/config');
const AWS = require('aws-sdk');
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const request = require('sync-request');
const res = request('GET', config.slack.RTM_CONN_URL);

const kinesis = new AWS.Kinesis({
    region: config.kinesis.region
});

let writeRecord = (record) => {
    const sensor = 'sensor-' + Math.floor(Math.random() * 100000);
    const recordData = {
        Data: JSON.stringify(JSON.parse(record)),
        PartitionKey: sensor,
        StreamName: config.kinesis.streamName
    }
    
    kinesis.putRecord(recordData, (err, data) => {
        if (err) {
            console.error('Kinesis: putRecord error!');
            console.error(err);
        } else {
            console.info('Kinesis: putRecord success');
            console.info(data);
        }
    });
};
 
client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('error', (error) => {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', () => {
        console.log('echo-protocol Connection Closed');
    });

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");

            writeRecord(message.utf8Data);
        }
    });
});

client.connect(JSON.parse(res.body.toString('utf-8')).url);
