import React from 'react';
import DATA from '../data';

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
          itemType = typeof(identifier) === 'string' ? 'node' : 'connector';
  
    if(!item) return (<form className="infragram--rightPane collapsed"></form>);

    const allMetadata = Object.assign({}, (itemType === 'node' && DATA.nodes[item.type].extends && DATA.nodes[item.type].extends === 'droplet' ? DATA.nodes.droplet.metadata : {}), (itemType === 'node' ? DATA.nodes[item.type].metadata : DATA.connectors[item.type].metadata), item.metadata);
    
    return (
      <div className="infragram--rightPane bui-Box">
        <h3>{template.name} settings:</h3>
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

export default Plan;
