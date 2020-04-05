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
		let {name, description} = this.props;

		return (
			<div className="diagramMetadata hoverParent">
				<input type="text" onChange={this.handleChange} name="name" value={name || ''} />
				<br/>
				<textarea onChange={this.handleChange} name="description" value={description}>{description}</textarea>
			</div>
		);
	}
}

export default DiagramMetadata;