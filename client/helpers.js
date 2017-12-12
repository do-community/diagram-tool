const helpers = {

  capitalize: function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  regionsFromNodes: function(nodes_obj) {

    return Object.keys(nodes_obj).reduce((regions_obj, node_key) => {
      if(nodes_obj[node_key].metadata && nodes_obj[node_key].metadata.region) {
        if(!regions_obj[nodes_obj[node_key].metadata.region]) regions_obj[nodes_obj[node_key].metadata.region] = [];
        regions_obj[nodes_obj[node_key].metadata.region].push(node_key);
      }
      return regions_obj;
    }, {});

  },

  getBoundingRect: function(region, nodes) {

    let bounds = [999,999,-999,-999];

    Object.keys(nodes).forEach((key) => {
      if(nodes[key].metadata && nodes[key].metadata.region && nodes[key].metadata.region === region) {
        if(nodes[key].position[0] < bounds[0]) { bounds[0] = nodes[key].position[0] + (nodes[key].metadata.edge ? 0.5 : 0); } //left
        if(nodes[key].position[1] < bounds[1]) { bounds[1] = nodes[key].position[1] + (nodes[key].metadata.edge ? 0.5 : 0); } //top
        if(nodes[key].position[0] > bounds[2]) { bounds[2] = nodes[key].position[0] - (nodes[key].metadata.edge ? 0.5 : 0); } //right
        if(nodes[key].position[1] > bounds[3]) { bounds[3] = nodes[key].position[1] - (nodes[key].metadata.edge ? 0.5 : 0); } //bottom
      }
    });

    return {
      left:  (bounds[0]*100) + 'px',
      top:   (bounds[1]*100) + 'px',
      width: ((bounds[2]-bounds[0]+1)*100) + 'px',
      height:((bounds[3]-bounds[1]+1)*100) + 'px'
    };

  },
  preventDefault: function (event) {
    event.preventDefault();
  },
  getKeyedElement: function (target) {
    while(!target.dataset.key && target.id !== 'root'){
      target = target.parentNode;
    }
    return target.id === 'root' ? null : target;
  },
  round2: function(num) {
    return Math.round(num*100.0)/100.0;
  },
  lineToSVGString: function(points, dir, simplex) {
    let st_1 = "", st_2 = "", a, b, offset, i, max=points.length;
    if (simplex) {
      if (max==2) { return "M" + points[0][0] + "," + points[0][1] + "L" + points[1][0] + "," + points[1][1]; }
      else {
        st_1 += "M" + points[0][0] + "," + points[0][1]
        for(i=1; i<max-1; i+=3) {
          st_1 += "C" + points[i][0] + "," + points[i][1] + "," + points[i+1][0] + "," + points[i+1][1] + "," + points[i+2][0] + "," + points[i+2][1];
        }
        return st_1;
      }
    } else {
      for(i=0; i<max; i++) {
        a = (i === 0 ? points[i] : points[i-1]);
        b = (i === max-1 ? points[i] : points[i+1]);
        offset = 3 * Math.sin(Math.atan((b[1] - a[1]) / (b[0] - a[0])));
        if(dir === 'h') {
          st_1 += "L " + this.round2(points[i][0] - (0.5 * offset)) + " " + (points[i][1]+1.5) + " ";
          st_2 = "L " + this.round2(points[i][0] + (0.5 * offset)) + " " +  (points[i][1]-1.5) + " " + st_2;
        } else {
          st_1 += "L " + (points[i][0]+1.5) + " " + this.round2(points[i][1] - (0.5 * offset)) + " ";
          st_2 = "L " + (points[i][0]-1.5) + " " +  this.round2(points[i][1] + (0.5 * offset)) + " " + st_2;
        }
      }
      return "M" + st_1.substr(1) + st_2;
    }
  },
  mouseToGrid: function(pos) {
    const _dpos = document.querySelector('.diagram').getBoundingClientRect();
    return [
      Math.ceil((pos.x - _dpos.left + 100 - (_dpos.width/2))/50.0)/2.0,
      Math.floor((pos.y - _dpos.top + 65 - (_dpos.height/2))/50.0)/2.0
    ];
  },
  findClosestNode: function(nodes, position, type_arr) {
    let min_dist = 9999999, closest = "", dist;
    type_arr.forEach((type) => {
      Object.keys(nodes).forEach((key) => {
        if(!type || nodes[key].type === type) {
          dist = Math.sqrt(Math.pow(nodes[key].position[0] - position[0], 2) + Math.pow(nodes[key].position[1] - position[1], 2));
          if(dist < min_dist) {
            min_dist = dist;
            closest = key;
          }
        }
      });
      if (closest.length) return closest;
    });
    return closest;
  },
  spaceIsOpen(nodes, x, y) {
    open = true;
    Object.keys(nodes).forEach((key) => {
      if(Math.abs(nodes[key].position[0]-x) < 1 && Math.abs(nodes[key].position[1]-y) < 1) open = false;
    });
    return open;
  },
  findSpace: function(nodes, position) {
    //FOLLOW A GRID SPIRAL PATTERN AWAY FROM position
    // Starting 1 unit below
    let stride = 4,
        step = 0,
        cx = position[0],
        cy = position[1] + 1,
        open = true;
      if(this.spaceIsOpen(nodes, cx, cy)) return [cx,cy];
      cx++;
    while(true) { //YOLO
      if(this.spaceIsOpen(nodes, cx, cy)) return [cx,cy];
      //NOT OPEN! - BRAINBENDING SPIRAL PATHER
      cx += (stride%2==0 ? -1 : 1) * (step>=stride ? 0.5 : 0);
      cy += (stride%2==0 ? -1 : 1) * (step<stride ? 0.5 : 0);
      step++;
      if(step == stride * 2) { stride++; step = 0; }
    }
  },
  getNodesWithinBox: function(nodes, coords) {
    const box = [
      this.mouseToGrid({x:coords[0], y:coords[1]}),
      this.mouseToGrid({x:coords[2], y:coords[3]})
    ];
    let selected_nodes = [];
    Object.keys(nodes).forEach((key) => {
      if(nodes[key].position[0] >= box[0][0] && nodes[key].position[0] <= box[1][0] && nodes[key].position[1] >= box[0][1] && nodes[key].position[1] <= box[1][1]) {
        selected_nodes.push(key);
      }
    });
    return selected_nodes;
  },
  drag: function(start, selectCB, nodes) {
    let drag_obj = {
      box: document.querySelector('#dragBox'),
      getNodesWithinBox: this.getNodesWithinBox,
      mouseToGrid: this.mouseToGrid,
      selectCB: selectCB, nodes:nodes,
      _sx: start[0], _sy: start[1], _cx: start[0], _cy: start[1],
      dragUpdate: function(e) {
        this._cx = e.clientX;
        this._cy = e.clientY;
        //Mouse above startpoint?
        if(this._cx > this._sx) {
          this.box.style.left = this._sx + 'px';
          this.box.style.width = (this._cx - this._sx) + 'px';
        } else {
          this.box.style.left = this._cx + 'px';
          this.box.style.width =  (this._sx - this._cx) + 'px';
        }
        if(this._cy > this._sy) {
          this.box.style.top = this._sy + 'px';
          this.box.style.height = (this._cy - this._sy) + 'px';
        } else {
          this.box.style.top = this._cy + 'px';
          this.box.style.height =  (this._sy - this._cy) + 'px';
        }
      },
      captureClick: function(e) {
          e.stopPropagation();
          document.body.removeEventListener('click', this.captureClickRef, true);
      },
      dragStop: function(e) {
          if(Math.abs(this._cx - this._sx) + Math.abs(this._cy - this._sy) > 10) document.body.addEventListener('click', this.captureClickRef, true);
          window.clearTimeout(this.dragDebounce);
          document.removeEventListener('mousemove', this.dragUpdateRef);
          document.removeEventListener('mouseup', this.dragStopRef);
          this.box.style.display = 'none';
          return this.selectCB(
            this.getNodesWithinBox(
              this.nodes,
              [this._sx < this._cx ? this._sx : this._cx, this._sy < this._cy ? this._sy : this._cy,
              this._sx > this._cx ? this._sx : this._cx, this._sy > this._cy ? this._sy : this._cy]
            ),
            e.shiftKey
          );
      }
    };
    drag_obj.dragUpdateRef = drag_obj.dragUpdate.bind(drag_obj);
    drag_obj.captureClickRef = drag_obj.captureClick.bind(drag_obj);
    drag_obj.dragStopRef =  drag_obj.dragStop.bind(drag_obj);
    drag_obj.dragDebounce = window.setTimeout(function(){
      this._sx = start[0];
      this._sy = start[1];
      this.box.style.display = 'block';
      document.addEventListener('mousemove', this.dragUpdateRef);
    }.bind(drag_obj), 250);
    document.addEventListener('mouseup', drag_obj.dragStopRef);
  },
  getIdealConnection: function(f_t, nodes, connections, compatibility_info) {
    //1. CAN BOTH NODES HANDLE MORE CONNECTIONS?
    //GET COUNTS OF EXISTING CONNECTIONS ON FROM AND TO NODES
    const existing_connections = connections.reduce((acc, c) => {
      if(c.between.indexOf(f_t.from)>-1) acc.from++;
      if(c.between.indexOf(f_t.to)>-1) acc.to++;
      return acc;
    }, {from:0, to:0});

    let ideals ={}, j;

    Object.keys(f_t).map((side, i) => {
      //CHECK IF AT THE LIMIT
      if(compatibility_info.NODES[nodes[f_t[side]].type].behavior.max_connections && compatibility_info.NODES[nodes[f_t[side]].type].behavior.max_connections === existing_connections[side]) {
        console.error("Too many connections on " + (nodes[f_t[side]].metadata.name || nodes[f_t[side]].type));
        return {error:"Too many connections on " + (nodes[f_t[side]].metadata.name || nodes[f_t[side]].type)};
      }
      //2. CHECK DISALLOWED CONNECTIONS
      if(compatibility_info.NODES[nodes[f_t[side]].type].behavior.incompatible_with && compatibility_info.NODES[nodes[f_t[side]].type].behavior.incompatible_with.indexOf(nodes[f_t[Object.keys(f_t)[(i+1)%2]]].type) > -1) {
        console.error(f_t[side].type + " says it cannot connect to " + nodes[f_t[Object.keys(f_t)[(i+1)%2]]].type);
        return { error:f_t[side].type + " says it cannot connect to " + nodes[f_t[Object.keys(f_t)[(i+1)%2]]].type};
      }
      //3. CONNECTION IS POSSIBLE, GET CONSENSUS ON IDEAL CONNECTION TYPE
      if(compatibility_info.NODES[nodes[f_t[side]].type].behavior.wants) {
        for(j=0; j<compatibility_info.NODES[nodes[f_t[side]].type].behavior.wants.length; j++) {
          if(compatibility_info.NODES[nodes[f_t[side]].type].behavior.wants[j].node_types.indexOf(nodes[f_t[Object.keys(f_t)[(i+1)%2]]].type) > -1) {
            ideals[side] = compatibility_info.NODES[nodes[f_t[side]].type].behavior.wants[j].via;
            ideals[side].metadata = Object.assign({}, compatibility_info.CONNECTORS[ideals[side].type].metadata, ideals[side].metadata);
            break;
          }
        }
      }
    });
    return Object.keys(ideals).length > 0 ? ideals[Object.keys(ideals)[0]] : {};
  },

  _s4:function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },
  guid: function() {
  return this._s4() + this._s4() + this._s4();
  }
}

export default helpers;
