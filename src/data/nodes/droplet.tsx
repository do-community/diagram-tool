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
        region: 'nyc3',
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
    icon: <g transform="scale(0.5) translate(25, 45)" className="darkblue" id="droplet">
        <path className="lightblue stroked" id="droplet" d="M75.498,5.571c0,0,37.501,37.884,37.501,58.598c0,20.709-16.79,37.498-37.501,37.498C54.789,101.667,38,84.879,38,64.169C37.997,43.456,75.498,5.571,75.498,5.571z" />
    </g>,
} as Node;
