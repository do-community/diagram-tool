import React from 'react';
import { Link } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import dndHelper from '../dndHelper.js';

class Main extends React.Component {
  render(){
    return React.cloneElement(this.props.children, this.props);
  }
};

export default DragDropContext(HTML5Backend)(Main);
