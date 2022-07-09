const WebSocket = require('ws')
const Util = require('./Util');
const WebsocketServer = new WebSocket.Server({
    port: 443
})
const WebSocketClient = require('websocket').client;
const XMPPClient = new WebSocketClient();
const url = 'xmpp-service-prod.ol.epicgames.com'
let latest_payload_xmpp = null;
let connectionXMPP = null;
let connectionServer = null;

console.log("XMPP logger made by notpies no steal plzzzzz, websocket should be open on port 443")
XMPPClient.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

XMPPClient.on('connect', function(connection) {
    console.log('Connected to XMPP!');
    connectionXMPP = connection
    connection.send('<open xmlns="urn:ietf:params:xml:ns:xmpp-framing" to="prod.ol.epicgames.com" version="1.0" />')
    connection.on('error', function(error) {
        console.log("XMPP Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('XMPP Connection Closed!');
        connectionXMPP = null
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            Util.log("Received message from XMPP (DOWN)", "'" + message.utf8Data + "'\n");
            latest_payload_xmpp = message.utf8Data;
            connectionServer.send(latest_payload_xmpp)
        }
    });
});


WebsocketServer.on('connection', function(wsServer, req) {
    console.log("New client connected!")
    var headers = req.headers
    headers.host = url
    headers.origin = "http://" + url
    connectionServer = wsServer;
    XMPPClient.connect("wss://" + url, null, null, headers)


    wsServer.on('message', message => {
        Util.log("Received message from client (UP)", "'" + message + "'\n")
        if (connectionXMPP) {
            connectionXMPP.send(message)
        }
    })

})