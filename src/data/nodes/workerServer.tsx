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
    name: 'Worker Server',
    description: 'A stateless server dedicated to performing a task and returning the results.',
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
            {nodeTypes:['dbServer'], via: 'tcp'},
            {nodeTypes:['cacheServer'], via: 'tcp'}
        ],
        connectionPreference:['tcp'],
        requests: 'recursiveAsync',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="workerSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <line className="cls-3" x1="20.98" y1="21.2" x2="20.98" y2="21.2"/>
        <line className="cls-4" x1="20.98" y1="18.09" x2="20.98" y2="10.32"/>
        <line className="cls-3" x1="20.98" y1="8.76" x2="20.98" y2="8.76"/>
        <line className="cls-3" x1="10.92" y1="27.22" x2="10.92" y2="27.22"/>
        <line className="cls-5" x1="13.42" y1="25.66" x2="19.68" y2="21.78"/>
        <line className="cls-3" x1="20.93" y1="21" x2="20.93" y2="21"/>
        <line className="cls-6" x1="23.44" y1="22.54" x2="29.72" y2="26.4"/>
        <line className="cls-3" x1="30.98" y1="27.17" x2="30.98" y2="27.17"/>
        <path className="cls-7" d="M21,21V33.44M21,21.2,11,15m20.11,0L21,21.2m-10.1-6.42V27.17l10,6.22L31,27.17V14.73l-10-6.17Z"/>
    </g>,
} as Node;
