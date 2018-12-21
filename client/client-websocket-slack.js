// TEST: require($)
(async () => {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    
	let connection;
    await $.get('[RTM_CONN_URL]', (data) => {
		connection = new WebSocket(data.url);
    });

    connection.onopen = () => {
        print('conn: opened');
    };

    connection.onerror = (error) => {
        print('conn: error');
    };

    connection.onmessage = (message) => {
        try {
            const json = JSON.parse(message.data);
            if (json.type !== 'message') {
                print('type: ' + json.type);
            }
            print(json);
        } catch (e) {
            print('This doesn\'t look like a valid JSON: ',
                    message.data);
            return;
        }
    };
})();