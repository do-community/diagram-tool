import React from 'react';
import MenuButton from './MenuButton';

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
		let { name, switchToMenu } = this.props;

		return (
			<span>
				<div className="diagramMetadata hoverParent do-bulma">
					<input type="text" className="input" onChange={this.handleChange} name="name" value={name || ''} placeholder="Diagram name" />
					<div style={{marginTop: '20px', marginLeft: 'calc(50% - 30px)'}}>
						<MenuButton switchToMenu={switchToMenu} />
					</div>
				</div>
			</span>
		);
	}
}

export default DiagramMetadata;
