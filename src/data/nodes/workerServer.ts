import Node from "../node";

export default {
    name: 'Worker Server',
    description: 'a stateless server dedicated to performing a task and returning the results',
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
            {nodeTypes:['dbServer'], via: 'mount'},
            {nodeTypes:['cacheServer'], via: 'mount'}
        ],
        connectionPreference:['tcp'],
        requests: 'recursiveAsync',
    },
} as Node;
