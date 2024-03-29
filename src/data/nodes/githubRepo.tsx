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
    name: 'GitHub Repo',
    description: 'A GitHub repository.',
    category: '3rd Party Tools',
    metadata: {},
    behavior: {
        wants: [],
        categoryless: true,
        connectionPreference:['https', 'http']
    },
    icon: <g transform="scale(0.5) translate(35, 32)" xmlns="http://www.w3.org/2000/svg" viewBox="14 14 100 100" className="offblack">
        <path className="unfilled" strokeMiterlimit="10" d="M44.5,102.971c-1.65,0-3.675-1.169-4.5-2.598L20.5,66.598 c-0.825-1.429-0.825-3.767,0-5.196L40,27.627c0.825-1.429,2.85-2.598,4.5-2.598h38.999c1.65,0,3.675,1.169,4.5,2.598L107.5,61.402 c0.825,1.429,0.825,3.767,0,5.196l-19.501,33.775c-0.825,1.429-2.85,2.598-4.5,2.598H44.5z" />
        <path className="unstroked" d="M61.917,55.667h-2.083v2.083h2.083V55.667z M61.917,51.5h-2.083v2.083h2.083V51.5z M74.417,47.333 c-1.042,0-19.792,0-20.833,0c-1.042,0-2.083,1.042-2.083,2.083c0,1.042,0,23.958,0,25c0,1.041,1.042,2.083,2.083,2.083 c1.042,0,4.167,0,4.167,0v4.167l3.125-3.125L64,80.667V76.5c0,0,9.375,0,10.417,0c1.041,0,2.083-1.042,2.083-2.083 c0-1.042,0-23.958,0-25C76.5,48.375,75.458,47.333,74.417,47.333z M74.417,73.375c0,0.521-0.488,1.042-1.042,1.042s-9.375,0-9.375,0 v-2.084h-6.25v2.084c0,0-2.572,0-3.125,0s-1.042-0.554-1.042-1.042s0-3.125,0-3.125h20.833 C74.417,70.25,74.417,72.854,74.417,73.375z M74.417,68.167H57.75v-18.75h16.699L74.417,68.167z M61.917,64h-2.083v2.083h2.083V64z M61.917,59.833h-2.083v2.083h2.083V59.833z" />
    </g>,
} as Node;
