import React from 'react';
import dndHelper from '../dndHelper.js';

import helpers from '../helpers.js';

class Connector extends React.Component {

  render() {
    const { connector_template, id, metadata, between, connectDropTarget, selected} = this.props;

    let pos, viewBox, path, w, h, dir, dns_path;

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

      const invert = between[0][0] > between[1][0],
            start  = invert ? between[1] : between[0],
            end    = invert ? between[0] : between[1];
      h       = Math.abs(end[1] - start[1]) * 100;
      w       = (end[0] - start[0]) * 100;
      dir     = 'v';

      // v - vertical
      if (start[0] == end[0]) {
        w = 20;
        h -= 80;
        pos = {
          left:   ((start[0] * 100) + 40)  + 'px',
          top:    (((start[1] < end[1] ? start[1] : end[1]) + 0.95) * 100) + 'px',
          width:  '20px',
          height: h + 'px'
        }
        path = [[w/2,0],[w/2,h+3]];
        viewBox = "0 0 " + w + " " + h;
        dns_path = [[w-2,0],[w-2,20]];
      }
      else if (start[1] == end[1]) {
        dir     = 'h'; // h - horizontal
        h = 10;
        w -= 70;
        pos = {
          left:   ((start[0] + 1) * 100) - 15 + 'px',
          top:    (((start[1] < end[1] ? start[1] : end[1]) * 100) + 35) + 'px',
          width:  w + 'px',
          height: '30px'
        }
        path = [[0,15],[w+3,15]];
        viewBox = "0 0 " + w + " 30";
        dns_path = [[0,2],[15,2]];
      }
      else if (w >= h) {
        w -= 70;
        h += 20;
        // if connector travels further in x than in y
        pos = {
          left:   ((start[0] + .95) * 100) - 10 + 'px',
          top:    (((start[1] < end[1] ? start[1] : end[1]) * 100) + 40) + 'px',
          width:  w + 'px',
          height: h + 'px'
        };
        dir     = 'h';
        viewBox = "0 0 " + w + ".0 " + h + ".0";
        // hb - horizontal, bottom to top (left to right) NOTE: Y is inverted
        if (start[1] > end[1]) {
          path =  [
                    [0,      h - 15],
                    [Math.min(w/4, 25),     h - 15],
                    [w - Math.min(w/4, 25), 15],
                    [w+3,    15]
                  ];
          dns_path = [[0, h],[10, h]];
        } else {
          // ht - horizontal, top to bottom (left to right)
          path = [
                    [0,      15],
                    [Math.min(w/4, 25),     15],
                    [w - Math.min(w/4, 25), h-15],
                    [w+3,    h-15]
                  ];
          dns_path = [[0, 0],[15, 0]];
        }
      } else {
        h -= 80;
        w += 10;
        // if connector travels further in y than x
        pos = {
          left:   ((start[0] * 100) + 50) + 'px',
          top:    (((start[1] < end[1] ? start[1] : end[1]) + 0.95) * 100) + 'px',
          width:  w + 'px',
          height: h + 'px'
        };
        dir     = 'v';
        viewBox = "0 0 " + w + " " + h;
        // vb - vertical, bottom to top (left to right) NOTE: Y is inverted
        if(start[1] > end[1]) {
          path = [
                        [5, h],
                        [5, h - Math.min(h/4, 25)],
                        [w - 10, Math.min(h/4, 25)],
                        [w - 10, -3]
                      ];
          dns_path = [[w-1,0],[w-1,20]];
        } else {
          path = [
                        [5, 0],
                        [5, Math.min(h/4, 25)],
                        [w - 5, h - Math.min(h/4, 25)],
                        [w - 5, h+3]
                      ];
          dns_path = [[10, 0],[10, 20]];
        }
      }
    }

    const center = {left:w/2, top:h/2};
    pos.zIndex = connector_template.mode === 'duplex' ? 10 : 5;

    return connectDropTarget(

      <figure
        key={id}
        style={pos}
        data-category="connector"
        data-key={id}
        data-active={!(metadata && metadata.active === false)}
        data-selected={this.props.selected === true}
      >
        <label className="hoverShow">{connector_template.short_name}</label>

        <svg width="100%" height="100%" viewBox={viewBox} data-dropaction="connector" data-category="connector">
          <path
            className="offwhite"
            d={connector_template.mode === 'duplex' ? helpers.lineToSVGString(path, dir) : helpers.lineToSVGString(path, dir, true)}
          />
          <path
            className={connector_template.mode === 'duplex' ? 'nofill' : 'nofill dashed'}
            d={connector_template.mode === 'duplex' ? helpers.lineToSVGString(path, dir) : helpers.lineToSVGString(path, dir, true)}
            stroke={metadata && metadata.active === false ? '#999' : metadata.color}
          />

          {metadata && metadata.dns ? <path d={helpers.lineToSVGString(dns_path, dir, true) } stroke={metadata && metadata.active === false ? '#999' : metadata.color} /> : '' }
          <circle className="hoverShow add" cx={center.left} cy={center.top} r="6" />
        </svg>

        {metadata && metadata.dns ? <dl className="dns-label" style={{left:dns_path[1][0] - 2, "marginTop":dns_path[1][1]}}><dt style={{borderColor:metadata.color}}>dns:</dt><dd style={{borderColor:metadata.color}}>{metadata.dns}</dd></dl> : ''}
      </figure>
    )
  }
};

export default dndHelper.composeDrop(Connector);
