const config = require('../config/config');
const kinesis = require('../kinesis');
const WebSocketClient = require('websocket').client;
const request = require('sync-request');
const client = new WebSocketClient();

client.proccessConnect = (res = request('GET', config.slack.RTM_CONN_URL)) => {
    client.connect(JSON.parse(res.body.toString('utf-8')).url);
}
 
client.on('connectFailed', (error) => {
    console.log(`Connect Error: ${error.toString()}`);
});
 
client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('error', (error) => {
        console.log(`Connection Error: ${error.toString()}`);
    });

    connection.on('close', () => {
        console.log('echo-protocol Connection Closed');
    });

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log(`Received: ${message.utf8Data}`);

            kinesis.writeRecord(message.utf8Data);
        }
    });
});

module.exports = client;
