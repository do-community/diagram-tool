/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
