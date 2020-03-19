import React from 'react';
import dndHelper from '../dndHelper.js';

class ConnectorDragHandle extends React.Component {
  render(){
		const {dir, connectDragSource} = this.props;
		return connectDragSource(
			<div className={dir + ' hoverShow drag'}></div>
		);
	}
};

export default dndHelper.composeDrag('connector', 'add', ConnectorDragHandle);