
function nodes(state = [], action) {
  switch(action.type) {
    case 'MOVE_NODE':
      console.log(action);
      //return updated state
      return [
        ...state.slice(0,action.i), //before the one we are updating
        {...state[action.i], position:[action.x, action.y]},
        ...state.slice(action.i + 1) //after the one we are updating
      ];
    case 'ADD_NODE':
      console.log(action);
      //return updated state
      return [
        ...state,
        {
          type: action.node_type,
          customization:{},
          position: [action.x, action.y]
        }
      ];
    case 'DELETE_NODE':
      //return updated state
      return [
        ...state.slice(0,action.i),  //before the one we are updating
        ...state.slice(action.i + 1) //after the one we are updating
      ];
    default:
      return state;
  }
}

export default nodes;
