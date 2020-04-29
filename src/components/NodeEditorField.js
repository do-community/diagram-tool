import React from 'react';

class NodeEditorField extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.inputFromSpecs = this.inputFromSpecs.bind(this);
	}

	handleChange(e) {
		//console.log(e, this);
		this.props.editAction(this.props.identifier, {
			[e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
		});
	}

	inputFromSpecs(name, value, specs) {
		switch (specs.type) {
			case 'number':
				return (
					<div className="bui-FloatLabel">
						<label htmlFor={name}>{specs.title}: </label>
						<input
							id={name}
							className="input"
							type="number"
							value={value || ''}
							min={
								'validation' in specs && typeof specs.validation[0] === 'number'
									? specs.validation[0]
									: ''
							}
							max={
								'validation' in specs && typeof specs.validation[1] === 'number'
									? specs.validation[1]
									: ''
							}
							onChange={this.handleChange}
							placeholder={specs.title}
							style={{width: '200px', height: '40px'}}
						/>
					</div>
				);
			case 'boolean':
				return (
					<label htmlFor={name} className="checkbox">
						{specs.title}:
						<input
							id={name}
							type="checkbox"
							style={{opacity: 1, marginLeft: '5px'}}
							checked={value}
							onChange={this.handleChange}
							placeholder={name}
						/>
					</label>
				);
			case 'select':
				return (
					<div className="bui-FloatLabel bui-Select">
						<label htmlFor={name} style={{opacity:1, top:0}} >{specs.title}: </label>
						<br />
						<select
							id={name}
							onChange={this.handleChange}
							value={value || ''}
							style={{'paddingTop':'14px'}}
							className="select"
						>
							{specs.validation.map((o,i) => <option value={o} key={'opt_'+o+'_'+i}>{o}</option>)}
						</select>
					</div>
				);
			case 'color':
				return (
					<div className="bui-FloatLabel bui-Select">
						<label htmlFor={name} style={{opacity:1, top:0}} >{specs.title}: </label>
						<br />
						<input
							id={name}
							type="color"
							value={value || ''}
							onChange={this.handleChange}
							style={{width: '100px'}}
							placeholder={name}
						/>
					</div>
				);
			default:
				return (
					<div className="bui-FloatLabel">
						<label htmlFor={name}>{specs.title}: </label>
						<input
							id={name}
							type="text"
							className="input"
							value={value || ''}
							onChange={this.handleChange}
							maxLength={
								'validation' in specs && typeof specs.validation[1] === 'number'
									? specs.validation[1]
									: ''
							}
							placeholder={specs.title}
							style={{width: '200px', height: '40px'}}
						/>
					</div>
				);
		}
	}

	render() {
		const { name, value, specs } = this.props;
		return <span className="infragram do-bulma"><br />{this.inputFromSpecs(name, value, specs)}</span>;
	}
}

export default NodeEditorField;
