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
    name: 'Spaces',
    description: 'Managed file storage by DigitalOcean.',
    category: 'DO Server Components',
    metadata: {
        name: '',
        edge: true,
        private: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['appServer', 'workerServer', 'logServer'], via: 'https', all:true},
            {nodeTypes:['browser'], via: 'https'}
        ],
        incompatibleWith:['loadBalancer', 'dbServer'],
        connectionPreference:['https'],
        requests: 'respond',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="spacesSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M12.7,13.49a1.22,1.22,0,0,0,.66-.2,1,1,0,0,0,.33-.68,1.22,1.22,0,0,0-.19-.69.88.88,0,0,0-.69-.33h0a1,1,0,0,0-1,.86,1.16,1.16,0,0,0,.21.68A.91.91,0,0,0,12.7,13.49Zm-2.6,3.89a1,1,0,0,0,1-.87,1.26,1.26,0,0,0-.2-.68.85.85,0,0,0-.69-.34h-.06a1,1,0,0,0-.95.87,1.12,1.12,0,0,0,.21.68,1.09,1.09,0,0,0,.67.34ZM10.17,21a1.26,1.26,0,0,0-.2-.68A.9.9,0,0,0,9.28,20H9.22a1,1,0,0,0-.62.21.87.87,0,0,0-.33.69,1.08,1.08,0,0,0,.2.67.84.84,0,0,0,.68.35.87.87,0,0,0,1-.7.61.61,0,0,0,0-.19Zm0,3.61a1.07,1.07,0,0,0-.69.21.88.88,0,0,0-.34.69,1.16,1.16,0,0,0,.21.67.87.87,0,0,0,.68.35,1.15,1.15,0,0,0,.72-.21.84.84,0,0,0,.34-.68.87.87,0,0,0-.69-1Zm2.67,3.9a1,1,0,0,0-1,.86,1.2,1.2,0,0,0,.21.69.89.89,0,0,0,.68.34,1.21,1.21,0,0,0,.66-.19.85.85,0,0,0,.33-.68,1.22,1.22,0,0,0-.19-.69A1.13,1.13,0,0,0,12.84,28.51ZM16.72,31a1,1,0,0,0-.68.18.86.86,0,0,0-.34.68,1.12,1.12,0,0,0,.21.68.83.83,0,0,0,.68.34,1.11,1.11,0,0,0,.68-.2.86.86,0,0,0,.34-.68,1.12,1.12,0,0,0-.2-.69A1,1,0,0,0,16.72,31Z"/>
        <circle className="cls-3" cx="25.39" cy="26.73" r="0.95"/>
        <circle className="cls-3" cx="27.92" cy="23.18" r="0.95"/>
        <circle className="cls-3" cx="27.99" cy="18.88" r="0.95"/>
        <circle className="cls-3" cx="25.32" cy="15.2" r="0.95"/>
        <path className="cls-3" d="M16.66,10.9a1,1,0,0,0,1-.87.94.94,0,0,0-.86-1h-.1a.92.92,0,0,0-.61.2.88.88,0,0,0-.34.69,1.08,1.08,0,0,0,.19.65A.84.84,0,0,0,16.66,10.9ZM21,28.84V27.2a6.27,6.27,0,0,1,0-12.54V13a7.92,7.92,0,0,0,0,15.83Zm.42-20.53V10a11.05,11.05,0,0,1,0,22.1v1.64a12.69,12.69,0,0,0,0-25.38Z"/>
    </g>,
} as Node;
