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
    name: 'CI/CD Server',
    description: 'A CI/CD server to automatically build and test software.',
    category: 'DO Server Components',
    metadata: {},
    behavior: {
        wants: [],
        categoryless: true,
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="ciCdSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M22.46,30H19.52l-.74-2.35a8.47,8.47,0,0,1-.94-.39l-2.16,1.13-2.07-2.08,1.14-2.18a8.15,8.15,0,0,1-.41-1L12,22.46V19.53l2.35-.74a7.36,7.36,0,0,1,.37-.92l-1.14-2.2,2.08-2.07,2.17,1.13a6.71,6.71,0,0,1,1-.4L19.52,12h2.93l.74,2.34a7.79,7.79,0,0,1,1,.41l2.18-1.14,2.07,2.08L27.3,17.84a6.76,6.76,0,0,1,.41,1l2.34.74v2.93l-2.34.74a7.49,7.49,0,0,1-.41,1l1.12,2.16-2.07,2.08-2.18-1.14a6.78,6.78,0,0,1-1,.39Zm-2-1.26h1.09l.63-2.09.33-.09a6.18,6.18,0,0,0,1.33-.54l.31-.17,1.95,1,.79-.78-1-1.94.17-.3a5,5,0,0,0,.56-1.35l.1-.33,2.1-.66V20.46l-2.09-.63-.11-.34a5.17,5.17,0,0,0-.54-1.31l-.15-.28.13-.29.87-1.69-.77-.77-1.95,1-.3-.17a5.49,5.49,0,0,0-1.34-.58l-.32-.09L22.12,15l-.57-1.79H20.46l-.66,2.1-.33.11a5.59,5.59,0,0,0-1.31.55l-.3.17-1.95-1-.8.77,1,1.95-.16.32a5.15,5.15,0,0,0-.52,1.26l-.1.32-.31.1-1.77.6v1.08l2.1.67.09.33A5.85,5.85,0,0,0,16,23.86l.16.29-1,2,.76.77,1.94-1,.31.17a6.34,6.34,0,0,0,1.26.53l.32.09.1.31ZM21,24.08a3.07,3.07,0,1,1,2.19-.9A3.09,3.09,0,0,1,21,24.08Zm0-4.9a1.76,1.76,0,0,0-1.26.53,1.82,1.82,0,1,0,2.58,0A1.8,1.8,0,0,0,21,19.2Z"/>
        <path className="cls-3" d="M29.54,12.48a12.05,12.05,0,0,0-17,0l-.91-.91a13.34,13.34,0,0,1,18.87,0h0Z"/>
        <polygon className="cls-3" points="31.38 10.63 32.29 14.32 28.6 13.41 31.38 10.63"/>
        <path className="cls-3" d="M21,34.34a13.29,13.29,0,0,1-9.43-3.9l.9-.93a12.05,12.05,0,0,0,17,0l.91.91A13.22,13.22,0,0,1,21,34.34Z"/>
        <polygon className="cls-3" points="10.33 31.67 9.39 27.87 13.19 28.81 10.33 31.67"/>
    </g>,
} as Node;
