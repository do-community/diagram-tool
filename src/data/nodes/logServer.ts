import Node from "../node";

export default {
    name: 'Logging Server',
    description: 'a server dedicated to aggregating and indexing logs and analytics.',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
        name: '',
        agent: true,
        backups: true,
        privateNetwork: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['appServer'], via: 'udp', all:true},
            {nodeTypes:['workerServer'], via: 'udp', all:true},
            {nodeTypes:['dbServer'], via: 'udp', all:true},
            {nodeTypes:['cacheServer'], via: 'udp', all:true}
        ],
        connectionPreference:['udp'],
        requests: 'respond',
    },
} as Node;
