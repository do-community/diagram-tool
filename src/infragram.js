import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';

import MainMenuSwitcher from './components/MainMenuSwitcher';
import { ClickPositioner } from './showWhereClick';

import { Provider } from 'react-redux';
import store from './store';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

const router = (
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <ClickPositioner />
      <MainMenuSwitcher />
    </DndProvider>
  </Provider>
)

render(router, document.getElementById('root'));
