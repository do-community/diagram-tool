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

import React from 'react';
import DATA from '../data';
import { saveStore } from '../store';

class NodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.editType(this.props.identifier, e.target.value);
  }

  rmNode() {
    this.props.deleteNode(this.props.identifier);
  }

  rmCats() {
    for (const cat of this.props.item.metadata.categories) {
      const otherNodes = Object.keys(this.props.nodes).filter(
        k => this.props.nodes[k].metadata.categories.includes(cat) && k !== this.props.id).map(
          k => this.props.nodes[k]);
      if (otherNodes.length === 1) {
        const a = [...otherNodes[0].metadata.categories];
        otherNodes[0].metadata.categories.length = 0;
        for (const c of a) {
          if (cat !== c) {
            otherNodes[0].metadata.categories.append(c);
          }
        }
      }
    }
    this.props.item.metadata.categories.length = 0;
    this.props.updateDiagram();
    saveStore();
  }

  render() {

    const {item, identifier, template} = this.props,
          itemType = typeof(identifier) === 'string' ? 'node' : 'connector';

    if(!item) return (<span />);

    const allMetadata = Object.assign({}, (itemType === 'node' && DATA.nodes[item.type].extends && DATA.nodes[item.type].extends === 'droplet' ? DATA.nodes.droplet.metadata : {}), (itemType === 'node' ? DATA.nodes[item.type].metadata : DATA.connectors[item.type].metadata), item.metadata);

    return (
      <div className="node-config panel">
        <h3>{template.name}{Object.keys(allMetadata).length === 0 ? '' : ' settings'}:</h3>
        <p>{template.description}</p>
        <form className="bui-Form--spacing">
          {
            (item.metadata.categories || []).length !== 0 ? <p>
              <a style={{cursor: 'pointer'}} onClick={this.rmCats.bind(this)}>Remove from all categories</a>
            </p> : undefined
          }
          <p>
            <a style={{cursor: 'pointer'}} onClick={this.rmNode.bind(this)}>Remove node</a>
          </p>
        </form>
      </div>
    );
  }
};

export default NodeEditor;
