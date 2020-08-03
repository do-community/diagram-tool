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
import ImageGallery from 'react-image-gallery';

const diagrams = [
    {
        original: 'https://i.imgur.com/lPrlNOd.png',
        thumbnail: 'https://i.imgur.com/lPrlNOd.png',
        name: 'Empty Diagram',
        diagram: {metadata: {}, nodes: {}, connectors: []},
        categoryNames: {},
    },
    {
        original: 'https://i.imgur.com/WmgKuZC.png',
        thumbnail: 'https://i.imgur.com/WmgKuZC.png',
        name: 'Basic Load Balanced Diagram',
        diagram: {"metadata":{},"nodes":{"4b28a432ec0d":{"type":"droplet","metadata":{"name":"","agent":false,"privateNetwork":false,"enableIpv6":false,"backups":false,"image":"Ubuntu 16.04.4 x64","size":"s-4vcpu-8gb","categories":["0.5847962391512074"],"tags":"","cloudFirewall":"disabled","scale":1},"position":[10,78]},"ffba2249ff75":{"type":"loadBalancer","metadata":{"name":"","algo":"round-robin","categories":["0.5847962391512074"]},"position":[280,210]},"fc9705169e82":{"type":"droplet","metadata":{"name":"","agent":false,"privateNetwork":false,"enableIpv6":false,"backups":false,"image":"Ubuntu 16.04.4 x64","size":"s-4vcpu-8gb","categories":["0.5847962391512074"],"tags":"","cloudFirewall":"disabled","scale":1},"position":[477,58]}},"connectors":[{"type":"https","metadata":{"port":443,"encryption":"TLS","color":"#2ecc71"},"between":["ffba2249ff75","4b28a432ec0d"]},{"type":"https","metadata":{"port":443,"encryption":"TLS","color":"#2ecc71"},"between":["fc9705169e82","ffba2249ff75"]}],"categoryNames":{}},
        categoryNames: {"0.5847962391512074":"Application"},
    },
];

export default class NewDiagramPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 0, galleryRef: React.createRef()};
    }

    render() {
        return <span>
            <p style={{textAlign: 'center', marginBottom: '10px', marginTop: '15px'}}>
                New Diagram
            </p>
            <p style={{marginBottom: '50px'}}>
                <a className="button is-primary" onClick={() => this.props.switchToMain()}>Return to Main Menu</a>
            </p>
            <h3 className='title is-3' style={{textAlign: 'center'}}>
                {diagrams[this.state.page].name}
            </h3>
            <ImageGallery
                className="gallery-container"
                items={diagrams}
                showFullscreenButton={false}
                ref={this.state.galleryRef}
                onPlay={index => {
                    localStorage.setItem('diagramToolState', JSON.stringify(diagrams[index].diagram));
                    localStorage.setItem('diagramToolCategoryNames', JSON.stringify(diagrams[index].categoryNames));                    
                    this.state.galleryRef.current.pause();
                    window.location.reload();
                }}
                onSlide={page => this.setState({page})}
            />
        </span>;
    }
}
