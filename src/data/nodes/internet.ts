import Node from "../node";

export default {
    name: 'Internet',
    description: 'the publicly accessible internet.',
    category: 'End-User Components',
    labelOffset: -16,
    metadata: {
        name: '',
        favicon: '',
        color: '',
    },
    behavior: {
        wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
        ],
        connectionPreference: ['https', 'http', 'websocket'],
        incompatibleWith: ['iotDevice', 'mobile', 'browser'],
        requests: 'creator',
        minConnections: 1,
        regionless: true,
    },
} as Node;
