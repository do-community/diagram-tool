/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as React from "react";
import Node from "../node";

export default {
    name: 'IOT Device',
    description: 'A limited functionality internet-capable device.',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: '',
    },
    behavior: {
        wants: [
            {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
            {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}},
        ],
        connectionPreference: ['https', 'http', 'websocket'],
        incompatibleWith: ['iotDevice', 'mobile'],
        requests: 'creator',
        categoryless: true,
    },
    icon: <g transform="scale(0.5) translate(50, 50)">
        <path d="M 35 70 C 32.5 70 30 67.5 30 65 L 30 35 C 30 32.5 32.5 30 35 30 L 65 30 C 67.5 30 70 32.5 70 35 L 70 65 C 70 67.5 67.5 70 65 70 L 35 70 M 70 45 L 75 45 L 75 47 L 77 47 L 77 10 C 77 5 82 5 82 10 L 82 53 L 75 53 L 75 55 L 70 55" stroke="#0069ff" fill="transparent" />
    </g>,
} as Node;
