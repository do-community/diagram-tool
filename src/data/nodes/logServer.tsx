import * as React from "react";
import Node from "../node";

export default {
    name: 'Logging Server',
    description: 'A server dedicated to aggregating and indexing logs and analytics.',
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
    icon: <g transform="scale(1.5) translate(12, 12)" className="monitoringSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M29.6,14.92v12.7a1.5,1.5,0,0,1-1.51,1.51H14.79"/>
        <path className="cls-3" d="M12.4,26.74V14.38a1.51,1.51,0,0,1,1.51-1.51H27.47"/>
        <line className="cls-3" x1="29.57" y1="21" x2="12.36" y2="21"/>
        <path className="cls-3" d="M13.5,27l5-9.82a.33.33,0,0,1,.45-.14.32.32,0,0,1,.14.14l3.74,7.61a.33.33,0,0,0,.45.13.29.29,0,0,0,.14-.13l5.09-9.88"/>
        <circle className="cls-3" cx="12.4" cy="29.13" r="2.39"/>
        <circle className="cls-3" cx="29.6" cy="12.87" r="2.39"/>
    </g>,
} as Node;
