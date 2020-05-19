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
import helpers from './helpers.js';
import flow from 'lodash/flow';

export default {
	dndConnect: function(c, m) {
		return {
			connectDragSource: c.dragSource(),
			isDragging: m.isDragging()
		};
	},

	dndCollect: function(c, m) {
		return {
			connectDropTarget: c.dropTarget(),
			isOver: m.isOver(),
			isOverCurrent: m.isOver(),
			canDrop: m.canDrop(),
			itemType: m.getItemType()
		};
	},

	composeDragAndDrop: function(type, action, component) {
		let _dndCollect = this.dndCollect,
			_dndConnect = this.dndConnect;
		return flow(
			DragSource(
				type,
				{
					beginDrag: p => {
						return { type: type, action: action, key: p.id || p.parent };
					}
				},
				_dndConnect
			),
			DropTarget(
				['node', 'connector'],
				{
					drop(p, m) {
						m.didDrop() ? null : p.onDrop(m.getItem(), m.getClientOffset());
					}
				},
				_dndCollect
			)
		)(component);
	},

	composeDrag: function(type, action, component) {
		let _dndConnect = this.dndConnect;
		return DragSource(
			type,
			{
				beginDrag: p => {
					return { type: type, action: action, key: p.id || p.parent };
				}
			},
			_dndConnect
		)(component);
	},

	/** TODO: @andy simplify this callback hell - right now onDrop is only defined for children of <Diagram>
	 - So if onDrop is undefined we call parent function **/
	composeDrop: function(component) {
		let _dndCollect = this.dndCollect,
			_dndHandleDrop = this.handleDrop;
		return DropTarget(
			['node', 'connector'],
			{
				drop(p, m) {
					m.didDrop()
						? null
						: typeof p.onDrop !== 'function'
							? _dndHandleDrop(
									p,
									'diagram',
									null,
									m.getItem(),
									m.getClientOffset()
								)
							: p.onDrop(m.getItem(), m.getClientOffset());
				}
			},
			_dndCollect
		)(component);
	},

	handleDrop(props, targetCategory, target, item, offset) {
		if (targetCategory === 'tray') {
			/* Dragging to Tray = Deleting*/
			props['delete' + helpers.capitalize(item.type)](item.key);
			return { action: 'deleted', success: true };
		}
		console.log(item)

		// Add or Move Item
		if (item.type === 'node') {
			if (item.action === 'move') {
				props.moveNode(
					item.key,
					...helpers.getClosestOpenPosition(
						helpers.mouseToGrid(offset),
						props.nodes
					)
				);
			} else if (item.action === 'add') {
				//IF DROPPED ONTO CONNECTOR - DELETE THE CONNECTOR AND CREATE TWO NEW CONNECTIONS
				if (targetCategory === 'connector') {
					props.deleteConnector(target);
				}
				//Add Node with Connections
				helpers.addNodeAndConnections(
					item.key,
					helpers.mouseToGrid(offset),
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
				props.nodes,
				props.connectors
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
};
