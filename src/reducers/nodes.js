function nodes(state = [], action) {
  switch(action.type) {
    case 'INITIALIZE' :
      return action.data.nodes && typeof(action.data.nodes) === 'object' ? action.data.nodes : {};
    case 'MOVE_NODE':
      return Object.keys(state).reduce((newObj, key) => {
        if (key === action.key) {
          newObj[key] = {
            ...state[key],
            position: [
              action.relative ? state[key].position[0] + action.x : action.x,
              action.relative ? state[key].position[1] + action.y : action.y
            ]
          };
        } else {
          newObj[key] = {...state[key]};
        }
        return newObj;
      }, {});

    case 'ADD_NODE':
      return {
        ...state,
        [action.key]: {
          type: action.nodeType,
          metadata:action.metadata,
          position: [action.x, action.y]
        }
      };

    case 'DELETE_NODE':
      return Object.keys(state).reduce((newObj, key) => {
        if (key != action.key) newObj[key] = {...state[key]}
        return newObj;
      }, {});

    case 'EDIT_NODE':
      return Object.keys(state).reduce((newObj, key) => {
        if (key === action.key) newObj[key] = {...state[key], metadata:{...state[key].metadata, ...action.metadata}}
        else newObj[key] = {...state[key]}
        return newObj;
      }, {});
    default:
      return state;
  }
}

export default nodes;
