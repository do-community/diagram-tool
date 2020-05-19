/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import DATA from '../data';
import { getPosition, clear, updatePosition } from '../showWhereClick';
import helpers from '../helpers';
import FileLikeBrowser from './FileLikeBrowser';

export default class Tray extends React.Component {
	constructor(props) {
		super(props);
		this.state = {category: null};
	}

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
			DATA.nodes[nodeId].metadata,
			this.props,
		);
	}

	componentDidUpdate() {
		updatePosition();
	}

	render() {
		if (this.state.category) {
			const buttons = Object.keys(DATA.nodesByCategory[this.state.category]).map(id => {
				const node = DATA.nodes[id];
				return {
					id, icon: node.icon, name: node.name,
				};
			});

			return <FileLikeBrowser
				backAction={() => this.setState({category: null})}
				title={this.state.category}
				buttons={buttons}
				onClick={nodeId => this.onNodeClick(nodeId)}
			/>;
		} else {
			const buttons = Object.keys(DATA.nodesByCategory).map(id => {
				return {
					id, icon: DATA.additionalIcons.folder, name: id,
				};
			});

			return <FileLikeBrowser
				title="Category Selection"
				buttons={buttons}
				onClick={category => this.setState({category})}
			/>;
		}
	}
};
