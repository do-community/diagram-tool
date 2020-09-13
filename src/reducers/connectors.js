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

export default function connectors(state = [], action) {
  switch(action.type) {
    case 'INITIALIZE' :
      return action.data.connectors && action.data.connectors.length ? action.data.connectors : [];
    case 'ADD_CONNECTOR' :
      return [
        ...state,
        {
          type: action.connectorType,
          metadata:action.metadata,
          between: [action.start, action.end]
        }
      ];
    case 'EDIT_CONNECTOR' :
      return state.map((c,i) => {
        if(i === action.key) {
          return {...c, metadata:{...c.metadata, ...action.metadata}};
        }
        return c;
      });

    case 'EDIT_connectorType' :
      return state.map((c,i) => {
        if(i === action.key) {
          return {...c, type:action.connectorType};
        }
        return c;
      });

    case 'DELETE_CONNECTOR' :
      return state.filter(function(c, i) { console.log(i, action.key); return i !== action.key; });
    case 'DELETE_ATTACHED_CONNECTORS':
      return state.filter(function(c) { return c.between.indexOf(action.key) === -1; });
    default:
      return state;
  }
}
