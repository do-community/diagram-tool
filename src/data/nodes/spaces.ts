import Node from "../node";

export default {
    name: 'Spaces',
    description: 'a DigitalOcean object storage space of addressable objects',
    category: 'DO Server Components',
    metadata: {
        name: '',
        edge: true,
        private: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['appServer', 'workerServer', 'logServer'], via: 'https', all:true},
            {nodeTypes:['browser'], via: 'https'}
        ],
        incompatibleWith:['loadBalancer', 'dbServer'],
        connectionPreference:['https'],
        requests: 'respond',
    },
} as Node;
