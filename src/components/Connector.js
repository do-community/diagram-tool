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

import React from 'react';
import dndHelper from '../dndHelper.js';

import helpers from '../helpers.js';

class Connector extends React.Component {
	render() {
		const {
			connectorTemplate,
			id,
			metadata,
			between,
			connectDropTarget
		} = this.props;

		let pos, viewBox, path, w, h, dir, dnsPath;

		/* If connector is connected to nodes, calculate how to draw the line */

		let invert, start, end, sectionStyle;
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
			sectionStyle = metadata.style && metadata.style === 'angular' ? 3 : 2;
			h = Math.abs(end[1] - start[1]);
			w = Math.abs(end[0] - start[0]);
			dir = 'v';


			// v - vertical
			if (start[0] == end[0]) {
				w = 20;
				h -= 69;
				pos = {
					left: start[0] + 40 + 'px',
					top:
						(((start[1] < end[1] ? start[1] : end[1]) + 1)) - 18 +
						'px',
					width: '20px',
					height: h + 'px'
				};
				path = [[w / 2, 0], [w / 2, h + 3]];
				viewBox = '0 0 ' + w + ' ' + h;
				dnsPath = [[w - 2, 0], [w - 2, 20]];
			} else if (start[1] == end[1]) {
				dir = 'h'; // h - horizontal
				h = 12;
				w -= 64;
				pos = {
					left: (start[0] + 1) - 18 + 'px',
					top:
						((start[1] < end[1] ? start[1] : end[1])) + 38 + 'px',
					width: w + 'px',
					height: '30px'
				};
				path = [[0, 12], [w + 3, 12]];
				viewBox = '0 0 ' + w + ' 30';
				dnsPath = [[0, 2], [12, 2]];
			} else if (w >= h) {
				w -= 64;
				h += 20;
				// if connector travels further in x than in y
				pos = {
					left: (start[0] + 92) - 10 + 'px',
					top:
						(start[1] < end[1] ? start[1] : end[1]) +
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
						[w / sectionStyle, h - 12],
						[w - (w / sectionStyle), 12],
						[w + 3, 12]
					];
					dnsPath = [[0, h], [10, h]];
				} else {
					// ht - horizontal, top to bottom (left to right)
					path = [
						[0, 12],
						[w / sectionStyle, 12],
						[w - (w / sectionStyle), h - 12],
						[w + 3, h - 12]
					];
					dnsPath = [[0, 0], [15, 0]];
				}
			} else {
				h -= 48;
				w += 10;
				// if connector travels further in y than x
				pos = {
					left: start[0] + 50 + 'px',
					top:
						((start[1] < end[1] ? start[1] : end[1]) + 82) +
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
						[3, h - (h / sectionStyle)],
						[w - 13, h / sectionStyle],
						[w - 13, -3]
					];
					dnsPath = [[w - 1, 0], [w - 1, 20]];
				} else {
					path = [
						[3, 0],
						[3, h / sectionStyle],
						[w - 13, h - (h / sectionStyle)],
						[w - 13, h + 3]
					];
					dnsPath = [[10, 0], [10, 20]];
				}
			}
		}

		const center = { left: w / 2, top: h / 2 },
			dString = helpers.lineToSVGString(
				path,
				dir,
				!('opacity' in connectorTemplate),
				connectorTemplate.metadata.style || null
			);

		pos.zIndex = Math.round(100 * ('opacity' in connectorTemplate) ? connectorTemplate.opacity : 1);
		pos.opacity = ('opacity' in connectorTemplate) ? connectorTemplate.opacity : 1;

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
					{connectorTemplate.name}
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
						d={dString}
						strokeWidth="5px"
					/>
					<path
						className={
							connectorTemplate.mode === 'duplex'
								? 'unfilled'
								: 'unfilled dashed'
						}
						d={dString}
						stroke="currentcolor"
						strokeWidth={
							connectorTemplate.mode === 'duplex'
								? '3px'
								: '1px'
						}
					/>

					{(!metadata || !metadata.encryption) && connectorTemplate.mode === 'duplex' ? (
						<path
							className="offwhitestroked"
							d={dString}
							strokeWidth="2px"
						/>
					) : (
						undefined
					)}*/}

					{metadata && metadata.dns ? (
						<path
							d={helpers.lineToSVGString(dnsPath, dir, true)}
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
							left: dnsPath[1][0] - 2,
							marginTop: dnsPath[1][1]
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
