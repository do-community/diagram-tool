import Node from "../node";

export default {
    name: 'GitHub Repo',
    description: 'Source Code Management platform.',
    category: '3rd Party Tools',
    metadata: {},
    behavior: {
        wants: [],
        regionless: true,
        connectionPreference:['https', 'http']
    },
} as Node;
