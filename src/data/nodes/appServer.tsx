import * as React from "react";
import Node from "../node";

export default {
    name: 'Application Server',
    description: 'a stateless server that processes incoming requests via an application and returns a response',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      privateNetwork: true,
    },
    behavior: {
      wants: [
        {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['dbServer'], via: 'tcp'},
        {nodeTypes:['cacheServer'], via: 'tcp'}
      ],
      connectionPreference: ['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursiveSync',
    },
    icon: <path id="appServer" className="darkblue unstroked" d="M60.525,53.417l-2.532-0.176c-0.212-0.958-0.589-1.854-1.1-2.655l1.661-1.908 c0.186-0.184,0.186-0.483,0-0.668l-1.563-1.565c-0.185-0.185-0.484-0.185-0.669,0l-1.907,1.662c-0.8-0.51-1.698-0.888-2.656-1.099 l-0.176-2.533c0-0.264-0.211-0.475-0.475-0.475h-2.216c-0.264,0-0.476,0.211-0.476,0.475l-0.175,2.533 c-0.958,0.211-1.855,0.589-2.656,1.099l-1.908-1.662c-0.185-0.185-0.484-0.185-0.668,0l-1.565,1.565 c-0.185,0.185-0.185,0.484,0,0.668l1.662,1.908c-0.51,0.801-0.889,1.697-1.1,2.655l-2.533,0.176c-0.264,0-0.475,0.211-0.475,0.475 v2.216c0,0.265,0.211,0.475,0.475,0.475l2.533,0.177c0.211,0.958,0.589,1.854,1.1,2.655l-1.662,1.908 c-0.185,0.185-0.185,0.482,0,0.668l1.565,1.564c0.185,0.186,0.484,0.186,0.668,0l1.908-1.661c0.8,0.51,1.697,0.888,2.656,1.099 l0.175,2.533c0,0.263,0.212,0.475,0.476,0.475h2.216c0.264,0,0.475-0.212,0.475-0.475l0.176-2.533 c0.958-0.211,1.856-0.589,2.656-1.099l1.907,1.661c0.185,0.186,0.484,0.186,0.669,0l1.563-1.564c0.186-0.186,0.186-0.483,0-0.668 l-1.661-1.908c0.511-0.801,0.888-1.697,1.1-2.655l2.532-0.177c0.264,0,0.475-0.21,0.475-0.475v-2.216 C61,53.628,60.789,53.417,60.525,53.417z M50.009,59.52c-2.497,0-4.52-2.021-4.52-4.52c0-2.496,2.023-4.521,4.52-4.521 c2.497,0,4.52,2.024,4.52,4.521C54.529,57.498,52.506,59.52,50.009,59.52z" />,
} as Node;
