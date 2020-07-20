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

interface Metadata {
    name?: string;
    favicon?: string;
    managementMethod?: string;
    color?: string;
    agent?: boolean;
    ip?: string;
    cost?: number;
    scale?: number;
    algo?: string;
    privateNetwork?: boolean;
    backups?: boolean;
    blockStorage?: number;
    notes?: string;
    owner?: string;
    provider?: string;
}

interface WantObject {
    nodeTypes: string[];
    via: string;
    metadata?: any;
    all?: boolean;
}

interface Behavior {
    wants?: WantObject[];
    categoryless?: boolean;
    connectionPreference?: string[];
    incompatibleWith?: string[];
    requests?: string;
    minConnections?: number;
    edge?: boolean;
} 

export default interface NodeDefinition {
    name: string;
    description: string;
    category: string;
    metadata: Metadata;
    behavior: Behavior;
    labelOffset?: number;
    extends?: string;
    icon: JSX.Element;
}
