import React from 'react';
import dndHelper from '../dndHelper.js';
import helpers from '../helpers.js';

class Region extends React.Component {
  constructor(props){
    super(props);
		this.state = {yOffset: window.pageYOffset};
		window.addEventListener('scroll', () => {
			this.setState({yOffset: window.pageYOffset});
		});
  }

  render(){
    let {region_name, bounds, connectDropTarget } = this.props;
    const boundsCpy = Object.assign({}, bounds);
    boundsCpy.top = Number(boundsCpy.top.substr(0, boundsCpy.top.length - 2)) - this.state.yOffset

    return connectDropTarget(
      <div key={region_name} data-category="region" data-type={region_name} style={boundsCpy}>
        {bounds.width !== '100px' ? <label>{(bounds.width !== '200px' ? 'Region: ' : '') + region_name}</label> : ''}
      </div>
    )
  }
};

export default dndHelper.composeDrop(Region);
