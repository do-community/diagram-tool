import * as React from "react";
import Node from "../node";

export default {
    name: 'Mobile App (User)',
    description: 'the end user, communicating via a mobile app',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: '',
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websockets', 'udp'],
      incompatibleWith: ['iotDevice', 'browser'],
      requests: 'creator',
      minConnections: 1,
      regionless: true,
    },
    icon: <g transform="scale(0.5) translate(50, 50)" id="mobile">
      <path className="paper stroked" d="M 35 90 C 32.5 90 30 87.5 30 85 L 30 15 C 30 12.5 32.5 10 35 10 L 65 10 C 67.5 10 70 12.5 70 15 L 70 85 C 70 87.5 67.5 90 65 90 L 35 90" />
      <path fill="current-color" className="stroked" d="M 34 15 L 66 15 L 66 74 L 34 74 L 34 15" />
      <circle className="lightblue stroked" cx="50" cy="82" r="4" />
    </g>,
} as Node;
