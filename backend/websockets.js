const WebSocket = require('ws');

const device = []; // Store device information

const initializeWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.send('Welcome to the WebSocket server!');

        const cleanDeviceList = device.map(dev => ({
            deviceid: dev.deviceid,
            status: dev.status
        }));

        const deviceListMessage = JSON.stringify({ type: 'DEVICE_LIST', devices: cleanDeviceList });
        ws.send(deviceListMessage);

        ws.on('message', (message) => {
            console.log(`Received message from client: ${message}`);

            let messageStr = (typeof message === 'string') ? message : message.toString();
            let parsedMessage;

            try {
                parsedMessage = JSON.parse(messageStr);
            } catch (error) {
                console.log('Invalid JSON message received:', messageStr);
                return;
            }

            // Handle different message types
            if (parsedMessage.type === 'DEVICE_LIST') {
                const deviceId = parsedMessage.deviceid.trim();
                const deviceIndex = device.findIndex(dev => dev.deviceid === deviceId);

                if (deviceIndex === -1) {
                    device.push({ deviceid: deviceId, status: 'OFF', ws: ws });
                    console.log(`Device ${deviceId} added to the list.`);
                } else {
                    console.log(`Device ${deviceId} is already in the list.`);
                }

                const updatedDeviceListMessage = JSON.stringify({
                    type: 'DEVICE_LIST',
                    devices: device.map(dev => ({
                        deviceid: dev.deviceid,
                        status: dev.status
                    }))
                });

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(updatedDeviceListMessage);
                    }
                });
            }

            // Handle control messages
            else if (parsedMessage.type === 'LIGHT_CONTROL') {
                console.log('Broadcasting LIGHT_CONTROL message to all clients');
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'LIGHT_CONTROL', deviceid: parsedMessage.deviceid }));
                    }
                });
            } else if (parsedMessage.type === 'FAN_CONTROL') {
                console.log('Broadcasting FAN_CONTROL message to all clients');
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'FAN_CONTROL', deviceid: parsedMessage.deviceid }));
                    }
                });
            } else if (parsedMessage.type === 'AC_CONTROL') {
                console.log('Broadcasting AC_CONTROL message to all clients');
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'AC_CONTROL', deviceid: parsedMessage.deviceid }));
                    }
                });
            } else if (parsedMessage.type === 'DEVICE_STATUS') {
                console.log('Broadcasting DEVICE_STATUS message to all clients');
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'DEVICE_STATUS',
                            deviceid: parsedMessage.deviceid,
                            status: true
                        }));
                    }
                });
            }
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
            const index = device.findIndex(dev => dev.ws === ws);
            if (index !== -1) {
                device.splice(index, 1);
            }
            const updatedDeviceListMessage = JSON.stringify({
                type: 'DEVICE_LIST',
                devices: device.map(dev => ({
                    deviceid: dev.deviceid,
                    status: dev.status
                }))
            });

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(updatedDeviceListMessage);
                }
            });
        });
    });

    console.log('WebSocket server initialized');
};

module.exports = initializeWebSocket;
