
function connectors(state = [], action) {
  switch(action.type) {
    case 'ADD_CONNECTOR' :
      return [
        ...state,
        {
          type: action.connector_type,
          customization:{},
          between: [action.start, action.end]
        }
      ];
    case 'MOVE_CONNECTOR' :
      return [
        ...state.slice(0,action.i), //before the one we are updating
        {...state[action.i], between:[action.start, action.end]},
        ...state.slice(action.i + 1) //after the one we are updating
      ];
    case 'DELETE_CONNECTOR' :
      return [
        ...state.slice(0,action.i), //before the one we are deleting
        ...state.slice(action.i + 1) //after the one we are deleting
      ];
    default:
      return state;
  }
}

export default connectors;
