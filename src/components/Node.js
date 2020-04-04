import React from 'react';
import dndHelper from '../dndHelper.js';
import helpers from '../helpers.js';
import NODES from '../data/NODES.js';
import ICONS from '../data/ICONS.js';
import ConnectorDragHandle from './ConnectorDragHandle';

class Node extends React.Component {
  handleOffset() {
    return {
      left: (this.props.position ? this.props.position[0] * 100 : 0) + 'px',
      top: ((this.props.position ? this.props.position[1] * 100 : 0) - window.pageYOffset) + 'px'
    }
  }
  render() {
    let {
        node_template,
        id,
        metadata,
        tags,
        type,
        connectDragSource,
        connectDropTarget
      } = this.props,
      scale = Math.round('scale' in metadata ? 60 * metadata.scale : 60),
      label_offset = { bottom: (node_template.label_offset ? node_template.label_offset : 0) + 'px' };
      metadata = metadata || {};

    return connectDropTarget(
      connectDragSource(
        <figure
          key={id}
          data-click_key={id}
          data-category="node"
          style={this.handleOffset()}
          data-selected={this.props.selected === true}
          className="hoverParent"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            style={metadata.color ? { color: metadata.color } : {}}
            
          >
            {node_template.behavior.regionless
              ?
              undefined
              :
              ICONS.bubble
            }
            {node_template.extends && node_template.extends === 'droplet'
              ?
              ICONS.droplet
              :
              undefined
            }
            {ICONS[type]}
            {
              metadata.block_storage ? 
              <svg width="20px" height="20px" x="54px" y="40px" style={{width: '20px', height: '20px'}} >{ICONS.block_storage}</svg>
              :
              null
            }

            {metadata.management_method ? (
              <svg
                width={scale + 'px'}
                height={scale + 'px'}
                style={{width: scale + 'px', height: scale + 'px'}}
                x={Math.round(((100 - scale) / 2) - (metadata.block_storage ? Math.cbrt(Math.max(1000,metadata.block_storage))/2.0 : 0)) + 'px'}
                y={Math.round((100 - scale) / 2) + 'px'}
                
              >
                {ICONS[metadata.management_method]}
              </svg>
            ) : null}
            
            {metadata.active_disable_temporarily ? (
              <circle className="active" r="4" cx="12" cy="89" />
            ) : null}

            {metadata.favicon ? (
              <image
                xlinkHref={metadata.favicon}
                x="34"
                y="38"
                height="32px"
                width="32px"
                style={{width: '32px', height: '32px'}}
              />
            ) : null}

          </svg>

          <figcaption style={label_offset}>
            {metadata.name || node_template.short_name}
            {metadata.tags
              ? (typeof(metadata.tags) === 'string' ? metadata.tags.split(',') : metadata.tags).map((tag, i) => (
                  (tag in tags ?
                    <svg key={id + '_tag_' + i} title={tag} >
                      <svg
                        width="10px"
                        height="10px"
                        className={'qual_' + tags[tag].color_id}
                        style={{width: '10px', height: '10px'}}
                      >
                        {ICONS.tag}
                      </svg>
                    </svg> : '')
                ))
              : null}
          </figcaption>

          {NODES[type].behavior.requests === 'creator' ? <button className="createRequest selectShow" data-click_key={id} data-category="request">▶</button> : undefined}

          {['n', 'e', 's', 'w'].map(d => (
            <ConnectorDragHandle key={d} dir={d} parent={id} />
          ))}
        </figure>
      )
    );
  }
}

export default dndHelper.composeDragAndDrop('node', 'move', Node);