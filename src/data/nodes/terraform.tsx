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
