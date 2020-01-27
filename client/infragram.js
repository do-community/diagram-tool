import React from 'react';
import { render } from 'react-dom';

// Import css
import './styles/style.styl';

// Import components
import App from './components/App';
import Diagram from './components/Diagram';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Diagram}></IndexRoute>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
