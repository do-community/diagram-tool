import React from 'react';
import ExternalLink from './ExternalLink';

export default class Landing extends React.Component {
    render() {
        // TODO: Project wide i18n.
        return <div className="landing">
            <div className="background-top">{this.props.backgroundTop}</div>
            <div className="background-bottom">{this.props.backgroundBottom}</div>
            <div className="container">
                <h1>{ this.props.title }</h1>
                <p style={{fontSize: "initial"}} dangerouslySetInnerHTML={{__html: this.props.description}}></p>

                {this.props.innerContent}

                <ExternalLink
                    className="github-link"
                    text="View this tool on GitHub"
                    link={this.props.github}
                />
            </div>
        </div>;
    }
}
