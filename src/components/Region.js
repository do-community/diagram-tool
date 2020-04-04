import React from 'react';
import dndHelper from '../dndHelper.js';
import helpers from '../helpers.js';

class Region extends React.Component {
  render(){
    let {region_name, bounds, connectDropTarget } = this.props;

    return connectDropTarget(
      <div key={region_name} data-category="region" data-type={region_name} style={bounds}>
        {bounds.width !== '100px' ? <label>{(bounds.width !== '200px' ? 'Region: ' : '') + region_name}</label> : ''}
      </div>
    )
  }
};

export default dndHelper.composeDrop(Region);
