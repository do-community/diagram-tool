import React from 'react';
import Node from './Node';
import Connector from './Connector';
import tray_presets from '../data/tray_presets';

const Diagram = React.createClass({
  render(){
    return (
      <div className="main">

        <nav className="tray">
          <section>
            <h3>Nodes</h3>
            {Object.keys(tray_presets.nodes).map((id) => <Node key={id} i={id} node={tray_presets.nodes[id]} add_or_move={this.props.addNode} />)}
          </section>
        </nav>

        <div className="diagram">

          {this.props.connectors.map((connector, i) =>
            <Connector {...connector} key={i} i={i} connector={tray_presets.connectors[connector.type]} nodes={this.props.nodes} deleteConnector={this.props.deleteConnector} />
          )}
          {this.props.nodes.map((node, i) =>
            <Node {...node} key={i} i={i} node={tray_presets.nodes[node.type]} add_or_move={this.props.moveNode} addConnector={this.props.addConnector} />
          )}
        </div>

      </div>
    )
  }
});

export default Diagram;
