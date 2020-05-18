import * as React from "react";
import Node from "../node";

export default {
    name: 'Floating IP',
    description: 'An IP address that can be assigned and reassigned to a single droplet',
    category: 'DO Server Components',
    metadata: {
        ip: '',
        cost: 0,
        scale: 0.7,
    },
    behavior: {
        wants: [
            {nodeTypes: ['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes: ['appServer', 'droplet'], via: 'https'},
        ],
        connectionPreference: ['https', 'http', 'websocket', 'udp'],
        requests: 'passThrough',
        minConnections: 2,
        edge: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="floatingIpSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <line className="cls-3" x1="25.42" y1="16.25" x2="25.42" y2="16.25"/>
        <path className="cls-4" d="M22.2,19.19a11.48,11.48,0,0,1-1.95,1"/>
        <line className="cls-3" x1="18.14" y1="20.76" x2="18.14" y2="20.76"/>
        <circle className="cls-5" cx="26.99" cy="28.55" r="2.58"/>
        <path className="cls-6" d="M27.12,28.94a11.72,11.72,0,0,0-11-7.87h-.64"/>
        <path className="cls-7" d="M27,10.87a2.58,2.58,0,1,1-2.58,2.57A2.57,2.57,0,0,1,27,10.87Z"/>
        <circle className="cls-7" cx="12.29" cy="21.07" r="3.61"/>
    </g>,
} as Node;
