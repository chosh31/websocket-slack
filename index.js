const CONN_INFO = {
    SLACK_URL: '[SLACK_URL]'
};

const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const request = require('sync-request');
const res = request('GET', CONN_INFO.SLACK_URL);
 
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
        }

        // TODO: slack message -> kinesis data stream
    });
});

client.connect(JSON.parse(res.body.toString('utf-8')).url);
