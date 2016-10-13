import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render(){
    return (
      <div>
        <header>
          <h1>diagram</h1>
          
        </header>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});

export default Main;
