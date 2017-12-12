import React from 'react';
import dndHelper from '../dndHelper.js';
import TrayNode from './TrayNode';
import NODES from '../data/NODES';

class Tray extends React.Component {
	render(){
		return this.props.connectDropTarget(
			<nav className="bui-SideNav">
				<h3>Nodes</h3>
				<ul className="bui-SideNav-list">
					{ Object.keys(NODES).map( (node, i) => <TrayNode key={i} id={node} /> ) }
				</ul>
			</nav>
		);
	}
};

export default dndHelper.composeDrop(Tray);
