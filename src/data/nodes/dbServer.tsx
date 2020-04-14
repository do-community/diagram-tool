import * as React from "react";
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
    icon: <g className="darkblue unstroked">
      <path d="M58.938,59.989c-1.42,1.37-5.229,2.16-8.938,2.16s-7.518-0.79-8.938-2.16v2.72c0,1.361,3.59,2.791,8.938,2.791c5.348,0,8.938-1.43,8.938-2.791V59.989z" />
      <path d="M58.938,55.183c-1.42,1.369-5.229,2.159-8.938,2.159s-7.518-0.79-8.938-2.159v2.721c0,1.35,3.59,2.79,8.938,2.79c5.348,0,8.938-1.44,8.938-2.784V55.183z" />
      <path d="M58.938,50.366c-1.42,1.371-5.229,2.16-8.938,2.16s-7.518-0.774-8.938-2.16v2.721c0,1.346,3.59,2.785,8.938,2.785c5.348,0,8.938-1.439,8.938-2.785V50.366z" />
      <ellipse cx="50" cy="48.296" rx="8.938" ry="2.795" />
    </g>,
} as Node;
