import React from 'react';
import dndHelper from '../dndHelper.js';

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
