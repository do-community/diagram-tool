import Node from "../node";

export default {
    name: 'Cache Server',
    description: 'a server dedicated to caching data.',
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
            {nodeTypes:['appServer'], via: 'tcp', all:true}
        ],
        connectionPreference:['tcp', 'mount', 'replication'],
        requests: 'respond',
    },
} as Node;
