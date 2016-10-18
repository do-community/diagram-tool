//add comment
export function addNode(node_type, x, y) {
  return {
    type: 'ADD_NODE',
    node_type,
    x,
    y
  }
}

//move a node
export function moveNode(i, x, y) {
  return {
    type: 'MOVE_NODE',
    i,
    x,
    y
  }
}

//edit the customizable details of a node
export function editNode(i, customizations) {
  return {
    type: 'EDIT_NODE',
    i,
    customizations
  }
}

export function deleteNode(i) {
  return {
    type: 'DELETE_NODE',
    i
  }
}

export function addConnector(start, end, connector_type) {
  return {
    type: 'ADD_CONNECTOR',
    connector_type: connector_type,
    start,
    end
  }
}

export function moveConnector(i, start, end) {
  return {
    type: 'MOVE_CONNECTOR',
    i,
    start,
    end
  }
}

export function editConnector(i, customizations) {
  return {
    type: 'EDIT_CONNECTOR',
    i,
    customizations
  }
}

export function deleteConnector(i) {
  return {
    type: 'DELETE_CONNECTOR',
    i
  }
}
