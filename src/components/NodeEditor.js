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
import NodeEditorField from './NodeEditorField.js';
import DATA from '../data';

class NodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.editType(this.props.identifier, e.target.value);
  }

  render() {

    const {item, identifier, template, editAction} = this.props,
          itemType = typeof(identifier) === 'string' ? 'node' : 'connector';
  
    if(!item) return (<span />);

    const allMetadata = Object.assign({}, (itemType === 'node' && DATA.nodes[item.type].extends && DATA.nodes[item.type].extends === 'droplet' ? DATA.nodes.droplet.metadata : {}), (itemType === 'node' ? DATA.nodes[item.type].metadata : DATA.connectors[item.type].metadata), item.metadata);

    return (
      <div className="node-config">
        <h3>{template.name}{Object.keys(allMetadata).length === 0 ? '' : ' settings'}:</h3>
        <p>{template.description}</p>
        <form className="bui-Form--spacing">

        {itemType === 'connector' ?
          <div className="bui-Select">
            <label htmlFor="type">{itemType} type:</label>
            <select
              id="type"
              onChange={this.handleChange}
              value={item.type}
            >
              {Object.keys(DATA.connectors).map((o,i) => <option value={o} key={'opt_'+o+'_'+i}>{o}</option>)}
            </select>
          </div> : undefined }

          {Object.keys(allMetadata).map((m,i) => 
            <NodeEditorField
              key={i}
              name={m}
              value={allMetadata[m]}
              specs={itemType in DATA.documentation && m in DATA.documentation[itemType] ? DATA.documentation[itemType][m] : {}}
              editAction={editAction}
              identifier={identifier}
            />

          )}
        </form>
      </div>
    )
  }
};

export default NodeEditor;
