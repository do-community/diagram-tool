import Node from "../node";

export default {
    name: 'IOT Device',
    description: 'A limited functionality internet-capable device.',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: '',
    },
    behavior: {
        wants: [
            {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
            {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}},
        ],
        connectionPreference: ['https', 'http', 'websocket'],
        incompatibleWith: ['iotDevice', 'mobile'],
        requests: 'creator',
        minConnections: 1,
        regionless: true,
    },
} as Node;
