import React from 'react';

class NodeEditorField extends React.Component {

			constructor(props) {
			    super(props);
			    this.handleChange = this.handleChange.bind(this);
			    this.input_from_specs = this.input_from_specs.bind(this);
			}

			handleChange(e) {
				console.log(e, this);
				this.props.editAction(this.props.identifier, {[e.target.id]:e.target.value});
			}

			input_from_specs(name, value, specs) {
				switch(specs.type) {
				    case 'string' :
				      return (<input
				      			id={name}
				      			type="text"
				      			value={value}
				      			onChange={this.handleChange}
				      			maxLength={'validation' in specs && typeof(specs.validation[1]) === 'number' ? specs.validation[1] : ''}
				      		/>);
				    case 'number' :
				      return (<input
				      			id={name}
				      			type="number"
				      			value={value}
				      			min={'validation' in specs && typeof(specs.validation[0]) === 'number' ? specs.validation[0] : ''}
				      			max={'validation' in specs && typeof(specs.validation[1]) === 'number' ? specs.validation[1] : ''}
				      			onChange={this.handleChange}
				      		/>);
				    case 'boolean' :
				      return (<input
				      			id={name}
				      			type="checkbox"
				      			checked={value}
				      			onChange={this.handleChange}
				      		/>);
				    case 'color':
				      return (<input
				      			id={name}
				      			type="color"
				      			value={value}
				      			onChange={this.handleChange}
				      		/>);
				    default:
				      return (<input
				      			id={name}
				      			type="text"
				      			value={value}
				      			onChange={this.handleChange}
				      		/>);
				  }
			}

			render() {
				const { name, value, specs } = this.props;
				return (
						<p>
							<label htmlFor={name}>{name}</label>
							{this.input_from_specs(name, value, specs)}
						</p>
				);
			}
		};

export default NodeEditorField;
