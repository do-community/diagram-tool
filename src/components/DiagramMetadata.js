import React from 'react';

class DiagramMetadata extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.editAction({
			[e.target.name]: e.target.value
		});
	}

	render() {
		let {name} = this.props;

		return (
			<div className="diagramMetadata hoverParent do-bulma">
				<input type="text" className="input" onChange={this.handleChange} name="name" value={name || ''} placeholder="Diagram name" />
			</div>
		);
	}
}

export default DiagramMetadata;
