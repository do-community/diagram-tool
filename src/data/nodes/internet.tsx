import * as React from "react";
import Node from "../node";

export default {
    name: 'Internet',
    description: 'the publicly accessible internet.',
    category: 'End-User Components',
    labelOffset: -16,
    metadata: {
        name: '',
        favicon: '',
        color: '',
    },
    behavior: {
        wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
        ],
        connectionPreference: ['https', 'http', 'websocket'],
        incompatibleWith: ['iotDevice', 'mobile', 'browser'],
        requests: 'creator',
        minConnections: 1,
        regionless: true,
    },
    icon: <g id="internet" transform="translate(18, 20)">
        <path
        className="offwhite stroked"
        fill="current-color"
        d="m24.412409,19.9375c-1.133591,-0.889752 -2.55901,-1.420231 -4.105051,-1.420231c-3.642017,0 -6.605695,2.937738 -6.69908,6.597913c-3.758748,1.425419 -6.434489,5.093376 -6.434489,9.391683c0,5.079109 3.734105,9.274951 8.577158,9.937726l0,0.090791l34.307333,0l0,-0.016861c4.78339,-0.280155 8.577158,-4.291821 8.577158,-9.199725c0,-4.732806 -3.52788,-8.631632 -8.070025,-9.156923c0.018158,-0.287937 0.028534,-0.579766 0.028534,-0.872891c0,-7.334618 -6.120612,-13.280133 -13.669237,-13.280133c-5.587539,0 -10.389087,3.258101 -12.5123,7.924759"
        />
    </g>,
} as Node;
