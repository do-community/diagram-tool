import React from 'react';
import MainMenu from './MainMenu';
import Diagram from './Diagram';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

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
        this.state = {item: this.createAppInstance()}
    }

    createAppInstance() {
        const f = () => this.switchToMenu()
        const Connection = connect(mapStateToProps, mapDispatchToProps)(Diagram)
        return <Connection switchToApp={f} />
    }

    switchToMenu() {
        this.setState({item: this.menu})
    }

    switchToApp() {
        this.setState({item: this.createAppInstance()})
    }

    render() {
        // Return the item to render.
        return this.state.item
    }
}
