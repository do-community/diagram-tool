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

import React from 'react';
import dndHelper from '../dndHelper.js';

class CategoryNameEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false, categoryName: this.props.categoryName};
  }

  handleChange(e) {
    this.props.categoryNames[this.props.categoryId] = e.target.value;
    this.setState({categoryName: e.target.value});
    this.props.saveCategoryNames();
  }

  render() {
    if (!this.state.edit) return this.state.categoryName ?
      <p onClick={() => this.setState({edit: true})}>{this.state.categoryName}</p>
      : <p><i onClick={() => this.setState({edit: true})}>Unnamed Category</i></p>;

    const c = this.handleChange.bind(this);
    return <span>
      <div className="diagramMetadata hoverParent do-bulma">
        <div>
          <input type="text" className="input" style={{textAlign: 'center', fontSize: '14px', padding: '5px'}} onChange={c} name="name" value={this.state.categoryName || ''} placeholder="Category name" />
          <br /><br />
          <a className="button is-info" style={{fontSize: '10px', height: '30px'}} onClick={() => this.setState({edit: false})}>
            Exit Edit Mode
          </a>
        </div>
      </div>
    </span>;
  }
}

class Category extends React.Component {
  render() {
    let { categoryNames, id, bounds, connectDropTarget, outlineColor } = this.props;

    if (categoryNames[id] === '') categoryNames[id] = undefined;

    const style = {};
    Object.assign(style, bounds);
    style.outlineColor = outlineColor;
    return connectDropTarget(
      <div key={id} data-category="category" data-type={id} style={style}>
        {
          bounds.width !== '100px' ?
          <CategoryNameEdit
            categoryName={categoryNames[id]}
            categoryNames={categoryNames}
            saveCategoryNames={this.props.saveCategoryNames}
            categoryId={id}
          /> : ''}
      </div>
    );
  }
};

export default dndHelper.composeDrop(Category);
