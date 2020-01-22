import DIAGRAMS from './DIAGRAMS';
import CONNECTORS from './CONNECTORS';
import NODES from './NODES';
import DOCUMENTATION from './DOCUMENTATION';

const DATA = {
	DIAGRAMS:DIAGRAMS,
	CONNECTORS:CONNECTORS,
	NODES:NODES,
	NODES_BY_CATEGORY: 
	  Object.keys(NODES).reduce( (acc,k) => {
      if (!(NODES[k].category in acc)) {
        acc[NODES[k].category] = {};
      }
      acc[NODES[k].category][k] = NODES[k];
      return acc;
    }, {}),
	DOCUMENTATION:DOCUMENTATION
}

export default DATA;