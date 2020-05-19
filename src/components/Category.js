import React from 'react';
import dndHelper from '../dndHelper.js';

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

class Category extends React.Component {
  render(){
    let {categoryName, bounds, connectDropTarget } = this.props;

    return connectDropTarget(
      <div key={categoryName} data-category="category" data-type={categoryName} style={bounds}>
        {bounds.width !== '100px' ? <p>{categoryName}</p> : ''}
      </div>
    )
  }
};

export default dndHelper.composeDrop(Category);
