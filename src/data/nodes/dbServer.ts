import Node from "../node";

export default {
    name: 'Database Server',
    description: 'a server dedicated to running a database',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      backups: true,
      privateNetwork: true,
      blockStorage: 100,
    },
    behavior: {
      wants: [
        {nodeTypes: ['appServer', 'droplet', 'workerServer'], via: 'tcp', all: true},
        {nodeTypes: ['dbServer'], via: 'replication', all: true},
      ],
      connectionPreference: ['tcp', 'mount', 'replication'],
      requests: 'recursiveAsync',
    },
} as Node;
