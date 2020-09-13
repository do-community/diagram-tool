/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

//import the root reducer
import rootReducer from './reducers/index';

//helpers
import * as helpers from './helpers.js';



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

export const saveStore = throttle(() => {
	const appState = store.getState();
	helpers.saveState({
		metadata:appState.metadata,
		nodes:appState.nodes,
		connectors:appState.connectors,
		categoryNames:appState.categoryNames
	});
});

//Continuously save application state to localstorage
store.subscribe(saveStore);

export default store;
