import React from 'react';
import { Link } from 'react-router';
import helpers from '../helpers.js';

const Node = React.createClass({
  dragEnd(event) {
    const dpos = document.querySelector('.diagram').getBoundingClientRect();
    this.props.add_or_move(this.props.i, Math.ceil((event.clientX - dpos.left - (dpos.width/2))/100.0), Math.floor((event.clientY - dpos.top - (dpos.height/2))/100.0));
  },
  connectorStart(event) {
    event.preventDefault();
    window.removeEventListener('mouseup',this.connectorEnd, false );
    window.addEventListener("mouseup", this.connectorEnd, false);
    document.querySelector('div.diagram').className += ' connecting'
  },
  connectorEnd(event) {
    const target_node = helpers.findUpClass(event.toElement, 'node');
    if(target_node) this.props.addConnector(this.props.i, target_node.dataset.id);
    window.removeEventListener('mouseup',this.connectorEnd, false );
    document.querySelector('div.diagram').className = document.querySelector('div.diagram').className.replace('connecting', '');
  },
  render() {
    const { node, i, position, customization } = this.props;
    var offset = {
      left: (position ? position[0] * 10 : 0 ) + 'rem',
      top: (position ? position[1] * 10 : 0 ) + 'rem',
    }
    return (
      <figure data-id={i} className="node" style={offset} draggable="true" onDragEnd={this.dragEnd}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path d={node.svg_path} stroke="#0069ff" fill="transparent" />
          <circle className="n" cx="50" cy="7.5" r="5"  onMouseDown={this.connectorStart} />
          <circle className="e" cx="92.5" cy="50" r="5" onMouseDown={this.connectorStart} />
          <circle className="s" cx="50" cy="92.5" r="5" onMouseDown={this.connectorStart} />
          <circle className="w" cx="7.5" cy="50" r="5"  onMouseDown={this.connectorStart} />
        </svg>
        <figcaption>
          {node.name}
        </figcaption>
      </figure>
    )
  }
});

export default Node;
