import React from 'react';

export default class ExternalLink extends React.Component {
    constructor(props) {
        super(props);
        this.url = props.url;
        this.text = props.text;
    }

    render() {
        return <span>
            <a
                href={this.url}
                target="_blank"
                rel="noreferrer"
                text={this.text}
            />
            <i className="fas fa-external-link-alt"></i>
        </span>;
    }
}
