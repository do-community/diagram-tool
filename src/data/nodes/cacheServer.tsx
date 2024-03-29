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
    name: 'Cache Server',
    description: 'The cache server is a server dedicated to caching data.',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
        name: '',
        agent: true,
        backups: true,
        privateNetwork: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['appServer'], via: 'tcp', all:true}
        ],
        connectionPreference:['tcp', 'mount', 'replication'],
        requests: 'respond',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="customImageSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <rect className="cls-3" x="11.43" y="11.47" width="19.13" height="19.06"/>
        <circle className="cls-4" cx="21" cy="21.33" r="1.54"/>
        <path className="cls-5" d="M16.24,24.8a5.86,5.86,0,1,1,9.44,0"/>
        <line className="cls-5" x1="11.43" y1="24.8" x2="30.57" y2="24.8"/>
    </g>,
} as Node;
