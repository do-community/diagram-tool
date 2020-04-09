import Node from "../node";

export default {
    name: 'cloudflare',
    description: 'A gateway like CloudFlare, sits between user and your infrastructure.',
    category: '3rd Party Tools',
    metadata: {
        provider: 'cloudflare',
        owner: '',
        notes: '',
    },
    behavior: {
        wants: [
            {nodeTypes:['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes:['loadBalancer', 'floatingIp', 'gateway'], via: 'https'},
        ],
        connectionLimitations:['http', 'https', 'udp', 'websockets'],
        minConnections: 2,
        maxConnections: 2,
        regionless: true,
        requests: 'passThrough',
    },
} as Node;
