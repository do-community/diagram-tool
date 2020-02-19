import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from "jquery";
window.$ = $;

import React from 'react';
import { render } from 'react-dom';

import Diagram from './components/Diagram';
import MainMenuSwitcher from './components/MainMenuSwitcher';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainMenuSwitcher}>
        <IndexRoute component={Diagram}></IndexRoute>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
