import Node from "../node";

export default {
    name: 'Load Balancer',
    description: 'reverse proxy that distributes network or application traffic across a number of servers',
    category: 'DO Server Components',
    metadata: {
      name: '',
      algo: 'round-robin',
    },
    behavior: {
      wants: [
        {nodeTypes:['floatingIp', 'gateway', 'browser', 'mobile', 'iotDevice'], via: 'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['appServer'], via: 'https', all:true}
      ],
      connectionPreference:['https', 'http', 'tcp', 'websocket'],
      minConnections: 2,
      requests: 'loadBalanced',
      edge: true,
    },
} as Node;
