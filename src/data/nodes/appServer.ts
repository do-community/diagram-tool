import Node from "../node";

export default {
    name: 'Application Server',
    description: 'a stateless server that processes incoming requests via an application and returns a response',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      privateNetwork: true,
    },
    behavior: {
      wants: [
        {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['dbServer'], via: 'tcp'},
        {nodeTypes:['cacheServer'], via: 'tcp'}
      ],
      connectionPreference: ['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursiveSync',
    },
} as Node;
