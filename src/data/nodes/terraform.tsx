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
    name: 'Terraform',
    description: 'A configuration tool that can create an execution plan and build infrastructure',
    category: '3rd Party Tools',
    metadata: {},
    behavior: {
        wants: [],
        categoryless: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="terraformSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M10.89,17.53l4.61,2.64V14.93l-4.61-2.64Z"/>
        <path className="cls-3" d="M18.63,21.94l4.62,2.65V19.34L18.63,16.7Z"/>
        <path className="cls-3" d="M26.5,19.34v5.25l4.61-2.65V16.7Z"/>
        <path className="cls-3" d="M18.63,31l4.62,2.64V28.43l-4.6-2.62Z"/>
    </g>,
} as Node;
