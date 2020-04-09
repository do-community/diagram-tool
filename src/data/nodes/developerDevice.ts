import Node from "../node";

export default {
    name: 'Dev Device',
    description: 'Developer\'s local device',
    category: 'End-User Components',
    metadata: {
        name: '',
        managementMethod: 'terminal',
        favicon: '',
        color: '',
    },
    behavior: {
        connectionPreference: ['ssh'],
        incompatibleWith: ['iotDevice', 'mobile', 'floatingIp', 'loadBalancer'],
        requests: 'creator',
        minConnections: 1,
        regionless: true,
    },
} as Node;
