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
    icon: <g transform="scale(1.5) translate(12, 12)" className="managedDbSvg">
      <circle className="cls-2" cx="21" cy="21" r="20.79"/>
      <path className="cls-3" d="M11.59,23.14v4.34c0,1.43,4,2.59,8.89,2.59"/>
      <path className="cls-3" d="M29.35,23.14V18.85"/>
      <path className="cls-3" d="M11.59,23.14V18.85"/>
      <path className="cls-3" d="M29.35,14.51c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.34c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
      <ellipse className="cls-3" cx="20.48" cy="14.51" rx="8.88" ry="2.58"/>
      <path className="cls-3" d="M29.35,14.51c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.34c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
      <path className="cls-3" d="M15.83,16.71c-2.54-.45-4.23-1.27-4.23-2.2,0-1.43,4-2.58,8.88-2.58s8.87,1.15,8.87,2.58-4,2.58-8.87,2.58a27,27,0,0,1-4.65-.38"/>
      <path className="cls-3" d="M11.59,23.14v4.34c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59V23.14"/>
      <path className="cls-3" d="M29.35,23.14c0,1.43-4,2.58-8.87,2.58a26,26,0,0,1-4.65-.38"/>
      <path className="cls-3" d="M15.83,25.34c-2.54-.45-4.23-1.27-4.23-2.2"/>
      <path className="cls-3" d="M29.35,27.49c0,1.43-4,2.58-8.87,2.58a27,27,0,0,1-4.65-.38"/>
      <path className="cls-3" d="M15.83,29.69c-2.54-.45-4.23-1.27-4.23-2.2"/>
      <path className="cls-4" d="M30.41,26.2v0Z"/>
    </g>,
} as Node;
