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
import MainMenu from './MainMenu';
import Diagram from './Diagram';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { clear } from '../showWhereClick';

function mapStateToProps(state) {
    return {
        metadata: state.metadata,
        connectors: state.connectors,
        nodes: state.nodes,
        selection: state.selection,
        mode: state.mode
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default class MainMenuSwitcher extends React.Component {
    constructor(props) {
        super(props)
        this.menu = <MainMenu {...this.props} switchToApp={() => this.switchToApp()} />
        this.state = {item: this.menu}
    }

    createAppInstance() {
        const f = () => this.switchToMenu()
        const m = () => this.switchToMenu()
        const Connection = connect(mapStateToProps, mapDispatchToProps)(Diagram)
        return <Connection switchToApp={f} switchToMenu={m} />
    }

    switchToMenu() {
        clear();
        this.setState({item: this.menu});
    }

    switchToApp() {
        this.setState({item: this.createAppInstance()})
    }

    render() {
        // Return the item to render.
        return this.state.item
    }
}
