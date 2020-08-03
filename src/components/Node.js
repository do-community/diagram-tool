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
import dndHelper from '../dndHelper.js';
import nodes from '../data/nodes';
import data from '../data';
import ConnectorDragHandle from './ConnectorDragHandle';
const { additionalIcons } = data;

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.rendered(this);
  }

  handleOffset() {
    return {
      left: (this.props.position ? this.props.position[0] : 0) + 'px',
      top: ((this.props.position ? this.props.position[1] : 0) - window.pageYOffset) + 'px'
    };
  }

  render() {
      let {
        nodeTemplate,
        id,
        metadata,
        tags,
        type,
        connectDragSource,
        connectDropTarget,
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
            {nodeTemplate.extends && nodeTemplate.extends === 'droplet'
              ?
              additionalIcons.droplet
              :
              undefined
            }
            {nodeTemplate.icon}
            {
              metadata.blockStorage ?
              <svg width="20px" height="20px" x="54px" y="40px" style={{width: '20px', height: '20px'}} >{additionalIcons.blockStorage}</svg>
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
                {additionalIcons[metadata.managementMethod]}
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
                        {additionalIcons.tag}
                      </svg>
                    </svg> : '')
                ))
              : null}
          </figcaption>

          {nodes[type].behavior.requests === 'creator' ? <button className="createRequest selectShow" data-click_key={id} data-category="request">▶</button> : undefined}

          {['n', 'e', 's', 'w'].map(d => (
            <ConnectorDragHandle key={d} dir={d} parent={id} />
          ))}
        </figure>
      )
    );
  }
}

export default dndHelper.composeDragAndDrop('node', 'move', Node);
