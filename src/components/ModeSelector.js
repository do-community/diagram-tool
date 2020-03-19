import React from 'react';

class ModeSelector extends React.Component {
	render () {
		return (
			<ul className="bui-Tabs bui-Tabs-list modeSelector">
				{this.props.modes.map((m) => <li key={m} className={this.props.mode === m ? 'bui-u-mr--medium active' : 'bui-u-mr--medium'}><a data-tab>{m}</a></li>)}
			</ul>
		);
	}
};

export default ModeSelector
