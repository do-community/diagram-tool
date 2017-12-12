import { DropTarget, DragSource } from 'react-dnd';
import DATA from './data';
import helpers from './helpers.js';
import flow from 'lodash/flow';

const dndHelper = {

  dnd_connect: function (c, m) {
    return {
      connectDragSource: c.dragSource(),
      isDragging: m.isDragging()
    }
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
      DragSource(type, { beginDrag:((p, m, c) => {return {type:type, action:action, key:p.id||p.parent}}) }, _dnd_connect),
      DropTarget(['node', 'connector'], { drop(p,m) { m.didDrop() ? null : p.onDrop(m.getItem(), m.getClientOffset())},}, _dnd_collect)
    )(component);
  },

  composeDrag: function(type, action, component) {
    let _dnd_connect = this.dnd_connect;
    return DragSource(type, { beginDrag:((p, m, c) => {return {type:type, action:action, key:p.id||p.parent}}) }, _dnd_connect)(component);
  },

  /** TODO: @andy simplify this callback hell - right now onDrop is only defined for children of <Diagram>
            - So if onDrop is undefined we call parent function **/
  composeDrop: function(component) {
    let _dnd_collect = this.dnd_collect,
        _dnd_handleDrop = this.handleDrop;
    return DropTarget(
      ['node', 'connector'],
      {
        drop(p,m, c) {
          m.didDrop()
          ?
          null
          :
            typeof(p.onDrop) !== 'function'
            ?
            _dnd_handleDrop(p, 'diagram', null, m.getItem(), m.getClientOffset())
            :
            p.onDrop(m.getItem(), m.getClientOffset());
        }
      },
      _dnd_collect
    )(component);
  },

  handleDrop (props, target_category, target, item, offset) {


    console.log("handledrop", props, target_category, target, item, offset);

    if (target_category === 'tray') {
      /* Dragging to Tray = Deleting*/
      props['delete' + helpers.capitalize(item.type)](item.key);
      return {action:'deleted', success:true};
    }

    // Add or Move Item
    let update = {
      position: helpers.mouseToGrid(offset)
    }

    if (item.type === 'node') {
      if (item.action === 'move') {
        props.moveNode(
          item.key,
          ...update.position
        )
      } else if (item.action === 'add') {

        update.connections = [];
        update.metadata_overrides = DATA.NODES[item.key].metadata || {};

        //IF DROPPED ONTO CONNECTOR - DELETE THE CONNECTOR AND CREATE TWO NEW CONNECTIONS
        if(target_category === "connector") {
          update.metadata_overrides.region = props.nodes[props.connectors[target].between[0]].metadata.region;
          update.connections.push(...props.connectors[target].between.map((t) => { return {type:props.connectors[target].type, to:t}}));
          props.deleteConnector(target);

        } else {

          if(!'behavior' in DATA.NODES[item.key] ||  !DATA.NODES[item.key].behavior.regionless) {
            //IF DROPPED INTO REGION, OR IF ONLY ONE REGION EXISTS: OVERRIDE METADATA WITH THAT REGION
            const regions = helpers.regionsFromNodes(props.nodes);
            if(target_category === 'region') {
              update.metadata_overrides.region = target;
            } else if(Object.keys(regions).length === 1) {
              update.metadata_overrides.region = Object.keys(regions)[0];
            }
          }

          //TRY AND CONNECT TO OTHER NODES BASED ON WANTS
          if('behavior' in DATA.NODES[item.key] && 'wants' in DATA.NODES[item.key].behavior) {
            DATA.NODES[item.key].behavior.wants.map( (seek) => {
              if ('node_types' in seek) {
                let potential_connection = helpers.findClosestNode(props.nodes, update.position, seek.node_types);
                if(potential_connection.length) {
                  update.connections.push({type:seek.via.type, to:potential_connection});
                }
              }
            });
          }

        }

      props['addNode' + (update.connections.length ? 'WithConnections' : '')](
        helpers.guid(),
        item.key,
        ...update.position,
        update.metadata_overrides,
        update.connections.map((c) => ({...c, metadata:DATA.CONNECTORS[c.type].metadata}))
      );
    }
  } else if (item.type === 'connector' && target in props.nodes && item.key != target) {
    //Check if these two nodes can connect
    const ideal_connection = helpers.getIdealConnection({from:target, to:item.key}, props.nodes, props.connectors, DATA);
    if(!ideal_connection.error) {
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
