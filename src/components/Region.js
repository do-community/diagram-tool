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

    if(helpers.sketchMode()) {
      window.setTimeout(function() {
      const canv = document.getElementById('canvas_region_' + region_name),
          canv_ctx = canv.getContext('2d'),
          rc = rough.canvas(canv);
        canv_ctx.clearRect(0, 0, canv.width, canv.height);
        rc.rectangle(5, 5, canv.width-10, canv.height-10, {stroke:'#CCC', roughness:2, fill:'#fcfcfc', fillStyle:'solid', bowing:3});
      }, 10);
      bounds = {top:(parseInt(bounds.top)-10) + 'px', left:(parseInt(bounds.left)-10) + 'px', width:(parseInt(bounds.width)+20) + 'px', height:(parseInt(bounds.height)+20) + 'px'};
    }

    return connectDropTarget(
      helpers.sketchMode()
      ?
        <canvas id={'canvas_region_' + region_name} data-category="region" width={bounds.width} height={bounds.height} style={bounds}></canvas>
      :
        <div key={region_name} data-category="region" data-type={region_name} style={boundsCpy}>
        	{bounds.width !== '100px' ? <label>{(bounds.width !== '200px' ? 'Region: ' : '') + region_name}</label> : ''}
        </div>
    )
  }
};

export default dndHelper.composeDrop(Region);
