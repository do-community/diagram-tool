import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import metadata from './metadata';
import connectors from './connectors';
import nodes from './nodes';
import selection from './selection';
import mode from './mode';

const rootReducer = combineReducers({metadata, connectors, nodes, selection, mode, routing: routerReducer});

export default rootReducer;
