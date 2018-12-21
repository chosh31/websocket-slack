const websocket = require('./websocket');
const server = require('./server');
const path = require('path');
const minimist = require('minimist');

let args = minimist(process.argv.slice(2), {  
    default: {
        mode: 'all', //['all', 'websocket', 'server']
        port: 3000
    },
});

if (args.mode !== 'server') {
    websocket.proccessConnect();
}

if (args.mode !== 'websocket') {
    server.get('/', function(req, res) {
      res.sendFile(path.join(__dirname+'/client/index.html'));
    });

    server.listen(3000, function(){
        console.log('Express server has started on port 3000')
    });
}
