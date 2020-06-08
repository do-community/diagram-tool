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
import Tray from './Tray';
import Node from './Node';
import Connector from './Connector';
import Category from './Category';
import NodeEditor from './NodeEditor';
import DiagramMetadata from './DiagramMetadata';
import { showWhereClick, viewVisible, clear } from '../showWhereClick';
import lineGenerator from '../lineGenerator';
import FirstUsageTutorial from './FirstUsageTutorial';

import data from '../data';
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
    this.share = this.share.bind(this);
    helpers.initializeState(function(response) {
      props.initialize(response);
    });
    this.state = {categoryNames: JSON.parse(localStorage.getItem('diagramToolCategoryNames') || '{}')};
  }

  keyDown(event) {
    const keyCode = event.keyCode ? event.keyCode : event.which;
    if (
      ['input', 'textarea'].indexOf(event.target.tagName.toLowerCase()) === -1
    ) {
      let move = [0, 0];
      if (keyCode === 37) {
        move[0] = -0.5;
      } else if (keyCode === 38) {
        move[1] = -0.5;
      } else if (keyCode === 39) {
        move[0] = 0.5;
      } else if (keyCode === 40) {
        move[1] = 0.5;
      } else if (keyCode === 8) {
        ['node', 'connector'].map(category =>
          this.props.selection[category + 's'].map(key =>
            this.props['delete' + helpers.capitalize(category)](key)
          )
        );
      }
      if (move[0] !== 0 || move[1] !== 0) {
        if(event.shiftKey) move = move.map((m) => {return m/2.0;});
        ['node', 'connector'].map(category =>
          this.props.selection[category + 's'].map(key => {
            this.props['move' + helpers.capitalize(category)](
              key,
              ...move,
              true
            );
          })
        );
      }
    }
  }

  copy() {
    if(!helpers.copyPastingText()) {
      this.props.copyNodes(
        this.props.selection.nodes.reduce((a, n) => {
          a[n] = this.props.nodes[n];
          return a;
        }, {})
      );
    }
  }

  paste() {
    if(!helpers.copyPastingText()) {
      Object.values(this.props.selection.clipboard).map(c => {
        helpers.addNodeAndConnections(
          c.type,
          c.position,
          c.metadata,
          this.props
        );
      });
    }
  }

  click(event) {
    const target = event.target;
    if (target) {
      if (target.getAttribute('data-ondoubleclick') === 'add') {
        if (target.getAttribute('data-dblclick') == null) {
          target.setAttribute('data-dblclick', +new Date());
        } else if (
          +new Date() - parseInt(target.getAttribute('data-dblclick'), 10) >
          300
        ) {
          target.removeAttribute('data-dblclick');
        } else {
          target.removeAttribute('data-dblclick');
          helpers.addNodeAndConnections(
            target.dataset.type,
            [0, 0],
            {},
            this.props
          );
        }
      } else {
        if (target.dataset.category === 'node')
          target.dataset.selected === 'false'
            ? this.props.selectNodes(target.dataset.click_key, event.shiftKey)
            : this.props.deselectNodes(target.dataset.click_key);
        else if (target.dataset.category === 'connector')
          target.dataset.selected === 'false'
            ? this.props.selectConnectors(
                parseInt(target.dataset.click_key, 10),
                event.shiftKey
              )
            : this.props.deselectConnectors(parseInt(target.dataset.click_key, 10));
        else if (target.dataset.category === 'request')
          console.log('play');
        else if (event.target.getAttribute('class') === 'diagram') {
          if (viewVisible()) {
            clear();
            lineGenerator();
          } else {
            showWhereClick(<Tray
              nodes={this.props.nodes}
              addNode={this.props.addNode}
            />, event, 10);
            lineGenerator({
              x: event.clientX,
              y: event.clientY,
            });
          }
        }
      }
    } else if (
      event.target.className === 'diagram' &&
      Object.keys(this.props.selection.nodes).length +
        Object.keys(this.props.selection.connectors).length >
        0
    ) {
      this.props.deselectNodes();
    }
  }

  mouseDown(event) {
      if (event.target.className === 'diagram') {
        helpers.dragHighlight(
          [event.clientX, event.clientY],
          this.props.selectNodes,
          this.props.nodes
        );
      }
  }

  composeSelectionObject(category) {
    /* TODO: clean */
    return category === null
      ? {}
      : {
          identifier: this.props.selection[category + 's'][0],
          item: this.props[category + 's'][
            this.props.selection[category + 's'][0]
          ],
          template:
            data[category.toLowerCase() + 's'][
              this.props[category + 's'][
                this.props.selection[category + 's'][0]
              ].type
            ],
          editAction: this.props['edit' + helpers.capitalize(category)],
          editType: this.props['edit' + helpers.capitalize(category) + 'Type']
        };
  }

  diagramDrop(targetCategory, target, item, offset) {
    dndHelper.handleDrop(this.props, targetCategory, target, item, offset);
  }

  share(e) {
    e.stopPropagation();
    helpers.remoteSaveState(
      {
        metadata: this.props.metadata,
        nodes: this.props.nodes,
        connectors: this.props.connectors
      },
      function(uuid) {
        const link = document.querySelector('.shareText');
        link.value = window.location.href + uuid;
        link.select();
        document.execCommand('copy');
      }
    );
    return false;
  }

  saveCategoryNames() {
    localStorage.setItem('diagramToolCategoryNames', JSON.stringify(this.state.categoryNames));
  }

  render() {
    const {
        nodes,
        connectors,
        selection,
        connectDropTarget,
      } = this.props,
      categories = helpers.getCategoriesFromNodes(nodes),
      tags = helpers.getTagsFromNodes(nodes),
      selected = this.composeSelectionObject(
        selection.nodes.length === 1
          ? 'node'
          : selection.connectors.length === 1 ? 'connector' : null
      );
      const categoryNames = this.state.categoryNames;

      const mappedNodes = {};
      Object.keys(nodes).forEach(key => (
        mappedNodes[key] = <Node
          key={key}
          id={key}
          nodeTemplate={data.nodes[nodes[key].type]}
          metadata={nodes[key].metadata}
          position={nodes[key].position}
          type={nodes[key].type}
          selected={selection.nodes.indexOf(key) >= 0}
          tags={tags}
          onDrop={(item, offset) =>
            this.diagramDrop('node', key, item, offset)
          }
        />
      ));

      const diagramDiv = <div className="diagram">
      {Object.keys(categories).map(category => (
        <Category
          key={category}
          id={category}
          saveCategoryNames={this.saveCategoryNames.bind(this)}
          categoryNames={categoryNames}
          outlineColor={categories[category][0][1]}
          bounds={helpers.getBoundingRectangle(category, nodes)}
          onDrop={(item, offset) =>
            this.diagramDrop('category', category, item, offset)
          }
        />
      ))}

      {connectors.map((connector, i) => (
        <Connector
          key={i}
          id={i}
          connectorTemplate={data.connectors[connector.type]}
          metadata={connector.metadata}
          between={[
            nodes[connector.between[0]].position,
            nodes[connector.between[1]].position
          ]}
          selected={selection.connectors.indexOf(i) >= 0}
          onDrop={(item, offset) =>
            this.diagramDrop('connector', i, item, offset)
          }
        />
      ))}

      {Object.values(mappedNodes)}
    </div>;

    let blankNodeElement;
    if (Object.keys(mappedNodes).length === 0) blankNodeElement = <FirstUsageTutorial />;

    return connectDropTarget(<div className="modal" style={{display: 'initial'}}>
      <div className="modal-content" style={{width: '100%', height: '100%'}}>
        <div
          className="main"
          tabIndex="0"
          onKeyDown={this.keyDown}
          onCopy={this.copy}
          onPaste={this.paste}
          onMouseDown={this.mouseDown}
          onClick={this.click}
        >

          <NodeEditor {...selected} />

          {blankNodeElement}

          <DiagramMetadata
            {...this.props.metadata}
            switchToMenu={this.props.switchToMenu}
            editAction={this.props.editDiagramMetadata}
          />

          {diagramDiv}
        </div>
      </div>
    </div>);
  }
}

export default dndHelper.composeDrop(Diagram);
