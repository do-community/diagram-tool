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
        original: 'https://i.imgur.com/3Wils1I.png',
        thumbnail: 'https://i.imgur.com/3Wils1I.png',
        name: 'Empty Diagram',
        diagram: {metadata: {}, nodes: {}, connectors: []},
        categoryNames: {},
    },
    {
        original: 'https://i.imgur.com/HhY4dC8.png',
        thumbnail: 'https://i.imgur.com/HhY4dC8.png',
        name: 'Basic Load Balanced Web Application',
        diagram: {'metadata':{},'nodes':{'749e0e8806a7':{'type':'user','metadata':{'name':'','favicon':'','color':'','categories':[]},'position':[-76,100]},'c2fbadd17b9a':{'type':'dns','metadata':{'categories':[]},'position':[156,100]},'b047a55e97fa':{'type':'loadBalancer','metadata':{'name':'','algo':'round-robin','categories':['0.5557812199342425']},'position':[452,100]},'c65587e73e18':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.07019076050782602','0.07019076050782602','0.5557812199342425'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[732,180]},'c1e31741c0d7':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.07019076050782602','0.07019076050782602','0.5557812199342425'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[732,36]}},'connectors':[{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['c2fbadd17b9a','749e0e8806a7']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['b047a55e97fa','c2fbadd17b9a']},{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['b047a55e97fa','c65587e73e18']},{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['b047a55e97fa','c1e31741c0d7']}],'categoryNames':{}},
        categoryNames: {'0.07019076050782602':'Web','0.5557812199342425':'Application'},
    },
    {
        original: 'https://i.imgur.com/iK7wHRQ.png',
        thumbnail: 'https://i.imgur.com/iK7wHRQ.png',
        name: 'Load Balanced Web Application (with Postgres Database and DigitalOcean Spaces)',
        diagram: {'metadata':{},'nodes':{'962c50392931':{'type':'loadBalancer','metadata':{'name':'','algo':'round-robin','categories':['0.8928598543028063']},'position':[363,152]},'c7b9504eb28d':{'type':'spaces','metadata':{'name':'','edge':true,'private':true,'categories':[]},'position':[363,280]},'695dfb648ae4':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.22736149417137885','0.22736149417137885','0.8928598543028063'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[715,72]},'529dc850b472':{'type':'droplet','metadata':{'name':'','agent':false,'privateNetwork':false,'enableIpv6':false,'backups':false,'image':'Ubuntu 16.04.4 x64','size':'s-4vcpu-8gb','categories':['0.22736149417137885','0.22736149417137885','0.8928598543028063'],'tags':'','cloudFirewall':'disabled','scale':1},'position':[712,342]},'a7408a9cf652':{'type':'postgresServer','metadata':{'name':'','agent':true,'backups':true,'privateNetwork':true,'categories':['0.8928598543028063']},'position':[827,200]},'1eed2f16cfb1':{'type':'spaces','metadata':{'name':'','edge':true,'private':true,'categories':[]},'position':[91,280]},'8d8475606b51':{'type':'dns','metadata':{},'position':[91,152]},'42ce4c52ef1d':{'type':'user','metadata':{'name':'','favicon':'','color':''},'position':[-88,218]}},'connectors':[{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['a7408a9cf652','529dc850b472']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['a7408a9cf652','695dfb648ae4']},{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['962c50392931','529dc850b472']},{'type':'https','metadata':{'port':443,'encryption':'TLS','color':'#2ecc71'},'between':['962c50392931','695dfb648ae4']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['529dc850b472','c7b9504eb28d']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['c7b9504eb28d','1eed2f16cfb1']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['962c50392931','8d8475606b51']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['42ce4c52ef1d','8d8475606b51']},{'type':'tcp','metadata':{'port':9000,'encryption':'','color':'#0069ff'},'between':['42ce4c52ef1d','1eed2f16cfb1']}],'categoryNames':{}},
        categoryNames: {'0.22736149417137885':'Web','0.8928598543028063':' '},
    },
];

export default class NewDiagramPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 0, galleryRef: React.createRef()};
    }

    render() {
        return <span className="do-bulma">
            <h3 className='title is-3' style={{textAlign: 'center', marginTop: '50px'}}>
                New Diagram
            </h3>
            <p style={{textAlign: 'center'}}>{diagrams[this.state.page].name}</p>
            <ImageGallery
                className="gallery-container"
                items={diagrams}
                showFullscreenButton={false}
                showPlayButton={false}
                ref={this.state.galleryRef}
                onClick={() => {
                    localStorage.setItem('diagramToolState', JSON.stringify(diagrams[this.state.page].diagram));
                    localStorage.setItem('diagramToolCategoryNames', JSON.stringify(diagrams[this.state.page].categoryNames));     
                    localStorage.setItem('diagramToolFirstBoot', 'false');               
                    this.state.galleryRef.current.pause();
                    window.location.reload();
                }}
                onSlide={page => this.setState({page})}
            />
            {this.props.nodeCount === 0 ? undefined : <p style={{marginBottom: '50px', textAlign: 'center'}}>
                <a className="button is-primary" onClick={() => this.props.switchToMain()}>Return to Diagram Editor</a>
            </p>}
        </span>;
    }
}
