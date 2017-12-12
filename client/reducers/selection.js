
function selection(state = [], action) {
  switch(action.type) {

    case 'SELECT':
      return {
      	connectors: Array.from(new Set([...state.connectors, ...(action.connectors || [])])),
      	nodes: Array.from(new Set([...state.nodes, ...(action.nodes || [])])),
        clipboard: {...state.clipboard}
      };

    case 'DESELECT':
      return {
      	connectors: state.connectors.filter((v) => action.connectors.indexOf(v) === -1),
      	nodes: state.nodes.filter((v) => action.nodes.indexOf(v) === -1),
        clipboard: {...state.clipboard}
      };
    case 'DESELECT_ALL':
      return {
      	connectors: [],
      	nodes: [],
        clipboard: {...state.clipboard}
      };
    case 'DELETE_NODE':
      return {
        connectors: [...state.connectors],
        nodes: state.nodes.filter((v) => action.key !== v),
        clipboard: {...state.clipboard}
      };
    case 'DELETE_CONNECTOR':
      return {
        connectors: state.connectors.filter((v) => action.key !== v),
        nodes: [...state.nodes],
        clipboard: {...state.clipboard}
      };
    case 'COPY':
      return {
        connectors: [...state.connectors],
        nodes: [...state.nodes],
        clipboard: {...state.clipboard, ...action.nodes}
      };

    default:
      return state;
  }
}

export default selection;
