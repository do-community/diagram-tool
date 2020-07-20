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

import './styles/style.scss';

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
);

render(router, document.getElementById('root'));
