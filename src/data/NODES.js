const NODES = {

  'browser': {
    name: 'Browser',
    description: 'the end-user, communicating via a web browser',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websocket'],
      incompatibleWith: ['iotDevice', 'mobile'],
      requests: 'creator',
      minConnections: 1,
      regionless: true
    }
  },

  'mobile': {
    name: 'Mobile App (User)',
    description: 'the end user, communicating via a mobile app',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websockets', 'udp'],
      incompatibleWith: ['iotDevice', 'browser'],
      requests: 'creator',
      minConnections: 1,
      regionless: true
    }
  },

  'internet': {
    name: 'Internet',
    description: 'the publicly accessible internet.',
    category: 'End-User Components',
    labelOffset: -16,
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websocket'],
      incompatibleWith: ['iotDevice', 'mobile', 'browser'],
      requests: 'creator',
      minConnections: 1,
      regionless: true
    }
  },

  'iotDevice': {
    name: 'IOT Device',
    description: 'A limited functionality internet-capable device.',
    category: 'End-User Components',
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'floatingIp', 'loadBalancer', 'appServer', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {nodeTypes:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connectionPreference: ['https', 'http', 'websocket'],
      incompatibleWith: ['iotDevice', 'mobile'],
      requests: 'creator',
      minConnections: 1,
      regionless: true
    }
  },

  'developerDevice': {
    name: 'Dev Device',
    description: 'Developer\'s local device',
    category: 'End-User Components',
    metadata: {
      name: '',
      managementMethod: 'terminal',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['appServer', 'dbServer', 'logServer', 'droplet'], via:'ssh'},
      ],
      connectionPreference: ['ssh'],
      incompatibleWith: ['iotDevice', 'mobile', 'floatingIp', 'loadBalancer'],
      requests: 'creator',
      minConnections: 1,
      regionless: true
    }
  },

  'floatingIp': {
    name: 'Floating IP',
    description: 'an IP address that can be assigned and reassigned to a single droplet',
    category: 'DO Server Components',
    metadata: {
      ip: '',
      cost: 0,
      scale: 0.7
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['appServer', 'droplet'], via: 'https'}
      ],
      connectionPreference:['https', 'http', 'websocket', 'udp'],
      requests: 'passThrough',
      minConnections: 2,
      edge: true
    }
  },

  'loadBalancer': {
    name: 'Load Balancer',
    description: 'reverse proxy that distributes network or application traffic across a number of servers',
    category: 'DO Server Components',
    metadata: {
      name: '',
      algo: 'round-robin'
    },
    behavior: {
      wants: [
        {nodeTypes:['floatingIp', 'gateway', 'browser', 'mobile', 'iotDevice'], via: 'https', metadata:{'dns':'example.com'}},
        {nodeTypes:['appServer'], via: 'https', all:true}
      ],
      connectionPreference:['https', 'http', 'tcp', 'websocket'],
      minConnections: 2,
      requests: 'loadBalanced',
      edge: true
    }
  },

  'appServer': {
    name: 'Application Server',
    description: 'a stateless server that processes incoming requests via an application and returns a response',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      privateNetwork: true
    },
    behavior: {
      wants: [
        {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['dbServer'], via: 'tcp'},
        {nodeTypes:['cacheServer'], via: 'tcp'}
      ],
      connectionPreference:['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursiveSync'
    }
  },

  'dbServer': {
    name: 'Database Server',
    description: 'a server dedicated to running a database',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      backups: true,
      privateNetwork: true,
      blockStorage: 100
    },
    behavior: {
      wants: [
        {nodeTypes:['appServer', 'droplet', 'workerServer'], via: 'tcp', all:true},
        {nodeTypes:['dbServer'], via: 'replication', all:true}
      ],
      connectionPreference:['tcp', 'mount', 'replication'],
      requests: 'recursiveAsync'
    }
  },

  'logServer': {
    name: 'Logging Server',
    description: 'a server dedicated to aggregating and indexing logs and analytics.',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      backups: true,
      privateNetwork: true
    },
    behavior: {
      wants: [
        {nodeTypes:['appServer'], via: 'udp', all:true},
        {nodeTypes:['workerServer'], via: 'udp', all:true},
        {nodeTypes:['dbServer'], via: 'udp', all:true},
        {nodeTypes:['cacheServer'], via: 'udp', all:true}
      ],
      connectionPreference:['udp'],
      requests: 'respond'
    }
  },

  'cacheServer': {
    name: 'Cache Server',
    description: 'a server dedicated to caching data.',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      backups: true,
      privateNetwork: true
    },
    behavior: {
      wants: [
        {nodeTypes:['appServer'], via: 'tcp', all:true}
      ],
      connectionPreference:['tcp', 'mount', 'replication'],
      requests: 'respond'
    }
  },

  'workerServer': {
    name: 'Worker Server',
    description: 'a stateless server dedicated to performing a task and returning the results',
    category: 'DO Server Components',
    extends: 'droplet',
    metadata: {
      name: '',
      agent: true,
      backups: true,
      privateNetwork: true
    },
    behavior: {
      wants: [
        {nodeTypes:['dbServer'], via: 'mount'},
        {nodeTypes:['cacheServer'], via: 'mount'}
      ],
      connectionPreference:['tcp'],
      requests: 'recursiveAsync'
    }
  },

  'droplet': {
    name: 'Droplet',
    description: 'a droplet',
    category: 'DO Server Components',
    metadata: {
      name: '',
      agent: false,
      privateNetwork: false,
      enableIpv6: false,
      backups: false,
      image: 'Ubuntu 16.04.4 x64',
      size:  's-4vcpu-8gb',
      region: 'nyc3',
      tags: '',
      cloudFirewall: 'disabled',
      blockStorage: null,
      scale:1
    },
    behavior: {
      wants: [
        {nodeTypes:['loadBalancer', 'floatingIp','gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['dbServer'], via: 'tcp'},
        {nodeTypes:['cacheServer'], via: 'tcp'}
      ],
      connectionPreference:['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursiveSync'
    }
  },

  'spaces': {
    name: 'Spaces',
    description: 'a DigitalOcean object storage space of addressable objects',
    category: 'DO Server Components',
    metadata: {
      name: '',
      edge: true,
      private: true
    },
    behavior: {
      wants: [
          {nodeTypes:['appServer', 'workerServer', 'logServer'], via: 'https', all:true},
          {nodeTypes:['browser'], via: 'https'}
      ],
      incompatibleWith:['loadBalancer', 'dbServer'],
      connectionPreference:['https'],
      requests: 'respond'
    }
  },

  'ci-cd': {
    name: 'CI/CD Server',
    description: 'Continuous Integration / Continuous Deployment server to automatically build and test software.',
    category: 'DO Server Components',
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  'githubRepo': {
    name: 'GitHub Repo',
    description: 'Source Code Management platform.',
    category: '3rd Party Tools',
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true,
      connectionPreference:['https', 'http']
    }
  },

  'terraform': {
    name: 'Terraform',
    description: 'A configuration tool that can create an execution plan and build infrastructure',
    category: '3rd Party Tools',
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  'cloudflare': {
    name: 'cloudflare',
    description: 'A gateway like CloudFlare, sits between user and your infrastructure.',
    category: '3rd Party Tools',
    metadata: {
      provider: 'cloudflare',
      owner: '',
      notes: ''
    },
    behavior: {
      wants: [
        {nodeTypes:['gateway', 'browser', 'mobile', 'iotDevice'], via: 'https'},
        {nodeTypes:['loadBalancer', 'floatingIp', 'gateway'], via: 'https'},
      ],
      connectionLimitations:['http', 'https', 'udp', 'websockets'],
      minConnections: 2,
      maxConnections: 2,
      regionless: true,
      requests: 'passThrough'
    }
  }
};

export default NODES;
