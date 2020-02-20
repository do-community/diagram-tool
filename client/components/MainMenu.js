import React from 'react';
import Landing from './do-vue-ports/Landing';

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.mainMenu = <div className="container">
            <p style={{marginBottom: "20px", fontSize: "initial"}}>
                Select how you wish to proceed.
            </p>
            <p style={{fontSize: "initial"}}>
                <a className="button is-primary" onClick={() => this.newDiagram()} style={{marginRight: "5px"}}>New Diagram </a>
                <a className="button is-primary" onClick={() => this.loadDiagram()}>Load Diagram </a>
            </p>
        </div>;
        this.state = {innerContent: this.mainMenu};
    }

    newDiagram() {
        this.props.switchToApp();
    }

    loadDiagram() {
        const innerContent = <h1>Hello World!</h1>;
        this.setState({innerContent});
    }

    render() {
        return <div className="do-bulma">
            <Landing
                backgroundTop={<span></span>}
                backgroundBottom={<span></span>}
                title="Infragram"
                description="A tool to create infrastructure diagrams."
                innerContent={this.state.innerContent}
                github="https://github.com/do-community/infragram"
            />
        </div>;
    }
}
