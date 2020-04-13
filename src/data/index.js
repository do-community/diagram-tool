import diagrams from './diagrams';
import connectors from './connectors';
import nodes from './nodes';
import documentation from './documentation';
import additionalIconsMassImport from './additionalIcons/*.tsx';

const additionalIcons = {};
Object.keys(additionalIconsMassImport).map(k => additionalIcons[k] = additionalIconsMassImport[k].default);

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
