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
import MenuButtons from './MenuButtons';

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
		let { name, switchToNew, switchToSave, nodes } = this.props;
		const len = Object.keys(nodes).length;

		return (
			<span>
				<div className="diagramMetadata hoverParent do-bulma">
					<div style={{marginTop: '20px', marginLeft: 'calc(50% - 30px)'}}>
						<div style={{marginRight: '80px'}}>
							<input type="text" className="input" onChange={this.handleChange} name="name" value={name || ''} style={{marginBottom: '20px'}} placeholder="Diagram name" />
						</div>
						<MenuButtons switchToNew={() => switchToNew(len)} switchToSave={switchToSave} />
					</div>
				</div>
			</span>
		);
	}
}

export default DiagramMetadata;
