import * as React from "react";
import Node from "../node";

export default {
    name: 'Load Balancer',
    description: 'A reverse proxy that distributes network or application traffic across a number of servers',
    category: 'DO Server Components',
    metadata: {
      name: '',
      algo: 'round-robin',
    },
    behavior: {
      wants: [
        {nodeTypes:['floatingIp', 'gateway', 'browser', 'mobile', 'iotDevice'], via: 'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['appServer'], via: 'https', all:true}
      ],
      connectionPreference:['https', 'http', 'tcp', 'websocket'],
      minConnections: 2,
      requests: 'loadBalanced',
      edge: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="loadBalancerSvg">
      <circle className="cls-2" cx="21" cy="21" r="20.79"/>
      <path className="cls-3" d="M21,14.82v1.95a2.55,2.55,0,0,0,2.55,2.54h3.26a2.54,2.54,0,0,1,2.54,2.54V25"/>
      <path className="cls-4" d="M18.9,19.27a2.18,2.18,0,0,1-.44,0H15.21a2.55,2.55,0,0,0-2.55,2.54v1.3"/>
      <circle className="cls-3" cx="21" cy="11.96" r="2.86"/>
      <circle className="cls-3" cx="29.31" cy="27.83" r="2.86"/>
      <circle className="cls-3" cx="12.69" cy="27.83" r="2.86"/>
    </g>,
} as Node;
