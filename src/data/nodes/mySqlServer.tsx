import * as React from "react";
import Node from "../node";

export default {
    name: 'MySQL Server',
    description: 'The MySQL server which is used within the application.',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
        name: '',
        agent: true,
        backups: true,
        privateNetwork: true,
    },
    behavior: {
        wants: [
            {nodeTypes:['dbServer'], via: 'tcp'},
            {nodeTypes:['cacheServer'], via: 'tcp'},
            {nodeTypes:['droplet'], via: 'tcp'}
        ],
        connectionPreference:['tcp'],
        requests: 'recursiveAsync',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="mySqlSvg">
        <circle className="cls-2" cx="21" cy="21" r="20.79"/>
        <path className="cls-3" d="M22.15,29V21.86a.63.63,0,0,1,.59-.58.86.86,0,0,1,.84.33c.2.36.43.72.64,1.08.37.62.84,1.36,1.21,2,.37-.6.85-1.34,1.21-2,.2-.36.43-.72.64-1.08a.86.86,0,0,1,.84-.33.65.65,0,0,1,.61.58V29a.69.69,0,0,1-.77.59A.68.68,0,0,1,27.2,29v-4.5c-.28.44-.55.88-.75,1.22l-.35.56a.81.81,0,0,1-.69.35.76.76,0,0,1-.7-.35l-.35-.56c-.2-.34-.48-.78-.73-1.22V29a.71.71,0,0,1-.77.59A.69.69,0,0,1,22.15,29Z"/>
        <path className="cls-4" d="M9.65,20.87v4.34c0,1.43,4,2.59,8.89,2.59"/>
        <path className="cls-4" d="M27.41,19V16.57"/>
        <path className="cls-4" d="M9.65,16.57v4.34c0,1.43,4,2.58,8.89,2.58H19"/>
        <path className="cls-4" d="M27.41,12.24c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.33c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
        <ellipse className="cls-4" cx="18.54" cy="12.24" rx="8.88" ry="2.58"/>
        <path className="cls-4" d="M27.41,12.24c0-1.42-4-2.58-8.87-2.58s-8.89,1.16-8.89,2.58v4.33c0,1.43,4,2.59,8.89,2.59s8.87-1.16,8.87-2.59Z"/>
        <path className="cls-4" d="M13.89,14.44c-2.54-.46-4.23-1.27-4.23-2.2,0-1.43,4-2.58,8.88-2.58s8.87,1.15,8.87,2.58-4,2.58-8.87,2.58a27,27,0,0,1-4.65-.38"/>
        <circle className="cls-4" cx="25.44" cy="25.43" r="6.91"/>
        <text className="cls-5" transform="translate(-109.56 -33.02)">
        <tspan className="cls-6">D</tspan>
            <tspan className="cls-7" x="11.57" y="0">a</tspan>
            <tspan className="cls-8" x="20.25" y="0">t</tspan>
            <tspan className="cls-9" x="26.04" y="0">a</tspan>
            <tspan className="cls-10" x="34.79" y="0">b</tspan>
            <tspan className="cls-11" x="44.22" y="0">a</tspan>
            <tspan className="cls-12" x="52.99" y="0">s</tspan>
            <tspan className="cls-13" x="60.69" y="0">e</tspan>
            <tspan x="69.43" y="0">s</tspan>
            <tspan className="cls-14" x="0" y="185">D</tspan>
            <tspan className="cls-15" x="11.67" y="185">e</tspan>
            <tspan className="cls-16" x="20.22" y="185">v</tspan>
            <tspan className="cls-17" x="28.34" y="185">e</tspan>
            <tspan className="cls-18" x="37.12" y="185">l</tspan>
            <tspan className="cls-19" x="41.34" y="185">o</tspan>
            <tspan className="cls-20" x="50.52" y="185">p</tspan>
            <tspan x="59.98" y="185">er </tspan>
            <tspan className="cls-21" x="78.85" y="185">T</tspan>
            <tspan className="cls-10" x="87.06" y="185">o</tspan>
            <tspan className="cls-22" x="96.26" y="185">o</tspan>
            <tspan className="cls-23" x="105.45" y="185">l</tspan>
            <tspan x="109.69" y="185">s</tspan>
            <tspan className="cls-24" x="0" y="370">M</tspan>
            <tspan className="cls-25" x="14.09" y="370">a</tspan>
            <tspan className="cls-26" x="22.83" y="370">n</tspan>
            <tspan className="cls-27" x="32.27" y="370">a</tspan>
            <tspan className="cls-28" x="41.05" y="370">g</tspan>
            <tspan x="50.45" y="370">e</tspan>
            <tspan className="cls-13" x="59.22" y="370">m</tspan>
            <tspan x="73.19" y="370">e</tspan>
            <tspan className="cls-29" x="81.96" y="370">n</tspan>
            <tspan x="91.34" y="370">t </tspan>
            <tspan className="cls-21" x="101.2" y="370">T</tspan>
            <tspan className="cls-10" x="109.41" y="370">o</tspan>
            <tspan className="cls-22" x="118.61" y="370">o</tspan>
            <tspan className="cls-30" x="127.8" y="370">l</tspan>
            <tspan x="132.04" y="370">s</tspan>
        </text>
    </g>,
} as Node;
