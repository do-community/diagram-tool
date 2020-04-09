import Node from "../node";

export default {
    name: 'Droplet',
    description: 'a droplet',
    category: 'DO Server Components',
    metadata: {
        name: '',
        agent: false,
        privateNetwork: false,
        enableIpv6: false,
        backups: false,
        image: 'Ubuntu 16.04.4 x64',
        size:  's-4vcpu-8gb',
        region: 'nyc3',
        tags: '',
        cloudFirewall: 'disabled',
        blockStorage: null,
        scale: 1,
    },
    behavior: {
        wants: [
            {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes:['dbServer'], via: 'tcp'},
            {nodeTypes:['cacheServer'], via: 'tcp'}
        ],
        connectionPreference:['https', 'http', 'websocket', 'tcp', 'udp'],
        requests: 'recursiveSync',
    },
} as Node;
