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
import * as dndHelper from '../dndHelper.js';
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
import * as helpers from '../helpers.js';
import { saveStore } from '../store.js';

let mappedNodes = {};

export let refreshDiagram;

export let getLeftOffset;
export let getTopOffset;

export const mappedPositions = {};

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
    helpers.initializeState(function(response) {
      props.initialize(response);
    });
    this.state = {categoryNames: JSON.parse(localStorage.getItem('diagramToolCategoryNames') || '{}'), left: 0, top: 0};
    refreshDiagram = this.forceUpdate.bind(this);
    getLeftOffset = this.getLeftOffset.bind(this);
    getTopOffset = this.getTopOffset.bind(this);
  }

  getTopOffset() {
    return this.state.top * -1;
  }

  getLeftOffset() {
    return this.state.left * -1;
  }

  manageSnap(key, move) {
    // Get the node position.
    const pos = this.props.nodes[key].position;

    // Get the X/Y diff.
    let xDiff = move[0];
    let yDiff = move[1];

    // Perform pos[0] mod 8 to get xMod. If it isn't 0, substract/add it to the x diff depending on if it's negative or positive.
    const xMod = Math.abs(pos[0] % 8);
    if (xMod !== 0) {
      if (xDiff > 0) xDiff += xMod;
      else xDiff -= xMod;
    }

    // Perform pos[1] mod 8 to get yMod. If it isn't 0, substract/add it to the y diff depending on if it's negative or positive.
    const yMod = Math.abs(pos[1] % 8);
    if (yMod !== 0) {
      if (yDiff > 0) yDiff += yMod;
      else yDiff -= yMod;
    }

    // Return the move.
    return [xDiff, yDiff];
  }

  keyDown(event) {
    const keyCode = event.keyCode ? event.keyCode : event.which;
    if (
      ['input', 'textarea'].indexOf(event.target.tagName.toLowerCase()) === -1
    ) {
      let move = [0, 0];
      if (keyCode === 67) {
        this.copy();
      } else if (keyCode === 86) {
        this.paste();
      } else if (keyCode === 37) {
        move[0] = -8;
      } else if (keyCode === 38) {
        move[1] = -8;
      } else if (keyCode === 39) {
        move[0] = 8;
      } else if (keyCode === 40) {
        move[1] = 8;
      } else if (keyCode === 83) {
        move = null;
      }
      else if (keyCode === 8 || keyCode === 46) {
        ['node', 'connector'].map(category =>
          this.props.selection[category + 's'].map(key =>
            this.props['delete' + helpers.capitalize(category)](key)
          )
        );
      }
      if (!move || move[0] !== 0 || move[1] !== 0) {
        if(event.shiftKey) move = move.map((m) => {return m/2.0;});
        if (this.props.selection.nodes.length !== 0) {
          ['node', 'connector'].map(category =>
            this.props.selection[category + 's'].map((key, index, arr) => {
              if (move) {
                // Move the node.
                this.props['move' + helpers.capitalize(category)](
                  key,
                  ...this.manageSnap(key, move),
                  true
                );
              } else {
                // Align the node if possible.
                let connectedNodes = [];
                if (arr.length === 1) {
                  // Get connected nodes.
                  for (const connector of this.props.connectors) {
                    if (connector.between.includes(key)) {
                      for (const between of connector.between) {
                        if (between !== key) connectedNodes.push(between);
                      }
                    }
                  }
                } else {
                  // Get other nodes which were selected.
                  connectedNodes = arr.filter((_, i) => i !== index);
                }
  
                // If there's one connected node, we should try and align it by X/Y depending on what's logical.
                if (connectedNodes.length === 1) {
                  // Get the node we're connected to.
                  const connectedNode = this.props.nodes[connectedNodes[0]];
                  const currentNode = this.props.nodes[key];
  
                  // Check if we should change the X or Y position.
                  if (Math.abs(connectedNode.position[1] - currentNode.position[1]) > 80) {
                    // Set the node to be on the same X position.
                    this.props['move' + helpers.capitalize(category)](
                      key,
                      connectedNode.position[0] - currentNode.position[0],
                      0,
                      true
                    );
                  } else {
                      // Set the node to be on the same Y position.
                      this.props['move' + helpers.capitalize(category)](
                        key,
                        0,
                        connectedNode.position[1] - currentNode.position[1],
                        true
                      );
                  }
  
                  // Return here.
                  return;
                }
  
                // Try and get the lowest/highest X/Y.
                let lowestX = 9999999999;
                let lowestY = 9999999999;
                let highestX = -9999999999;
                let highestY = -9999999999;
                const nodeX = this.props.nodes[key].position[0];
                const nodeY = this.props.nodes[key].position[1];
                for (const node of connectedNodes.map(x => this.props.nodes[x])) {
                  if (lowestX > node.position[0]) lowestX = node.position[0];
                  if (lowestY > node.position[1]) lowestY = node.position[1];
                  if (node.position[0] > highestX) highestX = node.position[0];
                  if (node.position[1] > highestY) highestY = node.position[1];
                }
  
                const yDelta = highestY-lowestY;
  
                // Put the node in the midpoint.
                const yMidpoint = lowestY+(yDelta/2);
  
                // Get the X midpoint.
                const xMidpoint = lowestX+((highestX-lowestX)/2);
  
                // Do some maths to handle snapping with multiple items.
                if (80 > yDelta && 200 > Math.abs(lowestY-nodeY)) {
                  this.props['move' + helpers.capitalize(category)](
                    key,
                    0,
                    yMidpoint - nodeY,
                    true
                  );
                } else if (connectedNodes.length > 2) {
                  this.props['move' + helpers.capitalize(category)](
                    key,
                    xMidpoint - nodeX,
                    yMidpoint - nodeY,
                    true
                  );
                } else {
                  this.props['move' + helpers.capitalize(category)](
                    key,
                    xMidpoint - nodeX,
                    0,
                    true
                  );
                }
              }
            })
          );
        } else {
          // Move the canvas.
          let left = this.state.left + (move[0] * -1);
          if (left > 0) left = 0;
          let top = this.state.top + (move[1] * -1);
          if (top > 0) top = 0;
          this.setState({left, top});
          clear();
        }
      }
    }
  }

  copy() {
    if(!helpers.copyPastingText()) {
      // Check if there's a category shared across all nodes.
      let allCategoryMembers;
      const newCat = Math.random().toString();
      if (this.props.selection.nodes.length !== 0) {
        // Get the first item.
        const first = this.props.nodes[this.props.selection.nodes[0]];

        for (const cat of ((first.metadata || {}).categories) || []) {
          // Get every item after this and check if the category exists.
          let consistent = false;
          for (const otherNode of this.props.selection.nodes.slice(1)) {
            console.log(otherNode);
            consistent = this.props.nodes[otherNode].metadata.categories.includes(cat);
            if (!consistent) break;
          }

          // If this is consistent, set it and break.
          if (consistent) {
            allCategoryMembers = cat;
            break;
          }
        }
      }

      // Get the clipboard.
      const clipboard = this.props.selection.nodes.reduce((a, n) => {
        const node = Object.assign({}, this.props.nodes[n]);
        node.metadata = Object.assign({}, node.metadata);
        if (allCategoryMembers) node.metadata.categories = [newCat];
        a[Math.random().toString()] = node;
        return a;
      }, {});
      navigator.clipboard.writeText(JSON.stringify(clipboard));
    }
  }

  paste() {
    if(!helpers.copyPastingText()) {
      navigator.clipboard.readText().then(text => {
        const items = Object.values(JSON.parse(text));
        const nodeIds = items.map(c => helpers.addNodeAndConnections(
          c.type,
          c.position,
          c.metadata,
          this.props
        ));
        this.props.selectNodes(nodeIds);
      });
    }
  }

  click(event) {
    let target = event.target;
    const isNodeOrConnector = () => {
      let t = target;
      for (;;) {
        // If no parent node, return null.
        if (!t.parentNode) return null;

        // Check if this is a note.
        if (t.getAttribute('data-category') === 'node' || t.getAttribute('data-category') === 'connector') {
          target = t;
          return t.getAttribute('data-category');
        }

        // Get the next parent.
        t = t.parentNode;
      }
    };
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
        clear();
        const x = isNodeOrConnector();
        if (x === 'node')
          target.dataset.selected === 'false'
            ? this.props.selectNodes(target.dataset.click_key, event.shiftKey)
            : this.props.deselectNodes(target.dataset.click_key);
        else if (x === 'connector')
          target.dataset.selected === 'false'
            ? this.props.selectConnectors(
                parseInt(target.dataset.click_key, 10),
                event.shiftKey
              )
            : this.props.deselectConnectors(parseInt(target.dataset.click_key, 10));
        else if (target.dataset.category === 'request')
          console.log('play');
        else if (event.target.getAttribute('class') === 'diagram' || event.target.getAttribute('data-category') === 'category') {
          if (viewVisible()) {
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
            return this.props.deselectNodes();
          }
        }
      }
    } else if (
      event.target.className === 'diagram' &&
      Object.keys(this.props.selection.nodes).length +
        Object.keys(this.props.selection.connectors).length >
        0
    ) {
      return this.props.deselectNodes();
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

  saveCategoryNames() {
    localStorage.setItem('diagramToolCategoryNames', JSON.stringify(this.state.categoryNames));
  }

  render() {
    window.scrollTo(0, 0);
    saveStore();

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
      ),
      categoryNames = this.state.categoryNames;

      const mappedNodesElements = {};
      Object.keys(nodes).forEach(key => {
        mappedNodesElements[key] = <Node
          key={key}
          id={key}
          nodeTemplate={data.nodes[nodes[key].type]}
          metadata={nodes[key].metadata}
          position={nodes[key].position}
          type={nodes[key].type}
          selected={selection.nodes.indexOf(key) >= 0}
          tags={tags}
          nodes={nodes}
          beginDrag={rect =>
            mappedPositions[key] = {x: window.event.clientX - rect.x, y: window.event.clientY - rect.y}
          }
          onDrop={(item, offset) =>
            this.diagramDrop('node', key, item, offset)
          }
          updateDiagram={this.forceUpdate.bind(this)}
          rendered={x => mappedNodes[key] = x}
        />;
      });

      const diagramDiv = <div className="diagram" style={{left: `${this.state.left}px`, top: `${this.state.top}px`}}>
      {Object.keys(categories).map(category => (
        <Category
          key={category}
          id={category}
          saveCategoryNames={this.saveCategoryNames.bind(this)}
          categoryNames={categoryNames}
          outlineColor={categories[category][0][1]}
          bounds={helpers.getDomPosition(category, nodes)}
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

      {Object.values(mappedNodesElements)}
    </div>;

    let blankNodeElement;
    if (Object.keys(nodes).length === 0) blankNodeElement = <FirstUsageTutorial />;

    return connectDropTarget(<div className="modal" style={{display: 'initial', top: 0}}>
      <div className="modal-content" style={{width: '100%', height: '100%', padding: 0, margin: 0}}>
        <div
          className="main"
          tabIndex="0"
          onKeyDown={this.keyDown}
          onCopy={this.copy}
          onPaste={this.paste}
          onMouseDown={this.mouseDown}
          onClick={this.click}
        >
          <NodeEditor {...selected} deleteNode={this.props.deleteNode} deleteConnector={this.props.deleteConnector} updateDiagram={this.forceUpdate.bind(this)} nodes={this.props.nodes} />

          {blankNodeElement}

          <DiagramMetadata
            {...this.props.metadata}
            switchToNew={this.props.switchToNew}
            switchToSave={this.props.switchToSave}
            editAction={this.props.editDiagramMetadata}
            nodes={nodes}
          />

          {diagramDiv}
        </div>
      </div>
    </div>);
  }
}

export default dndHelper.composeDrop(Diagram);
