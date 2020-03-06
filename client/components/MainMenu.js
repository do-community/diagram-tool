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
                <a className="button is-primary" onClick={() => this.saveDiagram()}>Save Diagram </a>
            </p>
        </div>;
        this.state = {innerContent: this.mainMenu};
    }

    newDiagram() {
        window.localStorage.removeItem("infragram_state");
        this.props.switchToApp();
    }

    handleQuery() {
        const l = window.localStorage.getItem("infragram_state");
        return l ? btoa(l) : null;
    }

    saveDiagram() {
        const url = new URL(window.location.href);
        url.searchParams.set('q', this.handleQuery());
        const innerContent = <div>
            <div className="field">
                <p>
                    The URL is <code>{String(url)}</code>.
                </p>
            </div>
            <div className="field">
                <p>
                    <a className="button is-primary" onClick={() => this.props.switchToApp()}>Return to Application</a>
                </p>
            </div>
        </div>;
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
