import React from 'react';
import dndHelper from '../dndHelper.js';

import helpers from '../helpers.js';
import NODES from '../data/NODES.js';
import ConnectorDragHandle from './ConnectorDragHandle'

class Node extends React.Component {

  render() {

    const { node_template, id, position, metadata, type, isDragging, connectDragSource, connectDropTarget, selected } = this.props,
          scale = Math.round(metadata.scale ? 60 * metadata.scale : 60),
          offset = {
            left: (position ? position[0] * 100 : 0 ) + 'px',
            top: (position ? position[1] * 100 : 0 ) + 'px',
          },
          label_offset = {bottom: (68-scale)/16 + 'px'};

    return connectDropTarget(connectDragSource(
      <figure key={id} data-category="node" style={offset} data-key={id} data-selected={this.props.selected === true} >
          <svg width="100%" height="100%" viewBox="0 0 100 100" style={metadata.color ? {color:metadata.color} : {}}>
            <use xlinkHref={'#' + type} width={scale + "px"} height={scale + "px"}
              x={Math.round((100-scale)/2) + "px"} y={Math.round((100-scale)/2) + "px"} />
            {metadata.docker ? <use xlinkHref="#docker" width="60px" height="60px" x="21px" y="22px" /> : ''}
            {metadata.active_disable_temporarily ? <circle className="active" r="4" cx="12" cy="89" /> : ''}
            {metadata.favicon ? <image xlinkHref={metadata.favicon} x="34" y="38" height="32px" width="32px"/> : ''}
          </svg>
        <figcaption style={label_offset}>
          { metadata.name || node_template.short_name } {isDragging && ' (dragging)'}
        </figcaption>
        {["n", "e", "s", "w"].map((d) => <ConnectorDragHandle key={d} dir={d} parent={id} />)}
      </figure>
    ))

  }
};

export default dndHelper.composeDragAndDrop('node', 'move', Node);
