import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import diagram_metadata from './diagram_metadata';
import connectors from './connectors';
import nodes from './nodes';

const rootReducer = combineReducers({diagram_metadata, connectors, nodes, routing: routerReducer });

export default rootReducer;
