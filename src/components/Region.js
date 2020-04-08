import React from 'react';
import dndHelper from '../dndHelper.js';

class Region extends React.Component {
  render(){
    let {regionName, bounds, connectDropTarget } = this.props;

    return connectDropTarget(
      <div key={regionName} data-category="region" data-type={regionName} style={bounds}>
        {bounds.width !== '100px' ? <label>{(bounds.width !== '200px' ? 'Region: ' : '') + regionName}</label> : ''}
      </div>
    )
  }
};

export default dndHelper.composeDrop(Region);
