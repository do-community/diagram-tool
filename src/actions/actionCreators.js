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

import { getLeftOffset } from '../components/Diagram';

export function initialize(data) {
  return {
    type: 'INITIALIZE',
    data: data
  };
}

//addNode - takes a node type, x/y position, and metadata that will override the defaults for this node type
export function addNode(key, nodeType, x, y, metadata, connections = []) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_NODE',
      key,
      nodeType,
      x: x + getLeftOffset(),
      y,
      metadata
    });

    connections.map((c) => dispatch({
      type: 'ADD_CONNECTOR',
      connectorType: c.type,
      start: key,
      end: c.to,
      metadata: c.metadata
    }));

    dispatch({
        type: 'DESELECT_ALL'
    });

    dispatch({
      type: 'SELECT',
      nodes: [key]
    });

  };
}

//move node ID'd by key
export function moveNode(key, x, y, relative) {
  return {
    type: 'MOVE_NODE',
    key,
    x,
    y,
    relative
  };
}

//edit the customizable metadata of a node
export function editNode(key, metadata) {
  return {
    type: 'EDIT_NODE',
    key,
    metadata
  };
}

//mark a node as selected and deselect all other nodes
export function selectNodes(keys, additive=false) {
  return function (dispatch) {
    if(!additive)
      dispatch({
        type: 'DESELECT_ALL'
      });
    dispatch({
      type: 'SELECT',
      nodes: typeof(keys) === 'object' ? keys : [keys]
    });
  };
}

//deselect everything
export function deselectNodes(keys) {
  if(!keys) return {
    type: 'DESELECT_ALL'
  };
  else return {
    type: 'DESELECT',
    nodes: typeof(keys) === 'object' ? keys : [keys]
  };
}

//delete a node from the diagram
export function deleteNode(key) {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_ATTACHED_CONNECTORS',
      key
    });
    dispatch({
      type: 'DELETE_NODE',
      key
    });
  };
}


export function addConnector(start, end, connectorType, metadata) {
  return {
    type: 'ADD_CONNECTOR',
    connectorType,
    metadata,
    start,
    end
  };
}

export function moveConnector(key, start, end) {
  return {
    type: 'MOVE_CONNECTOR',
    key,
    start,
    end
  };
}

export function editConnector(key, metadata) {
  return {
    type: 'EDIT_CONNECTOR',
    key,
    metadata
  };
}

export function editConnectorType(key, connectorType) {
  return {
    type: 'EDIT_connectorType',
    key,
    connectorType
  };
}

export function deleteConnector(key) {
  return {
    type: 'DELETE_CONNECTOR',
    key
  };
}

export function selectConnectors(keys, additive=false) {
  return function (dispatch) {
    if(!additive)
      dispatch({
        type: 'DESELECT_ALL'
      });
    dispatch({
      type: 'SELECT',
      connectors: typeof(keys) === 'object' ? keys : [keys]
    });
  };
}

export function deselectConnectors(keys) {
  return function () {
    if(!keys) return {
        type: 'DESELECT_ALL'
    };
    else return {
      type: 'DESELECT',
      connectors: typeof(keys) === 'object' ? keys : [keys]
    };
  };
}

//edit the customizable metadata of a diagram
export function editDiagramMetadata(metadata) {
  return {
    type: 'EDIT_DIAGRAM_METADATA',
    metadata
  };
}