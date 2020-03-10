import React from 'react';
import MainMenu from './MainMenu';
import Diagram from './Diagram';

export default class MainMenuSwitcher extends React.Component {
    constructor(props) {
        super(props)
        this.menu = <MainMenu {...this.props} switchToApp={() => this.switchToApp()} />
        this.app =  <Diagram {...this.props} switchToMenu={() => this.switchToMenu()} />
        this.state = {item: this.app}
        this.firstLoad = true
    }

    switchToMenu() {
        this.setState({item: this.menu})
    }

    switchToApp() {
        this.setState({item: this.app})
    }

    render() {
        // Return the item to render.
        return this.state.item
    }
}
