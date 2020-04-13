import diagrams from './diagrams';
import connectors from './connectors';
import nodes from './nodes';
import documentation from './documentation';
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
