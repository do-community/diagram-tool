import * as React from "react";
import Node from "../node";

export default {
    name: 'Droplet',
    description: 'a droplet',
    category: 'DO Server Components',
    metadata: {
        name: '',
        agent: false,
        privateNetwork: false,
        enableIpv6: false,
        backups: false,
        image: 'Ubuntu 16.04.4 x64',
        size:  's-4vcpu-8gb',
        category: 'Default Category',
        tags: '',
        cloudFirewall: 'disabled',
        blockStorage: null,
        scale: 1,
    },
    behavior: {
        wants: [
            {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes:['dbServer'], via: 'tcp'},
            {nodeTypes:['cacheServer'], via: 'tcp'}
        ],
        connectionPreference:['https', 'http', 'websocket', 'tcp', 'udp'],
        requests: 'recursiveSync',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="dropletSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M21,33.06A10.2,10.2,0,0,1,10.83,23C10.83,14.61,21,8.94,21,8.94s10.17,5.87,10.17,14.15A10.14,10.14,0,0,1,21,33.06Z"/>
        <path className="cls-3" d="M21,26.28a3.37,3.37,0,0,1-3.39-3.39c0-2.61,3.39-5.09,3.39-5.09s3.39,2.42,3.39,5.09A3.37,3.37,0,0,1,21,26.28Z"/>
    </g>,
} as Node;
