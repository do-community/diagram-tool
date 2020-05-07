import * as React from "react";
import Node from "../node";

export default {
    name: 'Dev Device',
    description: 'Developer\'s local device',
    category: 'End-User Components',
    metadata: {
        name: '',
        managementMethod: 'terminal',
        favicon: '',
        color: '',
    },
    behavior: {
        connectionPreference: ['ssh'],
        incompatibleWith: ['iotDevice', 'mobile', 'floatingIp', 'loadBalancer'],
        requests: 'creator',
        minConnections: 1,
        categoryless: true,
    },
    icon: <g transform="scale(0.5) translate(40, 39)" xmlns="http://www.w3.org/2000/svg" viewBox="14 14 100 100">
        <path className="paper stroked" d="M17.805,90.842h92.391V33.587c0-2.1-1.715-3.802-3.802-3.802H21.606 c-2.086,0-3.802,1.702-3.802,3.802V90.842z M113.882,94.298h-38.95c0.012,0.038,0.012,0.077,0.012,0.114 c0,0.947-0.78,1.729-1.728,1.729H54.784c-0.947,0-1.728-0.781-1.728-1.729c0-0.037,0-0.076,0.013-0.114H14.118v1.958 c0,1.075,0.883,1.959,1.958,1.959h95.847c1.074,0,1.958-0.884,1.958-1.959V94.298z" /> <path className="paper stroked" d="M106.278,35.43v49.767c0,0.947-0.78,1.728-1.728,1.728H23.45 c-0.947,0-1.728-0.78-1.728-1.728V35.43c0-0.947,0.781-1.728,1.728-1.728h81.101C105.498,33.702,106.278,34.483,106.278,35.43z" />
    </g>,
} as Node;
