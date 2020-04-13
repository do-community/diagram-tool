import * as React from "react";
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
    icon: <path id="logServer" className="darkblue unstroked" d="M37,52L40,52L43,48L46,59L51,42L54,57L57,50L60,52L63,52" />,
} as Node;
