import Node from "../node";

export default {
    name: 'Floating IP',
    description: 'an IP address that can be assigned and reassigned to a single droplet',
    category: 'DO Server Components',
    metadata: {
        ip: '',
        cost: 0,
        scale: 0.7,
    },
    behavior: {
        wants: [
            {nodeTypes: ['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes: ['appServer', 'droplet'], via: 'https'},
        ],
        connectionPreference: ['https', 'http', 'websocket', 'udp'],
        requests: 'passThrough',
        minConnections: 2,
        edge: true,
    },
} as Node;
