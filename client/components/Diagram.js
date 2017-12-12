import React from 'react';
import dndHelper from '../dndHelper.js';
import ModeSelector from './ModeSelector';
import Tray from './Tray';
import Node from './Node';
import Connector from './Connector';
import Region from './Region';
import NodeEditor from './NodeEditor';
import ParticleCanvas from './ParticleCanvas';

import DATA from '../data';
import helpers from '../helpers.js';

class Diagram extends React.Component {


  constructor(props) {
    super(props);
    this.keyDown = this.keyDown.bind(this);
    this.copy = this.copy.bind(this);
    this.paste = this.paste.bind(this);
    this.click = this.click.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.composeSelectionObject = this.composeSelectionObject.bind(this);
    this.diagramDrop = this.diagramDrop.bind(this);
  }

  keyDown (event) {
    const keyCode = event.keyCode ? event.keyCode : event.which;
    let move = [0,0];
    if(keyCode === 37){
      move[0] = -0.5;
    } else if(keyCode === 38) {
      move[1] = -0.5;
    } else if(keyCode === 39) {
      move[0] = 0.5;
    } else if(keyCode === 40) {
      move[1] = 0.5
    } else if(keyCode === 8) {
      ['node', 'connector'].map((category) =>
        this.props.selection[category + 's'].map((key) => this.props['delete' + helpers.capitalize(category)](key))
      )
    }
    if(move[0] !== 0 || move[1] !== 0) {
      ['node', 'connector'].map((category) =>
        this.props.selection[category + 's'].map((key) =>
          {
            this.props['move' + helpers.capitalize(category)](key, ...move, true)
          }
        )
      );
    }
  }

  copy() {
    this.props.copyNodes(this.props.selection.nodes.reduce((a,n) => { a[n] = this.props.nodes[n]; return a; }, {}));
  }

  paste() {
    Object.keys(this.props.selection.clipboard).map((n) => {
      const new_guid = helpers.guid();
      this.props.addNode(new_guid,  this.props.selection.clipboard[n].type, ...helpers.findSpace(this.props.nodes, this.props.selection.clipboard[n].position), this.props.selection.clipboard[n].metadata);
      this.props.selectNodes(new_guid);
    });
  }

  click (event) {
    const target = helpers.getKeyedElement(event.target);
    if(target) {
        if(target.dataset.category === 'node') target.dataset.selected==='false' ? this.props.selectNodes(target.dataset.key, event.shiftKey) : this.props.deselectNodes(target.dataset.key);
        else if(target.dataset.category === 'connector') target.dataset.selected==='false' ? this.props.selectConnectors(parseInt(target.dataset.key, 10), event.shiftKey) : this.props.deselectConnectors(parseInt(target.dataset.key, 10));
    } else if (Object.keys(this.props.selection.nodes).length + Object.keys(this.props.selection.connectors).length > 0) {
      this.props.deselectNodes();
    }
  }

  mouseDown (event) {
    if(event.target.className === "diagram") {
      helpers.drag([event.clientX, event.clientY], this.props.selectNodes, this.props.nodes);
    }
  }

  composeSelectionObject (category) {
    /* TODO:@andy to clean */
    return ( category === null ?
      {}
      :
      {
        identifier: this.props.selection[category + 's'][0],
        item: this.props[category + 's'][this.props.selection[category + 's'][0]],
        template: DATA[category.toUpperCase() + 'S'][this.props[category + 's'][this.props.selection[category + 's'][0]].type],
        editAction: this.props['edit' + helpers.capitalize(category)]
      }
    );
  }

  diagramDrop (target_category, target, item, offset) {
    dndHelper.handleDrop(this.props, target_category, target, item, offset);
  }

  render () {

    const {nodes, connectors, selection, connectDropTarget, mode} = this.props,
          regions = helpers.regionsFromNodes(nodes),
          selected = this.composeSelectionObject(selection.nodes.length === 1 ? 'node' : (selection.connectors.length === 1 ? 'connector' : null));

    return connectDropTarget(
      <div className="main">

        <Tray mode={mode} onDrop={(item) => this.diagramDrop('tray', null, item)}/>

        <ModeSelector mode={this.props.mode} modes={ ['Build', 'Test', 'Publish', 'Deploy'] } />

        <div className="diagram" tabIndex="0" onKeyDown={this.keyDown} onClick={this.click} onCopy={this.copy} onPaste={this.paste} onMouseDown={this.mouseDown}>

          {Object.keys(regions).map((region) =>
            <Region
              key={region} id={region}
              region_name={region}
              bounds={helpers.getBoundingRect(region, nodes)}
              onDrop={(item, offset) => this.diagramDrop('region', region, item, offset)}
            />
          )}


          {connectors.map((connector, i) =>
            <Connector
              key={i} id={i}
              connector_template={DATA.CONNECTORS[connector.type]}
              metadata={connector.metadata}
              between={[nodes[connector.between[0]].position, nodes[connector.between[1]].position]}
              selected={selection.connectors.indexOf(i) >= 0}
              onDrop={(item, offset) => this.diagramDrop('connector', i, item, offset)}
            />
          )}


          {Object.keys(nodes).map((key) =>
            <Node
              key={key} id={key}
              node_template={DATA.NODES[nodes[key].type]}
              metadata={nodes[key].metadata}
              position={nodes[key].position}
              type={nodes[key].type}
              selected={selection.nodes.indexOf(key) >= 0}
              onDrop={(item, offset) => this.diagramDrop('node', key, item, offset)}
            />
          )}


        </div>

        <NodeEditor {...selected} />

        <ParticleCanvas />

      </div>
    )
  }
};

export default dndHelper.composeDrop(Diagram);
