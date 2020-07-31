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
        original: 'https://i.imgur.com/erhPjMF.png',
        thumbnail: 'https://i.imgur.com/erhPjMF.png',
        name: 'Basic Load Balanced Diagram',
        diagram: {'metadata':{},'nodes':{'ab5684ad3a71':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.848431795901802'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[0,-1.5]},'b2573051a59d':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.848431795901802'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[-5,1]},'a12a5d3d16ed':{'type':'loadBalancer','metadata':{'name':'','algo':'round-robin','categories':['0.848431795901802']},'position':[-2.5,0]}},'connectors':[{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['ab5684ad3a71','a12a5d3d16ed']},{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['b2573051a59d','a12a5d3d16ed']}],'categoryNames':{}},
        categoryNames: {'0.848431795901802': 'Application'},
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
