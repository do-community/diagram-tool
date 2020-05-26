/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';

class ArrayInput extends React.Component {
	constructor(props) {
		super(props);
		const arr = this.props.value.slice();
		arr.push('');
		this.state = {values: arr};
	}

	handleChange(e, index) {
		// If the index isn't -1, update the index.
		if (index !== -1) this.state.values[index] = e.target.value;

		// Set the values that aren't blank strings.
		const values = [];
		for (const v of this.state.values) {
			if (v !== '') values.push(v);
		}

		// Push everything into the props.
		this.props.value.length = 0;
		for (const v of values) this.props.value.push(v);

		// Add a blank string to the end and set the state.
		values.push('');
		this.setState({values});

		// Run edit action on this.
		this.props.editAction(this.props.identifier, {
			[this.props.name]: this.props.value,
		});
	}

	render() {
		const arr = this.state.values.map((val, index) => <div key={index}>
			<input
				type="text"
				className="input"
				value={val}
				onChange={e => this.handleChange(e, index)}
				placeholder={this.props.title}
				key={index}
				autoComplete="on"
				style={{width: '200px', height: '40px'}}
			/>
		</div>);
		return <span>
			<label htmlFor={this.props.name}>{this.props.title}: </label>
			{arr}
		</span>;
	}
}

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
			case 'array':
				return <ArrayInput title={specs.title} name={name} value={value} onChange={this.handleChange} identifier={this.props.identifier} editAction={this.props.editAction} />;
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
