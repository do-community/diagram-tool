import React from 'react';
import dndHelper from '../dndHelper.js';

class TrayNode extends React.Component {
	render(){
		const {id, connectDragSource} = this.props;
		return connectDragSource(
				<li key={id} data-type={id} data-click_key={id} data-category="node" data-ondoubleclick="add" className="small">
					<svg>
						<use className="paper" xlinkHref={('#' + id)} />
					</svg>
					<label>{id}</label>
				</li>
		);
	}
};

export default dndHelper.composeDrag('node', 'add', TrayNode);
