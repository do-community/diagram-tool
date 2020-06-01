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

import diagrams from './diagrams';
import connectors from './connectors';
import nodes from './nodes';
import documentation from './documentation';
import additionalIconsMassImport from './additionalIcons/*.tsx';

const additionalIcons = {};
Object.keys(additionalIconsMassImport).map(k => additionalIcons[k] = additionalIconsMassImport[k].default);

export default {
	diagrams,
	connectors,
	nodes,
	nodesByCategory: Object.keys(nodes).reduce((acc, k) => {
    if (!(nodes[k].category in acc)) {
      acc[nodes[k].category] = {};
    }
    acc[nodes[k].category][k] = nodes[k];
    return acc;
  }, {}),
  documentation,
  additionalIcons,
};
