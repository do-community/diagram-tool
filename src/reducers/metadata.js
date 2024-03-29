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

export default function metadata(state = [], action) {
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
