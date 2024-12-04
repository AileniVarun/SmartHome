const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Sample device data for example purpose
const devices = [
  { deviceid: '1', devicename: 'Lamp', status: 'OFF' },
  { deviceid: '2', devicename: 'Fan', status: 'OFF' }
];

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Welcome to the WebSocket server!');

    // Clean up the device list
    const cleanDeviceList = devices.map(dev => ({
        deviceid: dev.deviceid,
        status: dev.status
    }));

    // Send device list to the client
    const deviceListMessage = JSON.stringify({ type: 'DEVICE_LIST', devices: cleanDeviceList });
    ws.send(deviceListMessage);

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        try {
            // Parse the incoming message
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === 'DEVICE_CONTROL') {
                console.log('Broadcasting TURN_ON message to all clients');
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'DEVICE_CONTROL',
                            deviceid: parsedMessage.deviceid
                        }));
                    }
                });
            } 
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Handle close event
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
