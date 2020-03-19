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
				<h1 contentEditable="true" onChange={this.handleChange}>{name}</h1>
				<br/>
				<textarea onChange={this.handleChange} name="description" value={description}>{description}</textarea>
			</div>
		);
	}
}

export default DiagramMetadata;