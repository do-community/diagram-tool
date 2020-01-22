import React from 'react';

// getPointAtLength and getTotalLength

/* This is a hybrid D3 + React Component that handles the particle system */
class ParticleCanvas extends React.Component {

  render(){

    const {
      nodes,
      connectors
    } = this.props;
    
    //const {index, bounds, connectDropTarget } = this.props;
    return <canvas id="ParticleCanvas"></canvas>
  }
};

export default ParticleCanvas;