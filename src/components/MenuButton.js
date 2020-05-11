import React from 'react';

export default class MenuButton extends React.Component {
    render() {
        return <span style={{position: 'absolute'}} className="do-bulma infragram">
            <a className="button is-info" onClick={this.props.switchToMenu}>
                Menu
            </a>
        </span>;
    }
}
