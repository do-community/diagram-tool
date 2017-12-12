import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';


//import the root reducer
import rootReducer from './reducers/index';

//default data
import DATA from './data';

//helpers
import helpers from './helpers.js';

// create an object for the default data
//TODO: not sure where this should go, take the default metadata and override with diagram's metadata
DATA.DIAGRAMS = DATA.DIAGRAMS.map((d) => {

	/* CONVERT NODES FROM ARRAY TO OBJECT (ESSENTIALLY A HASHMAP) */
	let indexmap = [], id;
	d.nodes = d.nodes.reduce((map, n) => {
	  id = "";
      if(n.type in DATA.NODES) {
      	id = helpers.guid();
      	n.metadata = {...(DATA.NODES[n.type].metadata || {}), ...(n.metadata || {})};
      	map[id] = n;
      }
      indexmap.push(id);
      return map;
  	}, {});

	/* RE-WIRE CONNECTIONS TO REFERENCE NEW NODE GUIDS, FILTER OUT INVALID CONNECTIONS */
  	d.connectors = d.connectors.reduce((arr, c) => {
  		c.between = c.between.map((l) => indexmap[l]);
  		if (c.between.indexOf('') === -1 && c.type in DATA.CONNECTORS) {
	  		arr.push({type:c.type, between:c.between, metadata:{...(DATA.CONNECTORS[c.type].metadata || {}), ...(c.metadata || {})}});
	  	}
  		return arr;
  	}, []);

  	return d;
});

const defaultState = {
  ...DATA.DIAGRAMS[2],
  selection: {nodes:[], connectors:[], clipboard:{}},
  mode: 'Build'
};

const store = createStore(
	rootReducer,
	defaultState,
	window.navigator.userAgent.includes('Chrome')
	?
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
	:
	compose(
		applyMiddleware(thunk)
	)
);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
