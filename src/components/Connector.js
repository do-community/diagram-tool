import React from 'react';
import dndHelper from '../dndHelper.js';

import helpers from '../helpers.js';

class Connector extends React.Component {
	render() {
		const {
			connector_template,
			id,
			metadata,
			between,
			connectDropTarget,
			selected
		} = this.props;

		let pos, viewBox, path, w, h, dir, dns_path;

		/* If connector is connected to nodes, calculate how to draw the line */

		let invert, start, end, section_style;
		if (between) {
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

			invert = between[0][0] > between[1][0],
			start = invert ? between[1] : between[0],
			end = invert ? between[0] : between[1],
			section_style = metadata.style && metadata.style === 'angular' ? 3 : 2;
			h = Math.abs(end[1] - start[1]) * 103;
			w = (end[0] - start[0]) * 100;
			dir = 'v';
			

			// v - vertical
			if (start[0] == end[0]) {
				w = 20;
				h -= 69;
				pos = {
					left: start[0] * 100 + 40 + 'px',
					top:
						(((start[1] < end[1] ? start[1] : end[1]) + 1) * 100) - 18 +
						'px',
					width: '20px',
					height: h + 'px'
				};
				path = [[w / 2, 0], [w / 2, h + 3]];
				viewBox = '0 0 ' + w + ' ' + h;
				dns_path = [[w - 2, 0], [w - 2, 20]];
			} else if (start[1] == end[1]) {
				dir = 'h'; // h - horizontal
				h = 12;
				w -= 64;
				pos = {
					left: (start[0] + 1) * 100 - 18 + 'px',
					top:
						((start[1] < end[1] ? start[1] : end[1]) * 100) + 38 + 'px',
					width: w + 'px',
					height: '30px'
				};
				path = [[0, 12], [w + 3, 12]];
				viewBox = '0 0 ' + w + ' 30';
				dns_path = [[0, 2], [12, 2]];
			} else if (w >= h) {
				w -= 64;
				h += 20;
				// if connector travels further in x than in y
				pos = {
					left: (start[0] + 0.92) * 100 - 10 + 'px',
					top:
						(start[1] < end[1] ? start[1] : end[1]) * 100 +
						40 +
						'px',
					width: w + 'px',
					height: h + 'px'
				};
				dir = 'h';
				viewBox = '0 0 ' + w + ' ' + h;
				// hb - horizontal, bottom to top (left to right) NOTE: Y is inverted in svg
				if (start[1] > end[1]) {
					path = [
						[0, h - 12],
						[w / section_style, h - 12],
						[w - (w / section_style), 12],
						[w + 3, 12]
					];
					dns_path = [[0, h], [10, h]];
				} else {
					// ht - horizontal, top to bottom (left to right)
					path = [
						[0, 12],
						[w / section_style, 12],
						[w - (w / section_style), h - 12],
						[w + 3, h - 12]
					];
					dns_path = [[0, 0], [15, 0]];
				}
			} else {
				h -= 68;
				w += 10;
				// if connector travels further in y than x
				pos = {
					left: start[0] * 100 + 50 + 'px',
					top:
						((start[1] < end[1] ? start[1] : end[1]) + 0.82) * 100 +
						'px',
					width: w + 'px',
					height: h + 'px'
				};
				dir = 'v';
				viewBox = '0 0 ' + w + ' ' + h;
				// vb - vertical, bottom to top (left to right) NOTE: Y is inverted
				if (start[1] > end[1]) {
					path = [
						[3, h],
						[3, h - (h / section_style)],
						[w - 13, h / section_style],
						[w - 13, -3]
					];
					dns_path = [[w - 1, 0], [w - 1, 20]];
				} else {
					path = [
						[3, 0],
						[3, h / section_style],
						[w - 13, h - (h / section_style)],
						[w - 13, h + 3]
					];
					dns_path = [[10, 0], [10, 20]];
				}
			}
		}

		const center = { left: w / 2, top: h / 2 },
			d_string = helpers.lineToSVGString(
				path,
				dir,
				!('opacity' in connector_template),
				connector_template.metadata.style || null
			);

		pos.zIndex = Math.round(100 * ('opacity' in connector_template) ? connector_template.opacity : 1);
		pos.opacity = ('opacity' in connector_template) ? connector_template.opacity : 1;

		//TODO: Unhack this
		window.setTimeout(function() {
			if (
				metadata &&
				metadata.encryption
			) {
				const d = helpers.squigglePath(
					document.querySelector('*[data-js="wire_' + id + '"]'),
					9,
					1.5
				);
				if (!d) return;
				document
					.querySelector('*[data-js="squiggle_' + id + 'a"]')
					.setAttribute('d', d);
			}
		}, 10);

		return connectDropTarget(
			<div
				key={id}
				data-click_key={id}
				style={pos}
				data-category="connector"
				data-active={!(metadata && metadata.active === false)}
				data-selected={this.props.selected === true}
				className="hoverParent"
			>
				<label className="hoverShow">
					{connector_template.name}
				</label>

				<svg
					width="100%"
					height="100%"
					viewBox={viewBox}
					color={
						metadata && metadata.active === false
							? '#999'
							: metadata.color
					}
				>
					<path
						data-js={'wire_' + id}
						className="offwhitestroked"
						d={d_string}
						strokeWidth="5px"
					/>
					<path
						className={
							connector_template.mode === 'duplex'
								? 'unfilled'
								: 'unfilled dashed'
						}
						d={d_string}
						stroke="currentcolor"
						strokeWidth={
							connector_template.mode === 'duplex'
								? '3px'
								: '1px'
						}
					/>

					{(!metadata || !metadata.encryption) && connector_template.mode === 'duplex' ? (
						<path
							className="offwhitestroked"
							d={d_string}
							strokeWidth="2px"
						/>
					) : (
						undefined
					)}

					{metadata && metadata.dns ? (
						<path
							d={helpers.lineToSVGString(dns_path, dir, true)}
							stroke="currentcolor"
						/>
					) : (
						undefined
					)}

					{metadata &&
					metadata.encryption ? (
						<g>
							<path
								data-js={'squiggle_' + id + 'a'}
								strokeWidth="2px"
								className="paperstroked"
							/>
						</g>
					) : (
						undefined
					)}

					<circle
						className="hoverShow add"
						cx={center.left}
						cy={center.top}
						r="6"
					/>
				</svg>

				{metadata && metadata.dns ? (
					<dl
						className="dns-label"
						title={metadata.dns}
						style={{
							left: dns_path[1][0] - 2,
							marginTop: dns_path[1][1]
						}}
					>
						<dt style={{ borderColor: metadata.color }}>dns:</dt>
						<dd style={{ borderColor: metadata.color }}>
							{metadata.dns}
						</dd>
					</dl>
				) : (
					''
				)}
			</div>
		);
	}
}

export default dndHelper.composeDrop(Connector);