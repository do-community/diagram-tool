import diagrams from './diagrams.js';
import connectors from './connectors.js';
import nodes from './nodes.ts';
import documentation from './documentation.js';
import * as additionalIcons from './additionalIcons';

export default {
	diagrams,
	connectors,
	nodes,
	nodesByCategory: Object.keys(nodes).reduce((acc, k) => {
    if (!(nodes[k].category in acc)) {
      acc[nodes[k].category] = {};
    }
    acc[nodes[k].category][k] = nodes[k];
    return acc;
  }, {}),
  documentation,
  additionalIcons,
}
