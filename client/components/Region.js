import React from 'react';
import dndHelper from '../dndHelper.js';

class Region extends React.Component {
  render(){
    const {index, bounds, connectDropTarget } = this.props;
    return connectDropTarget(
      <div key={index} data-category="region" data-type={index} style={bounds}>
        {bounds.width !== '100px' ? <label>Network: {index}</label> : ''}
      </div>
    )
  }
};

export default dndHelper.composeDrop(Region);
