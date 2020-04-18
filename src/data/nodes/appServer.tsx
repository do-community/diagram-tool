import * as React from "react";
import Node from "../node";

export default {
    name: 'Application Server',
    description: 'a stateless server that processes incoming requests via an application and returns a response',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      privateNetwork: true,
    },
    behavior: {
      wants: [
        {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['dbServer'], via: 'tcp'},
        {nodeTypes:['cacheServer'], via: 'tcp'}
      ],
      connectionPreference: ['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursiveSync',
    },
    icon: <g transform="scale(1.5) translate(12, 12)" className="apiSvg">
      <circle className="cls-2" cx="21" cy="21" r="20.79"/>
      <path className="cls-3" d="M32.8,22.44V19.65l-3.09-1a9.47,9.47,0,0,0-.89-2.1l1.51-2.9-2-2-2.88,1.45h0a9.45,9.45,0,0,0-2-.88h0l-1-3.07H19.59l-1,3.11a9.39,9.39,0,0,0-2.09.89h0l-2.89-1.5-2,2,1.5,2.89h0a8.91,8.91,0,0,0-.88,2L9.2,19.65v2.83l3.1,1h0a9.07,9.07,0,0,0,.82,2h0l-1.46,2.87,2,2,2.9-1.51a9,9,0,0,0,2,.89l1,3.11H22.4l1-3.08h0a8.65,8.65,0,0,0,2-.82h0l2.89,1.51,2-2.06L28.8,25.49a9.48,9.48,0,0,0,.88-2.07Zm-11.8,2A3.45,3.45,0,1,1,24.44,21v0A3.44,3.44,0,0,1,21,24.42Z"/>
      <text className="cls-4" transform="translate(-14.56 -220.02)">
        <tspan className="cls-5">D</tspan>
        <tspan className="cls-6" x="11.57" y="0">a</tspan>
        <tspan className="cls-7" x="20.25" y="0">t</tspan>
        <tspan className="cls-8" x="26.04" y="0">a</tspan>
        <tspan className="cls-9" x="34.79" y="0">b</tspan>
        <tspan className="cls-10" x="44.22" y="0">a</tspan>
        <tspan className="cls-11" x="52.99" y="0">s</tspan>
        <tspan className="cls-12" x="60.69" y="0">e</tspan>
        <tspan x="69.43" y="0">s</tspan>
        <tspan className="cls-13" x="0" y="185">D</tspan>
        <tspan className="cls-14" x="11.67" y="185">e</tspan>
        <tspan className="cls-15" x="20.22" y="185">v</tspan>
        <tspan className="cls-16" x="28.34" y="185">e</tspan>
        <tspan className="cls-17" x="37.12" y="185">l</tspan>
        <tspan className="cls-18" x="41.34" y="185">o</tspan>
        <tspan className="cls-19" x="50.52" y="185">p</tspan>
        <tspan x="59.98" y="185">er </tspan>
        <tspan className="cls-20" x="78.85" y="185">T</tspan>
        <tspan className="cls-9" x="87.06" y="185">o</tspan>
        <tspan className="cls-21" x="96.26" y="185">o</tspan>
        <tspan className="cls-22" x="105.45" y="185">l</tspan>
        <tspan x="109.69" y="185">s</tspan>
        <tspan className="cls-23" x="0" y="370">M</tspan>
        <tspan className="cls-24" x="14.09" y="370">a</tspan>
        <tspan className="cls-25" x="22.83" y="370">n</tspan>
        <tspan className="cls-26" x="32.27" y="370">a</tspan>
        <tspan className="cls-27" x="41.05" y="370">g</tspan>
        <tspan x="50.45" y="370">e</tspan>
        <tspan className="cls-12" x="59.22" y="370">m</tspan>
        <tspan x="73.19" y="370">e</tspan>
        <tspan className="cls-28" x="81.96" y="370">n</tspan>
        <tspan x="91.34" y="370">t </tspan>
        <tspan className="cls-20" x="101.2" y="370">T</tspan>
        <tspan className="cls-9" x="109.41" y="370">o</tspan>
        <tspan className="cls-21" x="118.61" y="370">o</tspan>
        <tspan className="cls-29" x="127.8" y="370">l</tspan>
        <tspan x="132.04" y="370">s</tspan>
      </text>
    </g>,
} as Node;
