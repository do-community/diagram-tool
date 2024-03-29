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
    name: 'Browser',
    description: 'The browser is used to repersend the end-user which is communicating via a web browser',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websocket'],
      incompatibleWith: ['iotDevice', 'mobile'],
      requests: 'creator',
      minConnections: 1,
      categoryless: true,
    },
    icon: <g transform="scale(0.5) translate(50, 45)">
      <path className="stroked" fill="current-color" d="M 2 12 C 2 5 5 2 12 2 L 88 2 C 95 2 98 5 98 12 L 98 88 C 98 95 95 98 88 98 L 12 98 5 98 2 95 2 88 L 2 12" />
      <path className="lightblue stroked" d="M 2 12 C 2 5 5 2 12 2 L 88 2 C 95 2 98 5 98 12 L 98 18 L 2 18 L 2 12" />
      <circle className="darkblue" cx="14" cy="10" r="5" />
      <circle className="darkblue" cx="29" cy="10" r="5" />
    </g>,
} as Node;
