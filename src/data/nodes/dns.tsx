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
    name: 'DNS',
    description: 'A DigitalOcean managed DNS service',
    category: 'DO Server Components',
    metadata: {},
    behavior: {
        wants: [],
        categoryless: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="dnsSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79" />
        <circle className="cls-3" cx="21" cy="21" r="11.87" />
        <line className="cls-3" x1="21" y1="9.13" x2="21" y2="32.87" />
        <line className="cls-3" x1="9.81" y1="17.04" x2="32.19" y2="17.04" />
        <line className="cls-3" x1="9.81" y1="24.96" x2="32.19" y2="24.96" />
        <path className="cls-3" d="M21,32.87c-3.27,0-5.93-8.6-5.93-11.87S17.73,9.13,21,9.13" />
        <path className="cls-3" d="M21.09,9.13C24.36,9.13,27,17.73,27,21s-2.66,11.87-5.93,11.87" />
    </g>,
} as Node;
