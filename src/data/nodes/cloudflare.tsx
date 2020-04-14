import * as React from "react";
import Node from "../node";

export default {
    name: 'cloudflare',
    description: 'A gateway like CloudFlare, sits between user and your infrastructure.',
    category: '3rd Party Tools',
    metadata: {
        provider: 'cloudflare',
        owner: '',
        notes: '',
    },
    behavior: {
        wants: [
            {nodeTypes:['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
            {nodeTypes:['loadBalancer', 'floatingIp', 'gateway'], via: 'https'},
        ],
        connectionLimitations:['http', 'https', 'udp', 'websockets'],
        minConnections: 2,
        maxConnections: 2,
        regionless: true,
        requests: 'passThrough',
    },
    icon: <g transform="scale(0.15) translate(-280, 150)">
        <path style={{fill: '#F38020'}} d="M674.8,223.9c2.1-7.2,1.3-13.8-2.2-18.7c-3.2-4.5-8.6-7.1-15.1-7.4l-123.1-1.6c-0.8,0-1.5-0.4-1.9-1
        c-0.4-0.6-0.5-1.4-0.3-2.2c0.4-1.2,1.6-2.1,2.9-2.2l124.2-1.6c14.7-0.7,30.7-12.6,36.3-27.2l7.1-18.5c0.3-0.8,0.4-1.6,0.2-2.4
        c-8-36.2-40.3-63.2-78.9-63.2c-35.6,0-65.8,23-76.6,54.9c-7-5.2-15.9-8-25.5-7.1c-17.1,1.7-30.8,15.4-32.5,32.5
        c-0.4,4.4-0.1,8.7,0.9,12.7c-27.9,0.8-50.2,23.6-50.2,51.7c0,2.5,0.2,5,0.5,7.5c0.2,1.2,1.2,2.1,2.4,2.1l227.2,0
        c1.3,0,2.5-0.9,2.9-2.2L674.8,223.9z"/>
        <path style={{fill: '#FAAE40'}} d="M714,144.8c-1.1,0-2.3,0-3.4,0.1c-0.8,0-1.5,0.6-1.8,1.4l-4.8,16.7c-2.1,7.2-1.3,13.8,2.2,18.7
        c3.2,4.5,8.6,7.1,15.1,7.4l26.2,1.6c0.8,0,1.5,0.4,1.9,1c0.4,0.6,0.5,1.5,0.3,2.2c-0.4,1.2-1.6,2.1-2.9,2.2l-27.3,1.6
        c-14.8,0.7-30.7,12.6-36.3,27.2l-2,5.1c-0.4,1,0.3,2,1.4,2h93.8c1.1,0,2.1-0.7,2.4-1.8c1.6-5.8,2.5-11.9,2.5-18.2
        C781.3,175,751.1,144.8,714,144.8"/>
    </g>,
} as Node;
