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

// Drag and drop helper

import { DropTarget, DragSource } from 'react-dnd';
import DATA from './data';
import * as helpers from './helpers.js';
import flow from 'lodash/flow';
import { saveStore } from './store';
import { refreshDiagram, mappedPositions, getLeftOffset, getTopOffset } from './components/Diagram';
import { clear } from './showWhereClick';

const getCategory = (props, x, y) => {
	// Get the categories.
	const categories = helpers.getCategoriesFromNodes(props.nodes);

	// Get the current on top category.
	let top;

	// Go through each category.
	for (const key in categories) {
		// Get the bounds of this category.
		let bounds = helpers.getBoundingRectangle(key, props.nodes);

		// Set the bounds to the way we need it.
		bounds = {
			left: bounds[0][0],
			top: bounds[1][0],
			width: bounds[2][0],
			height: bounds[3][0],
		};

		// Check the distance.
		if (
			(x > bounds.left && bounds.left + bounds.width >= x) &&
			(y > bounds.top && bounds.top + bounds.height >= y)
		) {
			top = key;
		}
	}

	// Return the top category if it's set.
	return top;
};

export function dndConnect(c, m) {
	return {
		connectDragSource: c.dragSource(),
		isDragging: m.isDragging()
	};
}

function dndCollect(c, m) {
	return {
		connectDropTarget: c.dropTarget(),
		isOver: m.isOver(),
		isOverCurrent: m.isOver(),
		canDrop: m.canDrop(),
		itemType: m.getItemType(),
	};
}

export function composeDragAndDrop(type, action, component) {
	return flow(
		DragSource(
			type,
			{
				beginDrag: p => {
					if (p.beginDrag) p.beginDrag(document.querySelector('*[data-click_key="' + p.id + '"]').getBoundingClientRect());
					return { type: type, action: action, key: p.id || p.parent };
				}
			},
			dndConnect
		),
		DropTarget(
			['node', 'connector'],
			{
				drop(p, m) {
					m.didDrop() ? null : p.onDrop(m.getItem(), m.getClientOffset());
				}
			},
			dndCollect
		)
	)(component);
}

export function composeDrag(type, action, component) {
	return DragSource(
		type,
		{
			beginDrag(p) {
				return { type: type, action: action, key: p.id || p.parent };
			},
		},
		dndConnect
	)(component);
}

/* TODO: simplify this callback - right now onDrop is only defined for children of <Diagram>
	- So if onDrop is undefined we call parent function */
export function composeDrop(component) {
	return DropTarget(
		['node', 'connector'],
		{
			drop(p, m) {
				m.didDrop()
					? null
					: typeof p.onDrop !== 'function'
						? handleDrop(
								p,
								'diagram',
								null,
								m.getItem(),
								m.getClientOffset()
							)
						: p.onDrop(m.getItem(), m.getClientOffset());
			}
		},
		dndCollect
	)(component);
}

export function handleDrop(props, targetCategory, target, item, offset) {
	clear();

	if (targetCategory === 'tray') {
		/* Dragging to Tray = Deleting*/
		return {};
	}

	// Add or Move Item
	if (item.type === 'node') {
		if (item.action === 'move') {
			// Get the position and potedntially hit node.
			const pos = helpers.getClosestOpenPositionAndHitNode(
				[offset.x, offset.y],
				props.nodes,
			);
			let node = pos.pop();
			if (node && node.position[0] === props.nodes[item.key].position[0] && node.position[1] === props.nodes[item.key].position[1]) node = undefined;

			// Add the offset for the diagram.
			pos[0] += getLeftOffset();
			pos[1] += getTopOffset();

			// Get the mapped position of the cursor. Subtract this.
			const cursorPos = mappedPositions[item.key];
			pos[0] -= cursorPos.x - 14;
			pos[1] -= cursorPos.y - 48;

			// Get the diff.
			const diff = [
				pos[0] - props.nodes[item.key].position[0],
				pos[1] - props.nodes[item.key].position[1],
			];

			// Move the current node.
			props.moveNode(
				item.key,
				...pos,
			);

			// Check if on top of a node.
			if (node) {
				// Check the category length.
				if (!node.metadata.categories) node.metadata.categories = [];
				if (node.metadata.categories.length === 0) {
					// Create a category for the 2 nodes.
					const c = Math.random().toString();
					node.metadata.categories.push(c);
					props.nodes[item.key].metadata.categories.push(c);
				} else {
					// Defines the categories of the node we were dropped on.
					let categories = node.metadata.categories.slice() || [];

					// Iterate through the categories.
					for (const i in categories) {
						const c = categories[i];
						if ((props.nodes[item.key].metadata.categories || []).includes(c)) categories[i] = undefined;
					}
					const x = [];
					for (const item of categories) if (item) x.push(item);
					categories = x;

					// Set the categories of the other nodes.
					if (!props.nodes[item.key].metadata.categories) props.nodes[item.key].metadata.categories = [];
					for (const c of categories) props.nodes[item.key].metadata.categories.push(c);
				}
			} else {
				// Ok, lets check if this is on top of an category.

				// Try and get the category this was placed in.
				const category = getCategory(props, pos[0], pos[1]);
				if (!props.nodes[item.key].metadata.categories) props.nodes[item.key].metadata.categories = [];
				if (category) {
					// Add the category.
					if (!props.nodes[item.key].metadata.categories.includes(category)) props.nodes[item.key].metadata.categories.push(category);
				}
			}

			// Save the store.
			saveStore();

			// Force the diagram to refresh.
			refreshDiagram();

			// Handle any selected nodes.
			if (props.selection.nodes.includes(item.key)) for (const nodeKey of props.selection.nodes.filter(x => x !== item.key)) props.moveNode(nodeKey, ...diff, true);

			// Select the node.
			props.selectNodes([item.key]);
		} else if (item.action === 'add') {
			//IF DROPPED ONTO CONNECTOR - DELETE THE CONNECTOR AND CREATE TWO NEW CONNECTIONS
			if (targetCategory === 'connector') {
				props.deleteConnector(target);
			}
			//Add Node with Connections
			helpers.addNodeAndConnections(
				item.key,
				[offset.x, offset.y],
				DATA.nodes[item.key].metadata,
				props
			);
		}
	} else if (
		item.type === 'connector' &&
		target in props.nodes &&
		item.key != target
	) {
		//Check if these two nodes can connect
		const idealConnection = helpers.connectNodes(
			target,
			item.key,
			props.nodes
		);
		if (!idealConnection.error) {
			props.addConnector(
				item.key,
				target,
				idealConnection.type,
				idealConnection.metadata || {}
			);
		} else {
			console.error(idealConnection.error);
		}
	}
	return { moved: true };
}
