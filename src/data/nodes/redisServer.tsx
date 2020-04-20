import * as React from "react";
import Node from "../node";

export default {
    name: 'Redis Server',
    description: 'The Redis server which is used within the application.',
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
            {nodeTypes:['dbServer'], via: 'mount'},
            {nodeTypes:['cacheServer'], via: 'mount'},
            {nodeTypes:['droplet'], via: 'mount'}
        ],
        connectionPreference:['tcp'],
        requests: 'recursiveAsync',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="redisSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M9.65,20.87v4.34c0,1.43,4,2.59,8.89,2.59"/>
        <path className="cls-3" d="M27.41,19V16.57"/>
        <path className="cls-3" d="M9.65,16.57v4.34c0,1.43,4,2.58,8.89,2.58H19"/>
        <path className="cls-3" d="M27.41,12.24c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.33c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
        <ellipse className="cls-3" cx="18.54" cy="12.24" rx="8.88" ry="2.58"/>
        <path className="cls-3" d="M27.41,12.24c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.33c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
        <path className="cls-3" d="M13.89,14.44c-2.54-.46-4.23-1.27-4.23-2.2,0-1.43,4-2.58,8.88-2.58s8.87,1.15,8.87,2.58-4,2.58-8.87,2.58a27,27,0,0,1-4.65-.38"/>
        <circle className="cls-3" cx="25.44" cy="25.43" r="6.91"/>
        <path className="cls-4" d="M28.47,23.93v0Z"/>
        <path className="cls-4" d="M28.47,24a2.68,2.68,0,0,0-2.68-2.65H23.88a.75.75,0,0,0-.57.21.77.77,0,0,0-.23.57v6.73a.77.77,0,0,0,1.53,0V26.62h.53l1.5,2.58a.76.76,0,0,0,.66.37.75.75,0,0,0,.38-.1.76.76,0,0,0,.27-1l-1.17-2a2.78,2.78,0,0,0,.9-.58A2.72,2.72,0,0,0,28.47,24Zm-3.86-1.12h1.14a1.18,1.18,0,0,1,.82.33,1.11,1.11,0,0,1,0,1.58,1.14,1.14,0,0,1-.82.33H24.61Z"/>
    </g>,
} as Node;
