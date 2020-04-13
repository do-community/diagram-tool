import * as React from "react";
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
    icon: <g className="stroked">
        <rect className="darkblue unstroked" x="43" y="45" width="4" height="4" />
        <rect className="darkblue unstroked" x="48" y="45" width="4" height="4" />
        <rect className="darkblue unstroked" x="53" y="45" width="4" height="4" />
        <rect className="darkblue unstroked" x="43" y="50" width="4" height="4" />
        <rect className="darkblue unstroked" x="48" y="50" width="4" height="4" />
        <rect className="darkblue unstroked" x="53" y="50" width="4" height="4" />
        <rect className="darkblue unstroked" x="43" y="55" width="4" height="4" />
        <rect className="darkblue unstroked" x="48" y="55" width="4" height="4" />
        <rect className="darkblue unstroked" x="54" y="58" width="4" height="4" />
    </g>,
} as Node;
