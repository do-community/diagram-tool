const NODES = {

  "browser": {
    name: "Browser (User)",
    short_name: "Browser",
    description: "the end-user, communicating via a web browser",
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:{type:'https', metadata:{dns:'example.com'}}},
        {node_types:['cdn'], via:{type:'https', metadata:{'dns':'cdn.example.com'}}}
      ],
      connection_limitations:['https', 'http', 'websocket'],
      incompatible_with: ['iot_device', 'mobile'],
      can_create_requests: true,
      min_connections: 1,
      regionless: true
    }
  },

  "mobile": {
    name: "Mobile App (User)",
    short_name: "Mobile",
    description: "the end user, communicating via a mobile app",
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:{type:'https', metadata:{'dns':'example.com'}}},
        {node_types:['cdn'], via:{type:'https', metadata:{'dns':'cdn.example.com'}}}
      ],
      incompatible_with: ['iot_device', 'browser'],
      connection_limitations:['http', 'https', 'udp', 'websockets'],
      can_create_requests: true,
      min_connections: 1,
      regionless: true
    }
  },

  "floating_ip": {
    name: "Floating IP",
    short_name: "fl-IP",
    description: "an IP address that can be assigned and reassigned to a single droplet",
    metadata: {
      ip: '',
      edge: true,
      cost: 0,
      scale: 0.7,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'browser', 'mobile', 'iot_device'], via: {type:'https'}},
        {node_types:['load_balancer', 'app_server', 'droplet'], via: {type:'https'}}
      ],
      connection_limitations:['https', 'http', 'websocket', 'udp'],
      min_connections: 2,
      max_connections: 2
    }
  },

  "load_balancer": {
    name: "Load Balancer",
    short_name: "LB",
    description: "reverse proxy that distributes network or application traffic across a number of servers",
    metadata: {
      algo: "round-robin",
      monitoring: true,
      edge: true,
      cost: 20,
      active: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['floating_ip', 'gateway', 'browser', 'mobile', 'iot_device'], via: {type:'https', metadata:{'dns':'example.com'}}},
        {node_types:['app_server'], via: {type:'https'}, all:true}
      ],
      connection_limitations:['https', 'http', 'tcp', 'websocket'],
      min_connections: 2
    }
  },

  "app_server": {
    name: "Application Server",
    short_name: "App",
    description: "a stateless server that processes incoming requests via an application and returns a response",
    extends: "droplet",
    metadata: {
      name: 'generic-app-server',
      tags: ['app'],
      agent: true,
      backups: true,
      private_network: true,
      ipv6: true,
      active: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['load_balancer', 'floating_ip','gateway', 'browser', 'mobile', 'iot_device'], via: {type:'https'}},
        {node_types:['db_server'], via: {type:'tcp'}},
        {node_types:['cache_server'], via: {type:'tcp'}}
      ]
    }
  },

  "db_server": {
    name: "Database Server",
    short_name: "DB",
    description: "a server dedicated to running a database",
    extends: "droplet",
    metadata: {
      name: 'generic-db-server',
      tags: ['db'],
      agent: true,
      backups: true,
      private_network: true,
      ipv6: true,
      active: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['app_server'], via: {type:'tcp'}},
        {node_types:['db_server'], via: {type:'replication'}, all:true}
      ],
      connection_limitations:['tcp', 'mount', 'replication']
    }
  },

  "log_server": {
    name: "Logging Server",
    short_name: "log",
    description: "a server dedicated to aggregating and indexing logs and analytics.",
    extends: "droplet",
    metadata: {
      name: 'generic-log-server',
      tags: ['log'],
      agent: true,
      backups: true,
      private_network: true,
      ipv6: true,
      active: true,
      tier2_connections: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['app_server'], via: {type:'tcp'}, all:true},
        {node_types:['worker_server'], via: {type:'tcp'}, all:true},
        {node_types:['db_server'], via: {type:'tcp'}, all:true}
      ],
      connection_limitations:['tcp', 'mount', 'replication']
    }
  },

  "cache_server": {
    name: "Cache Server",
    short_name: "cache",
    description: "a server dedicated to caching data.",
    extends: "droplet",
    metadata: {
      name: 'generic-cache-server',
      tags: ['cache'],
      agent: true,
      backups: true,
      private_network: true,
      ipv6: true,
      active: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['app_server'], via: {type:'tcp'}, all:true}
      ],
      connection_limitations:['tcp', 'mount', 'replication']
    }
  },

  "block_storage": {
    name: "Block Storage",
    short_name: "BlockStore",
    description: "an extra volume of storage that can be attached to any single server",
    metadata: {
      size: '100GB',
      cost: 10,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        [
          {node_types:['db_server'], via: {type:'mount'}},
          {node_types:['cache_server'], via: {type:'mount'}}
        ]
      ],
      connection_limitations:['mount'],
      max_connections: 1
    }
  },

  "spaces": {
    name: "Spaces",
    short_name: "Spaces",
    description: "a DigitalOcean object storage space of addressable objects",
    metadata: {
      cost: 5,
      edge: true,
      private: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        [
          {node_types:['app_server'], via: {type:'tcp'}},
          {node_types:['worker_server'], via: {type:'tcp'}},
          {node_types:['log_server'], via: {type:'tcp'}}
        ]
      ],
      incompatible_with:['load_balancer', 'db_server', 'block_storage'],
      connection_limitations:['https', 'http', 'tcp']
    }
  },

  "worker_server": {
    name: "Worker Server",
    short_name: "Wrkr",
    description: "a stateless server dedicated to performing a task and returning the results",
    extends: "droplet",
    metadata: {
      name: 'droplet-worker',
      tags: ['worker'],
      agent: true,
      backups: true,
      private_network: true,
      ipv6: true,
      active: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        [
          {node_types:['db_server'], via: {type:'mount'}},
          {node_types:['cache_server'], via: {type:'mount'}}
        ]
      ],
      connection_limitations:['tcp']
    }
  },

  "iot_device": {
    name: "IOT Device",
    short_name: "IOT",
    description: "A limited functionality internet-capable device.",
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:{type:'https', metadata:{'dns':'example.com'}}}
      ],
      connection_limitations:['http', 'https', 'udp', 'websockets'],
      regionless: true
    }
  },

  "droplet": {
    name: "Generic Droplet",
    short_name: "Droplet",
    description: "A generic Droplet (a DigitalOcean virtual server)",
    metadata: {
      id: 1234,
      name: 'droplet-name',
      public_ipv4: '192.168.0.1',
      memory: '512mb',
      vcpus: 1,
      disk: 30,
      image: 'Ubuntu 16.04 x64',
      status: 'active',
      tags: 'comma,separated',
      logging: true,
      monitoring: true,
      backups: true,
      region: 'nyc3'
    },
    behavior: {
      wants: [
        {node_types:['load_balancer', 'floating_ip', 'gateway', 'browser'], via: {type:'https'}},
      ]
    }
  },

  "ci-cd": {
    name: "CI/CD Server",
    short_name: "CI/CD",
    description: "Continuous Integration / Continuous Deployment server to automatically build and test software.",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  "github": {
    name: "GitHub",
    description: "Source Code Management platform.",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  "terraform": {
    name: "Terraform",
    description: "A configuration tool that can create an execution plan and build infrastructure",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  "gateway": {
    name: "3rd Party Gateway",
    short_name: "Gateway",
    description: "A gateway like CloudFlare, sits between user and your infrastructure.",
    metadata: {
      provider: 'cloudflare',
      owner: '',
      notes: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'browser', 'mobile', 'iot_device'], via: {type:'https'}},
        {node_types:['load_balancer', 'floating_ip', 'gateway'], via: {type:'https'}},
      ],
      connection_limitations:['http', 'https', 'udp', 'websockets'],
      min_connections: 2,
      max_connections: 2,
      regionless: true
    }
  }
};

export default NODES;
