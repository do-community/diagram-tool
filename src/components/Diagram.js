import React from 'react';
import dndHelper from '../dndHelper.js';
import Tray from './Tray';
import Node from './Node';
import Connector from './Connector';
import Region from './Region';
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
      Object.keys(this.props.selection.clipboard).map(n => {
        helpers.addNodeAndConnections(
          this.props.selection.clipboard[n].type,
          this.props.selection.clipboard[n].position,
          this.props.selection.clipboard[n].metadata,
          this.props
        );
      });
    }
  }

  click(event) {
    const target = helpers.getKeyedElement(event.target);
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
            ? this.props.selectNodes(target.dataset.clickKey, event.shiftKey)
            : this.props.deselectNodes(target.dataset.clickKey);
        else if (target.dataset.category === 'connector')
          target.dataset.selected === 'false'
            ? this.props.selectConnectors(
                parseInt(target.dataset.clickKey, 10),
                event.shiftKey
              )
            : this.props.deselectConnectors(parseInt(target.dataset.clickKey, 10));
        else if (target.dataset.category === 'request')
          console.log('play');
      }
    } else if (
      event.target.className === 'diagram' &&
      Object.keys(this.props.selection.nodes).length +
        Object.keys(this.props.selection.connectors).length >
        0
    ) {
      this.props.deselectNodes();
    } else if (event.target.tagName === 'DIV') {
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
    /* TODO:@andy to clean */
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

  render() {
    const {
        nodes,
        connectors,
        selection,
        connectDropTarget,
      } = this.props,
      regions = helpers.getRegionsFromNodes(nodes),
      tags = helpers.getTagsFromNodes(nodes),
      selected = this.composeSelectionObject(
        selection.nodes.length === 1
          ? 'node'
          : selection.connectors.length === 1 ? 'connector' : null
      );

      const mappedNodes = {}
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
      ))

      const diagramDiv = <div className="diagram">
      {Object.keys(regions).map(region => (
        <Region
          key={region}
          id={region}
          regionName={region}
          bounds={helpers.getBoundingRectangle(region, nodes)}
          onDrop={(item, offset) =>
            this.diagramDrop('region', region, item, offset)
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
    </div>
  
    let blankNodeElement;
    if (Object.keys(mappedNodes).length === 0) blankNodeElement = <FirstUsageTutorial />;

    return connectDropTarget(
      <div
        className="main"
        tabIndex="0"
        onKeyDown={this.keyDown}
        onCopy={this.copy}
        onPaste={this.paste}
        onMouseDown={this.mouseDown}
        onClick={this.click}
      >
        {blankNodeElement}

        <DiagramMetadata
          {...this.props.metadata}
          editAction={this.props.editDiagramMetadata}
        />

        {/*<ModeSelector mode={this.props.mode} modes={ ['Build', 'Test'] } />*/}

        {diagramDiv}

        <NodeEditor {...selected} />

        <div className="bui-GridContainer shareButton">
          <div className="bui-Col-3">
            <a href="#" className="bui-Button" onClick={this.share}>
              Share
            </a>
          </div>
          <div className="bui-Col-9">
            <input className="shareText" type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default dndHelper.composeDrop(Diagram);
