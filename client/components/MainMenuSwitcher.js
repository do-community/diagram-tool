import React from 'react';
import MainMenu from './MainMenu';
import App from './App';

export default class MainMenuSwitcher extends React.Component {
    constructor(props) {
        super(props)
        this.menu = <MainMenu {...this.props} switchToApp={() => this.switchToApp()} />
        this.app = <App {...this.props} switchToMenu={() => this.switchToMenu()} />
        this.state = {item: this.app}
        this.firstLoad = true

        // TODO: Should probably think of a better solution here.
        const m = this;
        window.switchToApp = this.switchToApp.apply(m);
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
