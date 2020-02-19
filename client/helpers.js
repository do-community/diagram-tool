import DATA from "./data";
import get from "lodash/get";

const helpers = {
  //capitalize the first letter of a string
  capitalize: function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  //round a number to two decimal points
  round2: function(num) {
    return Math.round(num * 100.0) / 100.0;
  },

  //Helper used for creating GUIDs (see below)
  _s4: function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },
  //Generates a random XXXX-XXXX-XXXX guid
  guid: function() {
    return this._s4() + this._s4() + this._s4();
  },
  //returns true if handmade set in url
  sketchMode: function() {
    return window.location.search.indexOf('sketchMode') > -1;
  },

  polarToCartesian: function(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  },

  describeArc: function(x, y, radius, startAngle, endAngle){
    const start = this.polarToCartesian(x, y, radius, endAngle),
          end = this.polarToCartesian(x, y, radius, startAngle),
          largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");  
  },

  squigglePath: function(followPath, squiggleStep = 25, squiggleAmplitude = 20, offset = -1) {
    
    let pathLen = followPath.getTotalLength();

    // Adjust step so that there are a whole number of steps along the path
    let numSteps = Math.round(pathLen / squiggleStep);

    let pos = followPath.getPointAtLength(0);
    let newPath = "M" + [pos.x, pos.y].join(',');
    let side = offset;
    for (let i=1; i<=numSteps; i++)
    {
      let last = pos;
      let pos = followPath.getPointAtLength(i * pathLen / numSteps);

      // Find a point halfway between last and pos. Then find the point that is
      // perpendicular to that line segment, and is squiggleAmplitude away from
      // it on the side of the line designated by 'side' (-1 or +1).
      // This point will be the control point of the quadratic curve forming the
      // squiggle step.
      
      // The vector from the last point to this one
      let vector = {x: (pos.x - last.x),
                    y: (pos.y - last.y)};
      // The length of this vector
      let vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      // The point halfwasy between last point and tis one
      let half = {x: (last.x + vector.x/2),
                  y: (last.y + vector.y/2)};
      // The vector that is perpendicular to 'vector'
      let perpVector = {x: -(squiggleAmplitude * vector.y / vectorLen),
                        y: (squiggleAmplitude * vector.x / vectorLen)};
      // No calculate the control point position
      let controlPoint = {x: (half.x + perpVector.x * side),
                          y: (half.y + perpVector.y * side)};
      newPath += ("Q" + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(','));
      // Switch the side (for next step)
      side = -side;
    }
    return newPath;
  },


  //attempts to get an initial state by
  // 1. looking for a hash "#uuid" in the url and attempting to grab it from cdn
  // 2. looking in local storage for 'infragram_state'
  // 3. just loading some random saved diagram
  initializeState: function(callback) {
    if (window.location.hash.length === 37) {
      try {
        const uuid = window.location.hash.substring(1);
        let request = new XMLHttpRequest();
        request.open(
          "GET",
          "https://statebin.nyc3.digitaloceanspaces.com/" + uuid,
          true
        );

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            window.location.hash = "";
            callback(JSON.parse(request.responseText));
            return;
          } else {
            callback(DATA.DIAGRAMS[0]);
            return;
          }
        };

        request.onerror = function() {
          callback(DATA.DIAGRAMS[0]);
          return;
        };
        request.send();
      } catch (err) {
        callback(DATA.DIAGRAMS[0]);
        return;
      }
    } else {
      try {
        const serializedState = localStorage.getItem("infragram_state");
        if (serializedState === null) {
          return undefined;
        }
        callback(JSON.parse(serializedState));
        return;
      } catch (err) {
        callback(DATA.DIAGRAMS[0]);
        return;
      }
    }
  },

  //saves a user's state to local storage so if they refresh or navigate away
  //they wont lose it
  saveState: function(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("infragram_state", serializedState);
    } catch (err) {
      console.error("Could not save state");
    }
  },

  //saves a user's state to remote server when they click "share"
  remoteSaveState: function(state, callback) {
    //try {
    const serializedState = encodeURIComponent(JSON.stringify(state));
    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://in.statebin.com/?data=" + serializedState,
      true
    );

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let response = JSON.parse(request.responseText);
        if (response.key) {
          callback(response.key);
        }
      } else {
        callback("Error saving to server");
      }
    };

    request.onerror = function() {
      callback("Error saving to server");
    };
    request.send();
    //} catch (err){
    // callback('Error saving to server');
    //}
  },

  getRegionsFromNodes: function(nodes) {
    return Object.keys(nodes).reduce((regions_obj, node_key) => {
      if (get(nodes[node_key], "metadata.region")) {
        if (!regions_obj[nodes[node_key].metadata.region])
          regions_obj[nodes[node_key].metadata.region] = [];
        regions_obj[nodes[node_key].metadata.region].push(node_key);
      }
      return regions_obj;
    }, {});
  },

  stringDeterministicRandom: function(str) {
    return str.split('').reduce((num, char, i) => {
      return num + (char.charCodeAt(0) * (i+1)) % 256;
    }, 0);
  },

  getTagsFromNodes: function(nodes) {
    return Object.keys(nodes).reduce((tags_obj, node_key) => {
      if (get(nodes[node_key], "metadata.tags")) {
        (typeof(nodes[node_key].metadata.tags) === 'string' ? nodes[node_key].metadata.tags.split(",") :  nodes[node_key].metadata.tags).map(tag => {
          if (tag.length > 0 && tag !== " " && !(tag in tags_obj)) {
            tags_obj[tag] = {
              color_id: Object.keys(tags_obj).length+1,
              dash_array: (80 + (this.stringDeterministicRandom(tag) % 70)) + ", 4, " + (this.stringDeterministicRandom(tag) % 100) + ", 4"
            };
          }
        });
      }
      return tags_obj;
    }, {});
  },

  getBoundingRectangle: function(region, nodes) {
    let bounds = [999, 999, -999, -999];

    Object.keys(nodes).forEach(key => {
      if (get(nodes[key], "metadata.region") === region) {
        const edge = get(DATA.NODES[nodes[key].type], "metadata.edge") || get(DATA.NODES[nodes[key].type], "behavior.edge");
        if (nodes[key].position[0] < bounds[0]) {
          bounds[0] = nodes[key].position[0] + (edge ? 0.5 : 0);
        } //left
        if (nodes[key].position[1] < bounds[1]) {
          bounds[1] = nodes[key].position[1] + (edge ? 0.5 : 0);
        } //top
        if (nodes[key].position[0] > bounds[2]) {
          bounds[2] = nodes[key].position[0] - (edge ? 0.5 : 0);
        } //right
        if (nodes[key].position[1] > bounds[3]) {
          bounds[3] = nodes[key].position[1] - (edge ? 0.5 : 0);
        } //bottom
      }
    });

    return {
      left: bounds[0] * 100 + "px",
      top: bounds[1] * 100 + "px",
      width: (bounds[2] - bounds[0] + 1) * 100 + "px",
      height: (bounds[3] - bounds[1] + 1) * 100 + "px"
    };
  },

  getKeyedElement: function(target) {
    while (!target.dataset.click_key && target.id !== "root") {
      target = target.parentNode;
    }
    return target.id === "root" ? null : target;
  },

  lineToSVGString: function(points, dir, simplex, style) {
    let st_1 = "",
      st_2 = "",
      a,
      b,
      offset,
      i,
      max = points.length;
    if (max == 2) {
      return (
        "M" +
        points[0][0] +
        "," +
        points[0][1] +
        "L" +
        points[1][0] +
        "," +
        points[1][1]
      );
    } else {
      if(style === "square" || style === "angular") {
        for (i = 0; i < max; i++) {
          a = i === 0 ? points[i] : points[i - 1];
          b = i === max - 1 ? points[i] : points[i + 1];
          offset = 3 * Math.sin(Math.atan((b[1] - a[1]) / (b[0] - a[0])));
          if (dir === "h") {
            st_1 +=
              "L " +
              this.round2(points[i][0] - 0.5 * offset) +
              " " +
              (points[i][1] + 1.5) +
              " ";
            st_2 =
              "L " +
              this.round2(points[i][0] + 0.5 * offset) +
              " " +
              (points[i][1] - 1.5) +
              " " +
              st_2;
          } else {
            st_1 +=
              "L " +
              (points[i][0] + 1.5) +
              " " +
              this.round2(points[i][1] - 0.5 * offset) +
              " ";
            st_2 =
              "L " +
              (points[i][0] - 1.5) +
              " " +
              this.round2(points[i][1] + 0.5 * offset) +
              " " +
              st_2;
          }
        }
        return "M" + st_1.substr(1) + st_2;
      } else {
        st_1 += "M" + points[0][0] + "," + points[0][1];
        for (i = 1; i < max - 1; i += 3) {
          st_1 +=
            "C" +
            points[i][0] +
            "," +
            points[i][1] +
            "," +
            points[i + 1][0] +
            "," +
            points[i + 1][1] +
            "," +
            points[i + 2][0] +
            "," +
            points[i + 2][1];
        }
        console.log('curved', st_1);
        return st_1;
      }
    }
  },

  mouseToGrid: function(pos) {
    const _dpos = document.querySelector(".diagram").getBoundingClientRect();
    return [
      Math.ceil((pos.x - _dpos.left + 100.0 - _dpos.width / 2) / 50.0) / 2.0,
      Math.floor((pos.y - _dpos.top - 50.0 - _dpos.height / 2.0) / 50.0) / 2.0
    ];
  },

  getClosestNodes: function(types, position, nodes, greedy) {
    let min_dist = 9999999,
      closest = [],
      dist, i, type;
    for(i=0;i<types.length;i++) {
      type = types[i];
      Object.keys(nodes).forEach(key => {
        if (!type || nodes[key].type === type) {
          dist = Math.sqrt(
            Math.pow(nodes[key].position[0] - position[0], 2) +
              Math.pow(nodes[key].position[1] - position[1], 2)
          );
          if (dist < min_dist || greedy) {
            min_dist = dist;
            closest.push(key);
          }
        }
      });
      if (closest.length && !greedy) return closest;
    }
    return closest;
  },

  positionIsOpen: function(nodes, x, y) {
    open = true;
    Object.keys(nodes).forEach(key => {
      if (
        Math.abs(nodes[key].position[0] - x) < 1 &&
        Math.abs(nodes[key].position[1] - y) < 1
      )
        open = false;
    });
    return open;
  },

  getClosestOpenPosition: function(position, nodes) {
    //FOLLOW A GRID SPIRAL PATTERN AWAY FROM position
    // Starting 1 unit below
    let stride = 4,
      step = 0,
      cx = position[0],
      cy = position[1] + 1,
      open = true;
    if (this.positionIsOpen(nodes, cx, cy)) return [cx, cy];
    cx++;
    while (true) {
      //YOLO
      if (this.positionIsOpen(nodes, cx, cy)) return [cx, cy];
      //NOT OPEN! - BRAINBENDING SPIRAL PATHER
      cx += (stride % 2 == 0 ? -1 : 1) * (step >= stride ? 0.5 : 0);
      cy += (stride % 2 == 0 ? -1 : 1) * (step < stride ? 0.5 : 0);
      step++;
      if (step == stride * 2) {
        stride++;
        step = 0;
      }
    }
  },

  getNodesWithinRect: function(nodes, coords) {
    const box = [
      this.mouseToGrid({ x: coords[0], y: coords[1] }),
      this.mouseToGrid({ x: coords[2], y: coords[3] })
    ];
    let selected_nodes = [];
    Object.keys(nodes).forEach(key => {
      if (
        nodes[key].position[0] >= box[0][0] &&
        nodes[key].position[0] <= box[1][0] &&
        nodes[key].position[1] >= box[0][1] &&
        nodes[key].position[1] <= box[1][1]
      ) {
        selected_nodes.push(key);
      }
    });
    return selected_nodes;
  },

  dragHighlight: function(start, selectCB, nodes) {
    let drag_obj = {
      box: document.querySelector("#dragBox"),
      getNodesWithinRect: this.getNodesWithinRect,
      mouseToGrid: this.mouseToGrid,
      selectCB: selectCB,
      nodes: nodes,
      _sx: start[0],
      _sy: start[1],
      _cx: start[0],
      _cy: start[1],
      dragUpdate: function(e) {
        this._cx = e.clientX;
        this._cy = e.clientY;
        //Mouse above startpoint?
        if (this._cx > this._sx) {
          this.box.style.left = this._sx + "px";
          this.box.style.width = this._cx - this._sx + "px";
        } else {
          this.box.style.left = this._cx + "px";
          this.box.style.width = this._sx - this._cx + "px";
        }
        if (this._cy > this._sy) {
          this.box.style.top = this._sy + "px";
          this.box.style.height = this._cy - this._sy + "px";
        } else {
          this.box.style.top = this._cy + "px";
          this.box.style.height = this._sy - this._cy + "px";
        }
      },

      captureClick: function(e) {
        e.stopPropagation();
        document.body.removeEventListener("click", this.captureClickRef, true);
      },

      dragStop: function(e) {
        if (Math.abs(this._cx - this._sx) + Math.abs(this._cy - this._sy) > 10)
          document.body.addEventListener("click", this.captureClickRef, true);
        window.clearTimeout(this.dragDebounce);
        document.removeEventListener("mousemove", this.dragUpdateRef);
        document.removeEventListener("mouseup", this.dragStopRef);
        this.box.style.display = "none";
        const selnodes = this.getNodesWithinRect(this.nodes, [
            this._sx < this._cx ? this._sx : this._cx,
            this._sy < this._cy ? this._sy : this._cy,
            this._sx > this._cx ? this._sx : this._cx,
            this._sy > this._cy ? this._sy : this._cy
          ]);
        if (selnodes.length) {
          return this.selectCB(
            selnodes,
            e.shiftKey
          );
        }
      }
    };

    drag_obj.dragUpdateRef = drag_obj.dragUpdate.bind(drag_obj);
    drag_obj.captureClickRef = drag_obj.captureClick.bind(drag_obj);
    drag_obj.dragStopRef = drag_obj.dragStop.bind(drag_obj);
    drag_obj.dragDebounce = window.setTimeout(
      function() {
        this._sx = start[0];
        this._sy = start[1];
        this.box.style.display = "block";
        document.addEventListener("mousemove", this.dragUpdateRef);
      }.bind(drag_obj),
      250
    );
    document.addEventListener("mouseup", drag_obj.dragStopRef);
  },

  addNodeAndConnections: function(
    new_node_type,
    new_node_position,
    metadata,
    state
  ) {
    /* GIVEN A NODE TYPE, IDEAL POSITION AND OPTIONALLY ANY CUSTOM METADATA:
        A. FIGURE OUT CLOSEST POSSIBLE LOCATION TO PUT IT
        B. FIGURE OUT WHAT (IF ANY) NEARBY NODES IT SHOULD CONNECT TO, AND HOW
        C. CALL AN "ADDNODE" FUNCTION WITH THE REQUISITE CONNECTIONS
    */

    // Add or Move Item
    const update = {
        guid: this.guid(),
        position: this.getClosestOpenPosition(new_node_position, state.nodes),
        connections: [],
        metadata: metadata || DATA.NODES[new_node_type].metadata
      },
      node_specs = DATA.NODES[new_node_type],
      regions = this.getRegionsFromNodes(state.nodes);
    console.log('addNodeAndConnections', update);
    //Auto-set region
    if (
      Object.keys(regions).length === 0 &&
      !get(node_specs, "behavior.regionless")
    ) {
      update.metadata.region = "nyc3";
    }
    if (
      !get(update, "metadata.region") &&
      !get(node_specs, "behavior.regionless") &&
      Object.keys(regions).length == 1
    ) {
      update.metadata.region = Object.keys(regions)[0];
    }

    //TRY AND CONNECT TO OTHER NODES BASED ON WANTS
    if (get(node_specs, "behavior.wants")) {
      node_specs.behavior.wants.map(seek => {
        console.log('wants', seek);
        let connection_candidates = this.getClosestNodes(
          seek.node_types,
          new_node_position,
          state.nodes,
          seek.all
        );
        console.log('candidates', connection_candidates);
        connection_candidates.map(c => {
          const try_c = this.connectNewNodeAndNode(
            new_node_type,
            c,
            state.nodes,
            state.connectors
          );
          if(!try_c.error) update.connections.push(try_c);
        });
      });
    }
    console.log(update.connections)

    state.addNode(
      update.guid,
      new_node_type,
      ...update.position,
      update.metadata,
      update.connections
    );

    return true;
  },

  nodeMaxedOut: function(node_key, node_type, connections) {
    if (
      typeof get(DATA.NODES[node_type], "behavior.max_connections") === "number"
    ) {
      return (
        DATA.NODES[node_type].behavior.max_connections <=
        connections.reduce((ct, c) => {
          if (c.between[0] === node_key || c.between[1] === node_key) ct++;
          return ct;
        }, 0)
      );
    }
    return false;
  },

  nodeTypesCompatible: function(node_a, node_b) {
    //Check each node for disallowed connections (node.behavior.incompatible_with)
    if (
      (get(DATA.NODES[node_a], "behavior.incompatible_with") &&
        DATA.NODES[node_a].behavior.incompatible_with.indexOf(node_b) > -1) ||
      (get(DATA.NODES[node_b], "behavior.incompatible_with") &&
        DATA.NODES[node_b].behavior.incompatible_with.indexOf(node_a) > -1)
    )
      return false;
    return true;
  },

  getConnectorFromWants: function(from_node, to_node) {
    if (DATA.NODES[from_node].behavior.wants) {
      const ideals = DATA.NODES[from_node].behavior.wants.reduce((acc, w) => {
        if ("node_types" in w && w.node_types.indexOf(to_node) > -1) {
          acc.push({
            type: w.via,
            metadata: Object.assign(
              {},
              "metadata" in DATA.CONNECTORS[w.via]
                ? DATA.CONNECTORS[w.via].metadata
                : {},
              w.metadata || {}
            )
          });
        }
        return acc;
      }, []);
      if (ideals.length) return ideals[0];
    }
    return undefined;
  },

  connectNewNodeAndNode: function(new_node, to_node, nodes, connections) {
    //Check that to_node isnt maxed out
    if (this.nodeMaxedOut(to_node, nodes[to_node].type, connections)) {
      return {
        error:
          "Too many connections on " +
          (nodes[to_node].metadata.name || nodes[to_node].type)
      };
    }

    //Check that one node doesnt disallow the other
    if (!this.nodeTypesCompatible(new_node, nodes[to_node].type)) {
      return {
        error: new_node + " not compatible with " + nodes[to_node].type
      };
    }

    //Connection is possible, look in behavior metadata for recommended connection
    let conn =
      this.getConnectorFromWants(new_node, nodes[to_node].type) ||
      this.getConnectorFromWants(nodes[to_node].type, new_node);
    if (conn) {
      conn.to = to_node;
      return conn;
    }
    return { to: to_node, via: "tcp", metadata: DATA.CONNECTORS.tcp.metadata };
  },

  connectNodes: function(from_node, to_node, nodes, connections) {
    //Check that from_node isnt maxed out
    if (this.nodeMaxedOut(from_node, nodes[from_node].type, connections)) {
      return {
        error:
          "Too many connections on " +
          (nodes[from_node].metadata.name || nodes[from_node].type)
      };
    }

    //Check that to_node isnt maxed out
    if (this.nodeMaxedOut(to_node, nodes[to_node].type, connections)) {
      return {
        error:
          "Too many connections on " +
          (nodes[to_node].metadata.name || nodes[to_node].type)
      };
    }

    //Check that one node doesnt disallow the other
    if (!this.nodeTypesCompatible(nodes[to_node].type, nodes[from_node].type)) {
      return {
        error:
          nodes[to_node].type + " not compatible with " + nodes[from_node].type
      };
    }

    //Connection is possible, look in behavior metadata for recommended connection
    let conn = this.getConnectorFromWants(
      nodes[to_node].type,
      nodes[from_node].type
    );
    if (conn) return conn;
    conn = this.getConnectorFromWants(
      nodes[from_node].type,
      nodes[to_node].type
    );
    if (conn) return conn;
    return {type:"tcp", metadata:DATA.CONNECTORS.tcp.metadata};
  },

  handleSingleAndDoubleClick: function(event, onSingle, onDouble) {
    //Only Doubleclick currently does anything
    if (event.target.getAttribute("data-dblclick") == null) {
      event.target.setAttribute("data-dblclick", 1);
      setTimeout(function() {
        if (event.target.getAttribute("data-dblclick") == 1) {
          onSingle();
        }
        event.target.removeAttribute("data-dblclick");
      }, 300);
    } else {
      event.target.removeAttribute("data-dblclick");
      onDouble();
    }
  }
};

export default helpers;