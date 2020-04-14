import * as React from "react";
import Node from "../node";

export default {
    name: 'Spaces',
    description: 'a DigitalOcean object storage space of addressable objects',
    category: 'DO Server Components',
    metadata: {
        name: '',
        edge: true,
        private: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['appServer', 'workerServer', 'logServer'], via: 'https', all:true},
            {nodeTypes:['browser'], via: 'https'}
        ],
        incompatibleWith:['loadBalancer', 'dbServer'],
        connectionPreference:['https'],
        requests: 'respond',
    },
    icon: <g>
        <clipPath><rect fill="black" x="0" y="0" width="50" height="100" /></clipPath>
        <clipPath><rect fill="black" x="50" y="0" width="50" height="100" /></clipPath>
        <circle className="paper stroked" cx="50" cy="50" r="49" />
        <circle className="unfilled stroked" cx="50" cy="50" r="24" clipPath="url(#clipLeft)" strokeWidth="4" />
        <circle className="unfilled stroked" cx="50" cy="50" r="14" clipPath="url(#clipRight)" strokeWidth="4" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(70) translate(14,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(35) translate(14,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(0) translate(14,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-35) translate(14,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-70) translate(14,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(100) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(120) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(140) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(160) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(180) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-160) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-140) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-120) translate(24,0)" />
        <circle className="darkblue" r="2" transform="translate(50,50) rotate(-100) translate(24,0)" />
    </g>,
} as Node;
