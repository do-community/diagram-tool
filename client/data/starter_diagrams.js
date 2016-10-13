const starter_diagrams = [
  {
    diagram_metadata: {
      slug: 'single-droplet-webserver',
      name: 'Single Droplet Webserver',
      description: 'A single droplet hosting a web server listening for HTTP connections.'
    },
    connectors: [
      {
        type:'https',
        customization:{},
        between:[0,1]
      },
      {
        type:'https',
        customization:{},
        between:[1,2]
      },
      {
        type:'https',
        customization:{
          active: false
        },
        between:[1,3]
      },
      {
        type:'tcp',
        customization:{},
        between:[2,4]
      },
      {
        type:'tcp',
        customization:{},
        between:[3,5]
      },
      {
        type:'db_replication',
        customization:{
          arrows:[0,3]
        },
        between:[4,5]
      }
    ],
    nodes: [
      {
        type: 'browser',
        customization: '',
        position:[-3,0]
      },
      {
        type: 'floating_ip',
        customization: '',
        position:[-1,0]
      },
      {
        type: 'app_server',
        customization: '',
        position:[1,1]
      },
      {
        type: 'app_server',
        customization: '',
        position:[1,-1]
      },
      {
        type: 'db_server',
        customization: '',
        position:[3,1]
      },
      {
        type: 'db_server',
        customization: '',
        position:[3,-1]
      },
      {
        type: 'monitor',
        customization: '',
        position:[0,-3]
      }
    ]
  }
];

export default starter_diagrams;
