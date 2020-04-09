import DIAGRAMS from './DIAGRAMS';
import CONNECTORS from './CONNECTORS';
import NODES from './nodes';
import DOCUMENTATION from './DOCUMENTATION';
import ICONS from './ICONS';

const DATA = {
	DIAGRAMS:DIAGRAMS,
	CONNECTORS:CONNECTORS,
	NODES,
	NODES_BY_CATEGORY: 
	  Object.keys(NODES).reduce( (acc,k) => {
      if (!(NODES[k].category in acc)) {
        acc[NODES[k].category] = {};
      }
      acc[NODES[k].category][k] = NODES[k];
      return acc;
    }, {}),
  DOCUMENTATION:DOCUMENTATION,
  ICONS:ICONS,
}

export default DATA;