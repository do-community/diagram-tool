import * as React from "react";
import Node from "../node";

export default {
    name: 'Terraform',
    description: 'A configuration tool that can create an execution plan and build infrastructure',
    category: '3rd Party Tools',
    metadata: {},
    behavior: {
        wants: [],
        regionless: true,
    },
    icon: <g transform="translate(-15, -12)" xmlns="http://www.w3.org/2000/svg" viewBox="14 14 100 100">
        <path fill="#4040B2" d="M71.574,66.804L84,59.637V45.28l-12.426,7.183" /><path fill="#5C4EE5" d="M57.788,45.28l12.426,7.183v14.341l-12.426-7.174" />
        <path fill="#5C4EE5" d="M44,51.622l12.424,7.174V44.447L44,37.272 M57.788,75.554l12.426,7.174V68.38l-12.426-7.176" />
    </g>,
} as Node;
