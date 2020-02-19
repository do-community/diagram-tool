import React from 'react';
import MainMenu from './MainMenu';
import App from './App';

export default class MainMenuSwitcher extends React.Component {
    constructor(props) {
        super(props)
        this.menu = <MainMenu {...this.props} switchToApp={() => this.switchToApp()} />
        this.app = <App {...this.props} switchToMenu={() => this.switchToMenu()} />
        this.state = {item: this.menu}
        this.firstLoad = true
    }

    switchToMenu() {
        this.setState({item: this.menu})
    }

    switchToApp() {
        this.setState({item: this.app})
    }

    render() {
        // Check if this is the first load.
        if (this.firstLoad) {
            // Set firstLoad to false.
            this.firstLoad = false

            // Check if the infragram state exists, and set the state to it if so.
            if (localStorage.getItem('infragram_state')) this.setState({item: this.app})
        }

        // Return the item to render.
        return this.state.item
    }
}
