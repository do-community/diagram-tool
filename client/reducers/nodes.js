function nodes(state = [], action) {
  switch(action.type) {
    case 'INITIALIZE' :
      return action.data.nodes && typeof(action.data.nodes) === 'object' ? action.data.nodes : {};
    case 'MOVE_NODE':
      return Object.keys(state).reduce((new_obj, key) => {
        if (key === action.key) {
          new_obj[key] = {
            ...state[key],
            position: [
              action.relative ? state[key].position[0] + action.x : action.x,
              action.relative ? state[key].position[1] + action.y : action.y
            ]
          };
        } else {
          new_obj[key] = {...state[key]};
        }
        return new_obj;
      }, {});

    case 'ADD_NODE':
      return {
        ...state,
        [action.key]: {
          type: action.node_type,
          metadata:action.metadata,
          position: [action.x, action.y]
        }
      };

    case 'DELETE_NODE':
      return Object.keys(state).reduce((new_obj, key) => {
        if (key != action.key) new_obj[key] = {...state[key]}
        return new_obj;
      }, {});

    case 'EDIT_NODE':
      return Object.keys(state).reduce((new_obj, key) => {
        if (key === action.key) new_obj[key] = {...state[key], metadata:{...state[key].metadata, ...action.metadata}}
        else new_obj[key] = {...state[key]}
        return new_obj;
      }, {});
    default:
      return state;
  }
}

export default nodes;
