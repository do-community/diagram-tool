import Node from "../node";

export default {
    name: 'Mobile App (User)',
    description: 'the end user, communicating via a mobile app',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: '',
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websockets', 'udp'],
      incompatibleWith: ['iotDevice', 'browser'],
      requests: 'creator',
      minConnections: 1,
      regionless: true,
    },
} as Node;
