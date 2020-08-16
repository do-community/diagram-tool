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
import Diagram from './Diagram';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewDiagramPage from './NewDiagramPage';
import SaveDiagramPage from './SaveDiagramPage';
import * as actionCreators from '../actions/actionCreators';
import { clear } from '../showWhereClick';

function mapStateToProps(state) {
    return {
        metadata: state.metadata,
        connectors: state.connectors,
        nodes: state.nodes,
        selection: state.selection,
        mode: state.mode
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default class VisiblePageSwitcher extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('diagramToolFirstBoot') === 'false') this.state = {item: this.createAppInstance()};
        else this.switchToNew(0);
    }

    createAppInstance() {
        const x = n => this.switchToNew(n);
        const y = () => this.switchToSave();
        const Connection = connect(mapStateToProps, mapDispatchToProps)(Diagram);
        document.body.style.overflow = 'hidden';
        return <Connection switchToNew={x} switchToSave={y} />;
    }

    switchToNew(nodeCount) {
        window.scrollTo(0, 0);
        clear();
        document.body.style.overflow = 'initial';
        const diff = {item: <NewDiagramPage switchToMain={() => this.switchToApp()} nodeCount={nodeCount} />};
        if (this.state) this.setState(diff);
        else this.state = diff;
    }

    switchToSave() {
        window.scrollTo(0, 0);
        clear();
        document.body.style.overflow = 'initial';
        this.setState({item: <SaveDiagramPage switchToMain={() => this.switchToApp()} />});
    }

    switchToApp() {
        window.scrollTo(0, 0);
        this.setState({item: this.createAppInstance()});
    }

    render() {
        // Return the item to render.
        return this.state.item;
    }
}
