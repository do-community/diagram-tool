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
			case 'string':
				return (
					<div className="bui-FloatLabel">
						<label htmlFor={name}>{specs.title}: </label>
						<input
							id={name}
							type="text"
							value={value || ''}
							onChange={this.handleChange}
							maxLength={
								'validation' in specs && typeof specs.validation[1] === 'number'
									? specs.validation[1]
									: ''
							}
							placeholder={name}
						/>
					</div>
				);
			case 'number':
				return (
					<div className="bui-FloatLabel">
						<label htmlFor={name}>{specs.title}: </label>
						<input
							id={name}
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
							placeholder={name}
						/>
					</div>
				);
			case 'boolean':
				return (
					<div className="bui-Checkbox">
						<label htmlFor={name}>{specs.title}: </label>
						<input
							id={name}
							type="checkbox"
							checked={value}
							onChange={this.handleChange}
							placeholder={name}
						/>
					</div>
				);
			case 'select':
				return (
					<div className="bui-FloatLabel bui-Select">
						<label htmlFor={name} style={{opacity:1, top:0}} >{specs.title}: </label>
						<select
							id={name}
							onChange={this.handleChange}
							value={value || ''}
							style={{'paddingTop':'14px'}}
						>
							{specs.validation.map((o,i) => <option value={o} key={'opt_'+o+'_'+i}>{o}</option>)}
						</select>
					</div>
				);
			case 'color':
				return (
					<input
						id={name}
						type="color"
						value={value || ''}
						onChange={this.handleChange}
						placeholder={name}
					/>
				);
			default:
				return (
					<input
						id={name}
						type="text"
						value={value || ''}
						onChange={this.handleChange}
						placeholder={name}
					/>
				);
		}
	}

	render() {
		const { name, value, specs } = this.props;
		return 	this.inputFromSpecs(name, value, specs);
	}
}

export default NodeEditorField;