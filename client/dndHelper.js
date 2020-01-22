import { DropTarget, DragSource } from "react-dnd";
import DATA from "./data";
import helpers from "./helpers.js";
import flow from "lodash/flow";

const dndHelper = {
	dnd_connect: function(c, m) {
		return {
			connectDragSource: c.dragSource(),
			isDragging: m.isDragging()
		};
	},

	dnd_collect: function(c, m) {
		return {
			connectDropTarget: c.dropTarget(),
			isOver: m.isOver(),
			isOverCurrent: m.isOver(),
			canDrop: m.canDrop(),
			itemType: m.getItemType()
		};
	},

	composeDragAndDrop: function(type, action, component) {
		let _dnd_collect = this.dnd_collect,
			_dnd_connect = this.dnd_connect;
		return flow(
			DragSource(
				type,
				{
					beginDrag: (p, m, c) => {
						return { type: type, action: action, key: p.id || p.parent };
					}
				},
				_dnd_connect
			),
			DropTarget(
				["node", "connector"],
				{
					drop(p, m) {
						m.didDrop() ? null : p.onDrop(m.getItem(), m.getClientOffset());
					}
				},
				_dnd_collect
			)
		)(component);
	},

	composeDrag: function(type, action, component) {
		let _dnd_connect = this.dnd_connect;
		return DragSource(
			type,
			{
				beginDrag: (p, m, c) => {
					return { type: type, action: action, key: p.id || p.parent };
				}
			},
			_dnd_connect
		)(component);
	},

	/** TODO: @andy simplify this callback hell - right now onDrop is only defined for children of <Diagram>
	 - So if onDrop is undefined we call parent function **/
	composeDrop: function(component) {
		let _dnd_collect = this.dnd_collect,
			_dnd_handleDrop = this.handleDrop;
		return DropTarget(
			["node", "connector"],
			{
				drop(p, m, c) {
					m.didDrop()
						? null
						: typeof p.onDrop !== "function"
							? _dnd_handleDrop(
									p,
									"diagram",
									null,
									m.getItem(),
									m.getClientOffset()
								)
							: p.onDrop(m.getItem(), m.getClientOffset());
				}
			},
			_dnd_collect
		)(component);
	},

	handleDrop(props, target_category, target, item, offset) {
		if (target_category === "tray") {
			/* Dragging to Tray = Deleting*/
			props["delete" + helpers.capitalize(item.type)](item.key);
			return { action: "deleted", success: true };
		}
		console.log(item)

		// Add or Move Item
		let update = {};
		if (item.type === "node") {
			if (item.action === "move") {
				props.moveNode(
					item.key,
					...helpers.getClosestOpenPosition(
						helpers.mouseToGrid(offset),
						props.nodes
					)
				);
			} else if (item.action === "add") {
				//IF DROPPED ONTO CONNECTOR - DELETE THE CONNECTOR AND CREATE TWO NEW CONNECTIONS
				if (target_category === "connector") {
					props.deleteConnector(target);
				}
				//Add Node with Connections
				helpers.addNodeAndConnections(
					item.key,
					helpers.mouseToGrid(offset),
					DATA.NODES[item.key].metadata,
					props
				);
			}
		} else if (
			item.type === "connector" &&
			target in props.nodes &&
			item.key != target
		) {
			//Check if these two nodes can connect
			const ideal_connection = helpers.connectNodes(
				target,
				item.key,
				props.nodes,
				props.connectors
			);
			if (!ideal_connection.error) {
				props.addConnector(
					item.key,
					target,
					ideal_connection.type,
					ideal_connection.metadata || {}
				);
			} else {
				console.error(ideal_connection.error);
			}
		}
		return { moved: true };
	}
};
export default dndHelper;