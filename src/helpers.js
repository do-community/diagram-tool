import DATA from './data';
import get from 'lodash/get';

const helpers = {
  // is a user is copy/pasting into input areas, or with text highlighted?
  copyPastingText: function() {
    if (document.activeElement.tagName in ['INPUT', 'TEXTAREA']) {
      return true;
    }
    if (window.getSelection().toString().length) {
      return true;
    }
    return false;
  },

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
          largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
        'M', start.x, start.y, 
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');  
  },

  squigglePath: function(followPath, squiggleStep = 25, squiggleAmplitude = 20, offset = -1) {
    
    let pathLen = followPath.getTotalLength();

    // Adjust step so that there are a whole number of steps along the path
    let numSteps = Math.round(pathLen / squiggleStep);

    let pos = followPath.getPointAtLength(0);
    let newPath = 'M' + [pos.x, pos.y].join(',');
    let side = offset;
    for (let i=1; i<=numSteps; i++)
    {
      let last = pos;
      let pos = followPath.getPointAtLength(i * pathLen / numSteps);

      // If last isn't a thing, we should return! This will just spam the console with errors.
      if (!last) return;

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
      newPath += ('Q' + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(','));
      // Switch the side (for next step)
      side = -side;
    }
    return newPath;
  },


  //attempts to get an initial state by
  // 1. looking for a hash "#uuid" in the url and attempting to grab it from cdn
  // 2. looking in local storage for 'infragramState'
  // 3. just loading some random saved diagram
  initializeState: function(callback) {
    if (window.location.hash.length === 37) {
      try {
        const uuid = window.location.hash.substring(1);
        let request = new XMLHttpRequest();
        request.open(
          'GET',
          'https://statebin.nyc3.digitaloceanspaces.com/' + uuid,
          true
        );

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            window.location.hash = '';
            callback(JSON.parse(request.responseText));
            return;
          } else {
            callback(DATA.diagrams[0]);
            return;
          }
        };

        request.onerror = function() {
          callback(DATA.diagrams[0]);
          return;
        };
        request.send();
      } catch (err) {
        callback(DATA.diagrams[0]);
        return;
      }
    } else {
      try {
        const serializedState = localStorage.getItem('infragramState');
        if (serializedState === null) {
          return undefined;
        }
        callback(JSON.parse(serializedState));
        return;
      } catch (err) {
        callback(DATA.diagrams[0]);
        return;
      }
    }
  },

  //saves a user's state to local storage so if they refresh or navigate away
  //they wont lose it
  saveState: function(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('infragramState', serializedState);
    } catch (err) {
      console.error('Could not save state');
    }
  },

  //saves a user's state to remote server when they click "share"
  remoteSaveState: function(state, callback) {
    //try {
    const serializedState = encodeURIComponent(JSON.stringify(state));
    let request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://in.statebin.com/?data=' + serializedState,
      true
    );

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let response = JSON.parse(request.responseText);
        if (response.key) {
          callback(response.key);
        }
      } else {
        callback('Error saving to server');
      }
    };

    request.onerror = function() {
      callback('Error saving to server');
    };
    request.send();
    //} catch (err){
    // callback('Error saving to server');
    //}
  },

  getRegionsFromNodes: function(nodes) {
    return Object.keys(nodes).reduce((regionsObj, nodeKey) => {
      if (get(nodes[nodeKey], 'metadata.region')) {
        if (!regionsObj[nodes[nodeKey].metadata.region])
          regionsObj[nodes[nodeKey].metadata.region] = [];
        regionsObj[nodes[nodeKey].metadata.region].push(nodeKey);
      }
      return regionsObj;
    }, {});
  },

  stringDeterministicRandom: function(str) {
    return str.split('').reduce((num, char, i) => {
      return num + (char.charCodeAt(0) * (i+1)) % 256;
    }, 0);
  },

  getTagsFromNodes: function(nodes) {
    return Object.keys(nodes).reduce((tagsObj, nodeKey) => {
      if (get(nodes[nodeKey], 'metadata.tags')) {
        (typeof(nodes[nodeKey].metadata.tags) === 'string' ? nodes[nodeKey].metadata.tags.split(',') :  nodes[nodeKey].metadata.tags).map(tag => {
          if (tag.length > 0 && tag !== ' ' && !(tag in tagsObj)) {
            tagsObj[tag] = {
              colorId: Object.keys(tagsObj).length+1,
              dashArray: (80 + (this.stringDeterministicRandom(tag) % 70)) + ', 4, ' + (this.stringDeterministicRandom(tag) % 100) + ', 4'
            };
          }
        });
      }
      return tagsObj;
    }, {});
  },

  getBoundingRectangle: function(region, nodes) {
    let bounds = [999, 999, -999, -999];

    Object.keys(nodes).forEach(key => {
      if (get(nodes[key], 'metadata.region') === region) {
        const edge = get(DATA.nodes[nodes[key].type], 'metadata.edge') || get(DATA.nodes[nodes[key].type], 'behavior.edge');
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
      left: bounds[0] * 100 + 'px',
      top: bounds[1] * 100 + 'px',
      width: (bounds[2] - bounds[0] + 1) * 100 + 'px',
      height: (bounds[3] - bounds[1] + 1) * 100 + 'px'
    };
  },

  getKeyedElement: function(target) {
    while (!target.dataset.clickKey && target.id !== 'root') {
      target = target.parentNode;
    }
    return target.id === 'root' ? null : target;
  },

  lineToSVGString: function(points, dir, simplex, style) {
    let st_1 = '',
      st_2 = '',
      a,
      b,
      offset,
      i,
      max = points.length;
    if (max == 2) {
      return (
        'M' +
        points[0][0] +
        ',' +
        points[0][1] +
        'L' +
        points[1][0] +
        ',' +
        points[1][1]
      );
    } else {
      if(style === 'square' || style === 'angular') {
        for (i = 0; i < max; i++) {
          a = i === 0 ? points[i] : points[i - 1];
          b = i === max - 1 ? points[i] : points[i + 1];
          offset = 3 * Math.sin(Math.atan((b[1] - a[1]) / (b[0] - a[0])));
          if (dir === 'h') {
            st_1 +=
              'L ' +
              this.round2(points[i][0] - 0.5 * offset) +
              ' ' +
              (points[i][1] + 1.5) +
              ' ';
            st_2 =
              'L ' +
              this.round2(points[i][0] + 0.5 * offset) +
              ' ' +
              (points[i][1] - 1.5) +
              ' ' +
              st_2;
          } else {
            st_1 +=
              'L ' +
              (points[i][0] + 1.5) +
              ' ' +
              this.round2(points[i][1] - 0.5 * offset) +
              ' ';
            st_2 =
              'L ' +
              (points[i][0] - 1.5) +
              ' ' +
              this.round2(points[i][1] + 0.5 * offset) +
              ' ' +
              st_2;
          }
        }
        return 'M' + st_1.substr(1) + st_2;
      } else {
        st_1 += 'M' + points[0][0] + ',' + points[0][1];
        for (i = 1; i < max - 1; i += 3) {
          st_1 +=
            'C' +
            points[i][0] +
            ',' +
            points[i][1] +
            ',' +
            points[i + 1][0] +
            ',' +
            points[i + 1][1] +
            ',' +
            points[i + 2][0] +
            ',' +
            points[i + 2][1];
        }
        return st_1;
      }
    }
  },

  mouseToGrid: function(pos) {
    const _dpos = document.querySelector('.diagram').getBoundingClientRect();
    return [
      Math.ceil((pos.x - _dpos.left + 100.0 - _dpos.width / 2) / 50.0) / 2.0,
      Math.floor((pos.y - _dpos.top - 50.0 - _dpos.height / 2.0) / 50.0) / 2.0
    ];
  },

  getClosestNodes: function(types, position, nodes, greedy) {
    let minDist = 9999999,
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
          if (dist < minDist || greedy) {
            minDist = dist;
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
      cy = position[1] + 1;
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
    let selectedNodes = [];
    Object.keys(nodes).forEach(key => {
      if (
        nodes[key].position[0] >= box[0][0] &&
        nodes[key].position[0] <= box[1][0] &&
        nodes[key].position[1] >= box[0][1] &&
        nodes[key].position[1] <= box[1][1]
      ) {
        selectedNodes.push(key);
      }
    });
    return selectedNodes;
  },

  dragHighlight: function(start, selectCB, nodes) {
    let dragObj = {
      box: document.querySelector('#dragBox'),
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
          this.box.style.left = this._sx + 'px';
          this.box.style.width = this._cx - this._sx + 'px';
        } else {
          this.box.style.left = this._cx + 'px';
          this.box.style.width = this._sx - this._cx + 'px';
        }
        if (this._cy > this._sy) {
          this.box.style.top = this._sy + 'px';
          this.box.style.height = this._cy - this._sy + 'px';
        } else {
          this.box.style.top = this._cy + 'px';
          this.box.style.height = this._sy - this._cy + 'px';
        }
      },

      captureClick: function(e) {
        e.stopPropagation();
        document.body.removeEventListener('click', this.captureClickRef, true);
      },

      dragStop: function(e) {
        if (Math.abs(this._cx - this._sx) + Math.abs(this._cy - this._sy) > 10)
          document.body.addEventListener('click', this.captureClickRef, true);
        window.clearTimeout(this.dragDebounce);
        document.removeEventListener('mousemove', this.dragUpdateRef);
        document.removeEventListener('mouseup', this.dragStopRef);
        this.box.style.display = 'none';
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

    dragObj.dragUpdateRef = dragObj.dragUpdate.bind(dragObj);
    dragObj.captureClickRef = dragObj.captureClick.bind(dragObj);
    dragObj.dragStopRef = dragObj.dragStop.bind(dragObj);
    dragObj.dragDebounce = window.setTimeout(
      function() {
        this._sx = start[0];
        this._sy = start[1];
        this.box.style.display = 'block';
        document.addEventListener('mousemove', this.dragUpdateRef);
      }.bind(dragObj),
      250
    );
    document.addEventListener('mouseup', dragObj.dragStopRef);
  },

  addNodeAndConnections: function(
    newNodeType,
    newNodePosition,
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
        position: this.getClosestOpenPosition(newNodePosition, state.nodes),
        connections: [],
        metadata: metadata || DATA.nodes[newNodeType].metadata
      },
      nodeSpecs = DATA.nodes[newNodeType],
      regions = this.getRegionsFromNodes(state.nodes);
    console.log('addNodeAndConnections', update);
    //Auto-set region
    if (
      Object.keys(regions).length === 0 &&
      !get(nodeSpecs, 'behavior.regionless')
    ) {
      update.metadata.region = 'nyc3';
    }
    if (
      !get(update, 'metadata.region') &&
      !get(nodeSpecs, 'behavior.regionless') &&
      Object.keys(regions).length == 1
    ) {
      update.metadata.region = Object.keys(regions)[0];
    }

    //TRY AND CONNECT TO OTHER NODES BASED ON WANTS
    if (get(nodeSpecs, 'behavior.wants')) {
      nodeSpecs.behavior.wants.map(seek => {
        console.log('wants', seek);
        let connectionCandidates = this.getClosestNodes(
          seek.nodeTypes,
          newNodePosition,
          state.nodes,
          seek.all
        );
        console.log('candidates', connectionCandidates);
        connectionCandidates.map(c => {
          const tryC = this.connectNewNodeAndNode(
            newNodeType,
            c,
            state.nodes,
            state.connectors
          );
          if(!tryC.error) update.connections.push(tryC);
        });
      });
    }
    console.log(update.connections)

    state.addNode(
      update.guid,
      newNodeType,
      ...update.position,
      update.metadata,
      update.connections
    );

    return true;
  },

  nodeMaxedOut: function(nodeKey, nodeType, connections) {
    if (
      typeof get(DATA.nodes[nodeType], 'behavior.maxConnections') === 'number'
    ) {
      return (
        DATA.nodes[nodeType].behavior.maxConnections <=
        connections.reduce((ct, c) => {
          if (c.between[0] === nodeKey || c.between[1] === nodeKey) ct++;
          return ct;
        }, 0)
      );
    }
    return false;
  },

  nodeTypesCompatible: function(nodeA, nodeB) {
    //Check each node for disallowed connections (node.behavior.incompatibleWith)
    if (
      (get(DATA.nodes[nodeA], 'behavior.incompatibleWith') &&
        DATA.nodes[nodeA].behavior.incompatibleWith.indexOf(nodeB) > -1) ||
      (get(DATA.nodes[nodeB], 'behavior.incompatibleWith') &&
        DATA.nodes[nodeB].behavior.incompatibleWith.indexOf(nodeA) > -1)
    )
      return false;
    return true;
  },

  getConnectorFromWants: function(fromNode, toNode) {
    if (DATA.nodes[fromNode].behavior.wants) {
      const ideals = DATA.nodes[fromNode].behavior.wants.reduce((acc, w) => {
        if ('nodeTypes' in w && w.nodeTypes.indexOf(toNode) > -1) {
          acc.push({
            type: w.via,
            metadata: Object.assign(
              {},
              'metadata' in DATA.connectors[w.via]
                ? DATA.connectors[w.via].metadata
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

  connectNewNodeAndNode: function(newNode, toNode, nodes, connections) {
    //Check that toNode isnt maxed out
    if (this.nodeMaxedOut(toNode, nodes[toNode].type, connections)) {
      return {
        error:
          'Too many connections on ' +
          (nodes[toNode].metadata.name || nodes[toNode].type)
      };
    }

    //Check that one node doesnt disallow the other
    if (!this.nodeTypesCompatible(newNode, nodes[toNode].type)) {
      return {
        error: newNode + ' not compatible with ' + nodes[toNode].type
      };
    }

    //Connection is possible, look in behavior metadata for recommended connection
    let conn =
      this.getConnectorFromWants(newNode, nodes[toNode].type) ||
      this.getConnectorFromWants(nodes[toNode].type, newNode);
    if (conn) {
      conn.to = toNode;
      return conn;
    }
    return { to: toNode, via: 'tcp', metadata: DATA.connectors.tcp.metadata };
  },

  connectNodes: function(fromNode, toNode, nodes, connections) {
    //Check that fromNode isnt maxed out
    if (this.nodeMaxedOut(fromNode, nodes[fromNode].type, connections)) {
      return {
        error:
          'Too many connections on ' +
          (nodes[fromNode].metadata.name || nodes[fromNode].type)
      };
    }

    //Check that toNode isnt maxed out
    if (this.nodeMaxedOut(toNode, nodes[toNode].type, connections)) {
      return {
        error:
          'Too many connections on ' +
          (nodes[toNode].metadata.name || nodes[toNode].type)
      };
    }

    //Check that one node doesnt disallow the other
    if (!this.nodeTypesCompatible(nodes[toNode].type, nodes[fromNode].type)) {
      return {
        error:
          nodes[toNode].type + ' not compatible with ' + nodes[fromNode].type
      };
    }

    //Connection is possible, look in behavior metadata for recommended connection
    let conn = this.getConnectorFromWants(
      nodes[toNode].type,
      nodes[fromNode].type
    );
    if (conn) return conn;
    conn = this.getConnectorFromWants(
      nodes[fromNode].type,
      nodes[toNode].type
    );
    if (conn) return conn;
    return {type:'tcp', metadata:DATA.connectors.tcp.metadata};
  },

  handleSingleAndDoubleClick: function(event, onSingle, onDouble) {
    //Only Doubleclick currently does anything
    if (event.target.getAttribute('data-dblclick') == null) {
      event.target.setAttribute('data-dblclick', 1);
      setTimeout(function() {
        if (event.target.getAttribute('data-dblclick') == 1) {
          onSingle();
        }
        event.target.removeAttribute('data-dblclick');
      }, 300);
    } else {
      event.target.removeAttribute('data-dblclick');
      onDouble();
    }
  }
};

export default helpers;