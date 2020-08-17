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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';

export default class SaveDiagramPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleQuery() {
        const l = window.localStorage.getItem('diagramToolState');
        return l ? btoa(l) : null;
    }

    generateUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set('q', this.handleQuery());
        return String(url);
    }

    saveDiagram() {
        navigator.clipboard.writeText(this.generateUrl());
    }

    render() {
        return <span className="do-bulma diagram-tool">
            <h3 className='title is-3' style={{textAlign: 'center', marginTop: '50px'}}>
                Save Diagram
            </h3>
            <div className="input-container">
                <i style={{marginTop: '-2px', cursor: 'pointer'}}>
                    <FontAwesomeIcon icon={faPaste} onClick={() => this.saveDiagram()} />
                </i>
                <input
                    className="input"
                    type="text"
                    placeholder="URL"
                    style={{'cursor': 'default'}}
                    value={this.generateUrl()}
                    readOnly={true}
                />
            </div>
            <p style={{marginBottom: '50px', textAlign: 'center'}}>
                <a className="button is-primary" onClick={() => this.props.switchToMain()}>Return to Diagram Editor</a>
            </p>
        </span>;
    }
}
