const DIAGRAMS = [
{
    metadata: {
      slug: 'single-droplet-webserver',
      name: 'Single Droplet Webserver',
      description: 'A single droplet hosting a web server listening for HTTP connections.'
    },
    connectors: [
      {
        type:'https',
        metadata:{
          dns:'sideproject.com'
        },
        between:[0,1]
      }
    ],
    nodes: [
      {
        type: 'browser',
        position:[-1,0]
      },
      {
        type: 'droplet',
        metadata: {region:'nyc3', memory:2},
        position:[1,0]
      }
    ]
  },
  {
    metadata: {
      slug: 'single-droplet-webserver',
      name: 'Single Droplet Webserver',
      description: 'A single droplet hosting a web server listening for HTTP connections.'
    },
    connectors: [
      {
        type:'https',
        metadata:{
          dns:'cutiegram.com'
        },
        between:[0,1]
      },
      {
        type:'https',
        metadata:{},
        between:[1,2]
      },
      {
        type:'https',
        metadata:{
        },
        between:[1,3]
      },
      {
        type:'tcp',
        metadata:{},
        between:[2,4]
      },
      {
        type:'tcp',
        metadata:{},
        between:[3,5]
      },
      {
        type:'replication',
        metadata:{
          arrows:[0,3]
        },
        between:[4,5]
      }
    ],
    nodes: [
      {
        type: 'browser',
        position:[-3,0]
      },
      {
        type: 'load_balancer',
        metadata: {region:'nyc3'},
        position:[-1,0]
      },
      {
        type: 'app_server',
        metadata: {region:'nyc3', memory:2, name:'App1'},
        position:[1,1]
      },
      {
        type: 'app_server',
        metadata: {region:'nyc3', memory:2, name:'App2'},
        position:[1,-1]
      },
      {
        type: 'db_server',
        metadata: {region:'nyc3', name:'DB1'},
        position:[3,1]
      },
      {
        type: 'db_server',
        metadata: {region:'nyc3', name:'DB2'},
        position:[3,-1]
      }
    ]
  },
  {
    metadata: {
      slug: 'devrant-setup',
      name: 'DevRant DigitalOcean Architecture',
      description: 'The DigitalOcean infrastructure that powers DevRant, a social network for developers.'
    },
    nodes: [
      {
        type: 'browser',
        position:[-2.5,-0.5],
        metadata:{
          name: 'main site',
          favicon: 'https://www.devrant.io/static/devrant/img/landing/favicon32.png',
          color: '#54556e'
        }
      },
      {
        type: 'floating_ip',
        metadata: {region:'nyc2'},
        position:[-0.5,-0.5]
      },
      {
        type: 'floating_ip',
        metadata: {region:'nyc2'},
        position:[-0.5,1.5]
      },
      {
        type: 'app_server',
        metadata: {name:'App Main', region:'nyc2', memory:8},
        position:[0.5,-0.5]
      },
      {
        type: 'worker_server',
        metadata: {name:'Worker', region:'nyc2', memory:2, scale: 0.85},
        position:[0.5,1.5]
      },
      {
        type: 'db_server',
        metadata: {name:'Neo4J-1', region:'nyc2', memory:8},
        position:[2,0.5]
      },
      {
        type: 'db_server',
        metadata: {name:'Neo4J-2', region:'nyc2', memory:8},
        position:[3.5,1]
      },
      {
        type: 'db_server',
        metadata: {name:'Neo4J-3', region:'nyc2', memory:8},
        position:[3.5,0]
      },
      {
        type: 'cache_server',
        metadata: {name:'Redis Cache', region:'nyc2', memory:1, scale: 0.75},
        position:[0.5,0.5]
      },
      {
        type: 'log_server',
        metadata: {name:'Graylog', region:'nyc2', memory:8},
        position:[2,2]
      },
      {
        type: 'browser',
        position:[-2.5,1.5],
        metadata:{
          name: 'sub-sites',
          favicon: 'https://www.devrant.io/static/devrant/img/landing/favicon32.png',
          color: '#54556e'
        }
      },
    ],
    connectors: [
      {
        type:'https',
        metadata:{
          dns:'devrant.io'
        },
        between:[0,1]
      },
      {
        type:'https',
        metadata:{
          dns:'sub.devrant.io'
        },
        between:[10,2]
      },
      {
        type:'https',
        between:[1,3]
      },
      {
        type:'https',
        between:[2,4]
      },
      {
        type:'tcp',
        between:[4,5]
      },
      {
        type:'tcp',
        between:[3,5]
      },
      {
        type:'replication',
        between:[5,6]
      },
      {
        type:'replication',
        between:[6,7]
      },
      {
        type:'replication',
        between:[5,7]
      },
      {
        type:'tcp',
        between:[3,8]
      },
      {
        type:'tcp',
        between:[4,8]
      },
      {
        type:'udp',
        between:[3,9]
      },
      {
        type:'udp',
        between:[4,9]
      },
      {
        type:'udp',
        between:[5,9]
      },
      {
        type:'udp',
        between:[6,9]
      },
      {
        type:'udp',
        between:[7,9]
      }
    ]
  }
];

export default DIAGRAMS;
