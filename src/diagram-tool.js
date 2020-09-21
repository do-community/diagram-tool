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

class QueueItem {
  constructor(item) {
    this.item = item;
    this.next = undefined;
  }
}

class QueueRoot {
  constructor() {
    this.start = undefined;
    this.end = undefined;
  }

  forEach(f) {
    let nextInQueue = this.start;
    while (nextInQueue) {
      // Call the function.
      f(nextInQueue.item);

      // Get the next item.
      nextInQueue = nextInQueue.next;
    }
  }

  push(item) {
    if (this.end) {
      // Add to the end.
      this.end.next = new QueueItem(item);
      this.end = this.end.next;
    } else {
      // Create the end and start.
      this.start = new QueueItem(item);
      this.end = this.start;
    }
  }
}

window.resizeQueue = new QueueRoot();
window.onresize = () => window.resizeQueue.forEach(x => x());

import './styles/style.scss';

import React from 'react';
import { render } from 'react-dom';

import VisiblePageSwitcher from './components/VisiblePageSwitcher';
import { ClickPositioner } from './showWhereClick';

import { Provider } from 'react-redux';
import store from './store';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

const router = (
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <ClickPositioner />
      <VisiblePageSwitcher />
    </DndProvider>
  </Provider>
);

render(router, document.getElementById('root'));

import iconLoader from './iconLoader';
window.iconLoader = iconLoader;
