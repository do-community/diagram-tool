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

const images = [
    {
        original: 'https://i.imgur.com/lPrlNOd.png',
        thumbnail: 'https://i.imgur.com/lPrlNOd.png',
        name: 'Empty Diagram',
        diagram: {metadata: {}, nodes: {}, connectors: [], categoryNames: {}},
    },
];

export default class NewDiagramPage extends React.Component {
    render() {
        return <span>
            <h2 className='title is-2' style={{textAlign: 'center'}}>
                New Diagram
            </h2>
            <p>Please select the new diagram type you want:</p>
            <p>
                    <a className="button is-primary" onClick={() => this.props.switchToMain()}>Return to Main Menu</a>
                </p>
            <ImageGallery
                items={images}
                showFullscreenButton={false}
                ref={this.galleryRef}
                onPlay={index => {
                    localStorage.setItem('diagramToolState', JSON.stringify(images[index].diagram));
                    window.location.reload();
                }}
            />
        </span>;
    }
}
