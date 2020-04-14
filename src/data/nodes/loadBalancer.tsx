import * as React from "react";
import Node from "../node";

export default {
    name: 'Load Balancer',
    description: 'reverse proxy that distributes network or application traffic across a number of servers',
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
    icon: <g className="darkblue" transform="scale(1.5) translate(-17, -18)">
      <path d="M61.636,56v-3.273c0-2.727-2.182-5.09-5.091-5.09h-5.818v-5.455c1.818-0.363,3.273-2,3.273-4 C54,35.818,52.182,34,49.818,34c-2.364,0-4.182,1.818-4.182,4.182c0,2,1.455,3.637,3.272,4v5.455h-5.817 c-2.728,0-5.091,2.182-5.091,5.09V56c-2.182,0.363-4,2.545-4,4.909C34,63.637,36.182,66,39.091,66c2.909,0,5.09-2.182,5.09-5.091 c0-2.545-1.818-4.545-4.182-4.909v-3.273c0-1.818,1.455-3.272,3.273-3.272h13.454c1.818,0,3.273,1.454,3.273,3.272V56 c-2.364,0.363-4.182,2.545-4.182,4.909C55.818,63.637,58,66,60.909,66C63.818,66,66,63.818,66,60.909 C65.818,58.545,64,56.363,61.636,56L61.636,56z M42.182,60.909c0,1.818-1.455,3.273-3.273,3.273c-1.817,0-3.09-1.455-3.09-3.273 c0-1.817,1.455-3.272,3.273-3.272C40.909,57.637,42.182,59.091,42.182,60.909z M60.727,64.182c-1.818,0-3.272-1.455-3.272-3.273 c0-1.817,1.454-3.272,3.272-3.272S64,59.091,64,60.909C64,62.727,62.545,64.182,60.727,64.182z" />
    </g>,
} as Node;
