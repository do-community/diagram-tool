import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

//import the root reducer
import rootReducer from './reducers/index';

//helpers
import helpers from './helpers.js';



const defaultState = {
  metadata: {},
  connectors: [],
  nodes: {},
  selection: {nodes:[], connectors:[], clipboard:{}},
  mode: 'Build'
};

const store = createStore(
	rootReducer,
	defaultState,
	window.navigator.userAgent.includes('Chrome') && window.__REDUX_DEVTOOLS_EXTENSION__
	?
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	)
	:
	compose(
		applyMiddleware(thunk)
	)
);

//Continuously save application state to localstorage
store.subscribe(throttle(() => {
	const appState = store.getState();
	helpers.saveState({
		metadata:appState.metadata,
		nodes:appState.nodes,
		connectors:appState.connectors
	});
}, 10000));

export default store;
