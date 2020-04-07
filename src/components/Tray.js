import React from 'react';
import TrayNode from './TrayNode';
import DATA from '../data';
import { getPosition, clear } from '../showWhereClick';
import helpers from '../helpers';

export default class Tray extends React.Component {
	onNodeClick(nodeId) {
		// Clear the UI and get the position where the mouse was clicked.
		const position = getPosition();
		clear();

		// Run the drop action.
		helpers.addNodeAndConnections(
			nodeId,
			helpers.mouseToGrid({
				x: Number(position.left.slice(0, -2)),
				y: Number(position.top.slice(0, -2)),
			}),
			DATA.NODES[nodeId].metadata,
			this.props,
		);
	}

	render() {
		return <div className="tray selection-panel">
			<h3>Build</h3>
			<div className="scrollable">
				<ul>
					{ Object.keys(DATA.NODES_BY_CATEGORY).map(
						category => <li key={category}>
							<h4>{category}</h4>
							<ul>{ Object.keys(DATA.NODES_BY_CATEGORY[category]).map(
								(node, i) => { return (<TrayNode key={i} id={node} onClick={() => this.onNodeClick(node)} />) }
							)}</ul>
						</li>
					) }
				</ul>
			</div>
		</div>;
	}
};
