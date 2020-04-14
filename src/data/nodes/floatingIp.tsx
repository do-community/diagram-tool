import * as React from "react";
import Node from "../node";

export default {
    name: 'Floating IP',
    description: 'an IP address that can be assigned and reassigned to a single droplet',
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
    icon: <g>
        <path className="darkblue" d="M37.384,44.101c3.258,0,5.898,2.641,5.898,5.898 s-2.641,5.898-5.898,5.898c-3.257,0-5.898-2.641-5.898-5.898S34.127,44.101,37.384,44.101z" />
        <path className="darkblue" d="M65.543,61.256c1.628,0,2.949,1.32,2.949,2.949 s-1.321,2.95-2.949,2.95c-1.629,0-2.949-1.321-2.949-2.95S63.914,61.256,65.543,61.256z" />
        <path className="lightstroked unfilled" d="M63.661,37.698c0,0-4.481,12.092-20.463,12.092" />
        <path className="lightblue" d="M65.564,32.845c1.629,0,2.95,1.32,2.95,2.949 c0,1.628-1.321,2.949-2.95,2.949s-2.949-1.321-2.949-2.949C62.616,34.165,63.936,32.845,65.564,32.845z" />
        <path className="stroked unfilled" d="M63.661,61.901c0,0-4.481-12.092-20.463-12.092" />
    </g>,
} as Node;
