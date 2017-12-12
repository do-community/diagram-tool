import React from 'react';
import { Link } from 'react-router';
import NodeEditorField from './NodeEditorField.js';
import DOCUMENTATION from '../data/DOCUMENTATION.js';

class NodeEditor extends React.Component {
  render() {
    const {category, item, identifier, template, editAction} = this.props;
    if(!item) return (<form className="detailPane collapsed"></form>);
    return (
      <form className="detailPane">
        <fieldset>
          <legend>{item.type} Settings:</legend>
          <p>{template.description}</p>
          {Object.keys(item.metadata).map((m,i) => 
            <NodeEditorField
              key={i}
              name={m}
              value={item.metadata[m]}
              specs={category in DOCUMENTATION && m in DOCUMENTATION[category] ? DOCUMENTATION[category][m] : {}}
              editAction={editAction}
              identifier={identifier}
            />
          )}
        </fieldset>
      </form>
    )
  }
};

export default NodeEditor;
