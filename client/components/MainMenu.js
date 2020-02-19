import React from 'react';

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1><a onClick={this.props.switchToApp}>switch to design panel</a></h1>;
    }
}
