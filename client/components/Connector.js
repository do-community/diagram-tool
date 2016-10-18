import React from 'react';
import { Link } from 'react-router';

const Connector = React.createClass({
  deleteConnector() {
    if ( this.props.deleteConnector ) {
      this.props.deleteConnector(this.props.i);
    }
  },
  round2(num) {
    return Math.round(num*100.0)/100.0;
  },
  lineToString(points, dir) {
    let st_1 = "", st_2 = "", a, b, offset, i, max=points.length;
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
  },
  drawArrows(where) {

  },
  render() {
    const { connector, i, customization, between, nodes } = this.props;

    this.pos = {};
    this.viewBox = "0 0 10 10";
    this.path = [[0,5],[10,5]];
    this.w = 5;
    this.h = 5;

    /* If connector is connected to nodes, calculate how to draw the line */
    if ( between ) {
      // Break connections into six types
      // (we dont care which is first/last, just always start with leftmost)
      //                   __☐
      //                  /hb
      //      ┌-------┐__/
      //      |       |
      //      |       |--h-- ☐
      //      |       |__
      //      └-┬-┬-┬-┘  \ht
      //     vb/  v  \vt  \__☐
      //     /    |   \
      //    ☐    ☐    ☐
      const invert = nodes[between[0]].position[0] > nodes[between[1]].position[0],
            start  = invert ? nodes[between[1]].position : nodes[between[0]].position,
            end    = invert ? nodes[between[0]].position : nodes[between[1]].position;
      this.h       = Math.abs(end[1] - start[1]) * 100;
      this.w       = (end[0] - start[0]) * 100;
      this.dir     = 'v';

      // v - vertical
      if (start[0] == end[0]) {
        this.w = 10;
        this.h -= 90;
        this.pos = {
          left:   ((start[0] * 10) + 4.5) + 'rem',
          top:    (((start[1] < end[1] ? start[1] : end[1]) + .95) * 10) + 'rem',
          width:  '1rem',
          height: (this.h/10) + 'rem'
        }
        this.path = [[4,0],[4,this.h+3]];
        this.viewBox = "0 0 10 " + this.h;
      }
      else if (start[1] == end[1]) {
        this.dir     = 'h'; // h - horizontal
        this.h = 10;
        this.w -= 90;
        this.pos = {
          left:   ((start[0] + 1) * 10) - 0.5 + 'rem',
          top:    (((start[1] < end[1] ? start[1] : end[1]) * 10) + 4.5) + 'rem',
          width:  this.w/10 + 'rem',
          height: '1rem'
        }
        this.path = [[0,5],[this.w+3,5]];
        this.viewBox = "0 0 " + this.w + " 10";
      }
      else if (this.w >= this.h) {
        this.w -= 90;
        // connector travels further in x than in y
        this.pos = {
          left:   ((start[0] + .95) * 10) + 'rem',
          top:    (((start[1] < end[1] ? start[1] : end[1]) * 10) + 5) + 'rem',
          width:  this.w/10 + 'rem',
          height: this.h/10 + 'rem'
        };
        this.dir     = 'h';
        this.viewBox = "0 0 " + this.w + ".0 " + this.h + ".0";
        // hb - horizontal, bottom to top (left to right) NOTE: Y is inverted
        if (start[1] > end[1]) {
          this.path = [
                        [0,  this.h - 5],
                        [25, this.h - 5],
                        [this.w - 25, 5],
                        [this.w+3,      5]
                      ];
        } else {
          // ht - horizontal, top to bottom (left to right)
          this.path = [
                        [0,  5],
                        [25, 5],
                        [this.w - 25, this.h-5],
                        [this.w+3,      this.h-5]
                      ];
        }
      } else {
        this.h -= 90;
        // connector travels further in y than x
        this.pos = {
          left:   ((start[0] * 10) + 5) + 'rem',
          top:    (((start[1] < end[1] ? start[1] : end[1]) + 0.95) * 10) + 'rem',
          width:  this.w/10 + 'rem',
          height: this.h/10 + 'rem'
        };
        this.dir     = 'v';
        this.viewBox = "0 0 " + this.w + " " + this.h;
        // vb - vertical, bottom to top (left to right) NOTE: Y is inverted
        if(start[1] > end[1]) {
          this.path = [
                        [5, this.h],
                        [5, this.h - 25],
                        [this.w - 5, 25],
                        [this.w - 5, -3]
                      ];
        } else {
          this.path = [
                        [5, 0],
                        [5, 25],
                        [this.w - 5, this.h - 25],
                        [this.w - 5, this.h+3]
                      ];
        }
      }
    }

    console.log(this);

    return (
      <figure className="connector" style={this.pos}>
        <svg width="100%" height="100%" viewBox={this.viewBox}>
          <path d={connector.mode === 'duplex' ? this.lineToString(this.path, this.dir) : this.path}
                stroke={customization && customization.active === false ? '#999' : connector.color}
                strokeDasharray={customization && customization.active === false ? '1' : connector.dash} />
              <circle className="delete" cx={this.w/2.0} cy={this.h/2.0} r="6" />
          <text className="delete" x={(this.w/2) - 3} y={(this.h/2) + 3} fontSize="8" onClick={this.deleteConnector}>x</text>
        </svg>
      </figure>
    )
  }
});

export default Connector;
