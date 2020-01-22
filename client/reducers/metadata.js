
function metadata(state = [], action) {
  switch(action.type) {
    case 'INITIALIZE' :
      return action.data.metadata && typeof(action.data.metadata) === 'object' ? action.data.metadata : {};
    case 'EDIT_DIAGRAM_METADATA' :
      //return updated state
      return { ...state, ...action.metadata };
    default:
      return state;
  }
}

export default metadata;
