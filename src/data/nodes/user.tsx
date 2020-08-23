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
    name: 'User',
    description: 'Defines a generic user.',
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
      categoryless: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="userSvg">
      <circle className="cls-2" cx="21" cy="21" r="20.79"/>
      <path className="cls-3" d="M33.83,23.9a5.13,5.13,0,0,0-4.94-5.29h-.41a5.1,5.1,0,0,0-5.3,4.9v.39"/>
      <circle className="cls-3" cx="28.48" cy="15.86" r="2.7"/>
      <path className="cls-3" d="M18.82,23.9a5.11,5.11,0,0,0-4.92-5.29h-.42a5.1,5.1,0,0,0-5.3,4.91,2.41,2.41,0,0,0,0,.38"/>
      <circle className="cls-3" cx="13.48" cy="15.86" r="2.7"/>
      <path className="cls-3" d="M26.33,28.79a5.1,5.1,0,0,0-4.92-5.29,2.94,2.94,0,0,0-.42,0,5.12,5.12,0,0,0-5.3,4.94,2.67,2.67,0,0,0,0,.4"/>
      <circle className="cls-3" cx="20.99" cy="20.8" r="2.7"/>
    </g>,
} as Node;
