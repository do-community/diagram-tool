import React from 'react';
import dndHelper from '../dndHelper.js';
import NODES from '../data/nodes';
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
        nodeTemplate,
        id,
        metadata,
        tags,
        type,
        connectDragSource,
        connectDropTarget
      } = this.props,
      scale = Math.round('scale' in metadata ? 60 * metadata.scale : 60),
      labelOffset = { bottom: (nodeTemplate.labelOffset ? nodeTemplate.labelOffset : 0) + 'px' };
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
            {nodeTemplate.behavior.regionless
              ?
              undefined
              :
              ICONS.bubble
            }
            {nodeTemplate.extends && nodeTemplate.extends === 'droplet'
              ?
              ICONS.droplet
              :
              undefined
            }
            {ICONS[type]}
            {
              metadata.blockStorage ? 
              <svg width="20px" height="20px" x="54px" y="40px" style={{width: '20px', height: '20px'}} >{ICONS.blockStorage}</svg>
              :
              null
            }

            {metadata.managementMethod ? (
              <svg
                width={scale + 'px'}
                height={scale + 'px'}
                style={{width: scale + 'px', height: scale + 'px'}}
                x={Math.round(((100 - scale) / 2) - (metadata.blockStorage ? Math.cbrt(Math.max(1000,metadata.blockStorage))/2.0 : 0)) + 'px'}
                y={Math.round((100 - scale) / 2) + 'px'}
                
              >
                {ICONS[metadata.managementMethod]}
              </svg>
            ) : null}
            
            {metadata.activeDisableTemporarily ? (
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

          <figcaption style={labelOffset}>
            {metadata.name || nodeTemplate.shortName}
            {metadata.tags
              ? (typeof(metadata.tags) === 'string' ? metadata.tags.split(',') : metadata.tags).map((tag, i) => (
                  (tag in tags ?
                    <svg key={id + '_tag_' + i} title={tag} >
                      <svg
                        width="10px"
                        height="10px"
                        className={'qual_' + tags[tag].colorId}
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