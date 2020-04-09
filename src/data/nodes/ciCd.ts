import Node from "../node";

export default {
    name: 'CI/CD Server',
    description: 'Continuous Integration / Continuous Deployment server to automatically build and test software.',
    category: 'DO Server Components',
    metadata: {},
    behavior: {
        wants: [],
        regionless: true,
    },
} as Node;
