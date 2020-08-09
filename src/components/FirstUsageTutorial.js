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

class KeybindInfo extends React.Component {
    render() {
        return <span>
           <p style={{marginBottom: '5px'}}>
                <span style={{border: '1px solid', borderColor: 'black', marginRight: '5px', padding: '1px'}}>
                    {this.props.keyName}
                </span>
                {this.props.description}
            </p>
        </span>;
    }
}

export default class FirstUsageTutorial extends React.Component {
    constructor(props) {
        super(props);
        const keybinds = [
            [' S ', 'Snap node based on selection or connectors'],
            [' < ', 'Move selected node(s) left'],
            [' > ', 'Move selected node(s) right'],
            [' ∧ ', 'Move selected node(s) up'],
            [' ∨ ', 'Move selected node(s) down'],
            ['SHIFT', 'Select multiple nodes'],
        ];
        this.mounted = false;
        this.getWindowSize();
        this.state.keybinds = keybinds;
        window.addEventListener('resize', this.getWindowSize.bind(this));
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getWindowSize() {
        const edits = {width: window.innerWidth, height: window.innerHeight};
        if (this.mounted) this.setState(edits);
        else this.state = edits;
    }

    render() {
        return <span>
            <span style={{
                position: 'absolute',
                textAlign: 'center',
                left: `${this.state.width / 2}px`,
                WebkitTransform: 'translate(-50%, -50%)',
                top: `${this.state.height / 2}px`,
            }}>
                <h1 className="title is-1">To start, simply click on a blank place on the screen to open the node selector.</h1>
            </span>
            <span style={{border: '1px solid', borderColor: 'black', padding: '5px', position: 'absolute', margin: '5px'}}>
                {
                    this.state.keybinds.map(v => <KeybindInfo keyName={v[0]} description={v[1]} key={v[0]} />)
                }
            </span>
        </span>;
    }
}
