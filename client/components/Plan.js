import React from 'react';
import DATA from '../data';
import $ from 'jquery';

class Plan extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.editType(this.props.identifier, e.target.value);
  }

  render() {

    const {item, identifier, template, editAction} = this.props,
          item_type = typeof(identifier) === 'string' ? 'node' : 'connector';
  
    if(!item) return (<form className="infragram--rightPane collapsed"></form>);

    //TODO: Figure out how to re-ini bui form js
    window.setTimeout(function(){$.getScript('https://assets.digitalocean.com/bui/1.0.0/bui.js')}, 10);

    const all_metadata = Object.assign({}, (item_type === 'node' && DATA.NODES[item.type].extends && DATA.NODES[item.type].extends === 'droplet' ? DATA.NODES.droplet.metadata : {}), (item_type === 'node' ? DATA.NODES[item.type].metadata : DATA.CONNECTORS[item.type].metadata), item.metadata);
    
    return (
      <div className="infragram--rightPane bui-Box">
        <h3>{template.name} settings:</h3>
        <p>{template.description}</p>
        <form className="bui-Form--spacing" onLoad={$(this).init}>

        {item_type === 'connector' ?
          <div className="bui-Select">
            <label htmlFor="type">{item_type} type:</label>
            <select
              id="type"
              onChange={this.handleChange}
              value={item.type}
            >
              {Object.keys(DATA.CONNECTORS).map((o,i) => <option value={o} key={'opt_'+o+'_'+i}>{o}</option>)}
            </select>
          </div> : undefined }

          {Object.keys(all_metadata).map((m,i) => 
            <NodeEditorField
              key={i}
              name={m}
              value={all_metadata[m]}
              specs={item_type in DATA.DOCUMENTATION && m in DATA.DOCUMENTATION[item_type] ? DATA.DOCUMENTATION[item_type][m] : {}}
              editAction={editAction}
              identifier={identifier}
            />

          )}
        </form>
      </div>
    )
  }
};

export default Plan;
