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
    requests: string;
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
