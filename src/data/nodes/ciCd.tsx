import * as React from "react";
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
    icon: <g transform="scale(0.05) translate(600, 500)" id="ci-cd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path d="M655.461 473.469c11.875 81.719-13.062 167.781-76.812 230.594-94.188 92.938-239.5 104.375-346.375 34.562l74.875-73L31.96 627.25 70.367 896l84.031-80.5c150.907 111.25 364.938 100.75 502.063-34.562 79.5-78.438 115.75-182.562 111.25-285.312L655.461 473.469zM189.46 320.062c94.156-92.938 239.438-104.438 346.313-34.562l-75 72.969 275.188 38.406L697.586 128l-83.938 80.688C462.711 97.34400000000005 248.742 107.96900000000005 111.585 243.25 32.085 321.656-4.133 425.781 0.335 528.5l112.25 22.125C100.71 468.875 125.71 382.906 189.46 320.062z" />
    </g>,
} as Node;
