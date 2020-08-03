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
        if (key != action.key) newObj[key] = {...state[key]};
        return newObj;
      }, {});

    case 'EDIT_NODE':
      return Object.keys(state).reduce((newObj, key) => {
        if (key === action.key) newObj[key] = {...state[key], metadata:{...state[key].metadata, ...action.metadata}};
        else newObj[key] = {...state[key]};
        return newObj;
      }, {});
    default:
      return state;
  }
}

export default nodes;
