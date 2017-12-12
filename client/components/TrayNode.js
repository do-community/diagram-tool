import React from 'react';
import dndHelper from '../dndHelper.js';

class TrayNode extends React.Component {
	render(){
		const {id, connectDragSource} = this.props;
		return connectDragSource(
				<li key={id} data-type={id} data-category="node" className="small">
					<svg>
						<use xlinkHref={('#' + id)} />
					</svg>
				</li>
		);
	}
};

export default dndHelper.composeDrag('node', 'add', TrayNode);
