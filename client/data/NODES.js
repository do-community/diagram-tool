const NODES = {

  "browser": {
    name: "Browser",
    description: "the end-user, communicating via a web browser",
    category: "End-User Components",
    metadata: {
      name: "",
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {node_types:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connection_preference: ['https', 'http', 'websocket'],
      incompatible_with: ['iot_device', 'mobile'],
      requests: 'creator',
      min_connections: 1,
      regionless: true
    }
  },

  "mobile": {
    name: "Mobile App (User)",
    description: "the end user, communicating via a mobile app",
    category: "End-User Components",
    metadata: {
      name: "",
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:'https', metadata:{'dns':'example.com'}},
        {node_types:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connection_preference: ['https', 'http', 'websockets', 'udp'],
      incompatible_with: ['iot_device', 'browser'],
      requests: 'creator',
      min_connections: 1,
      regionless: true
    }
  },

  "internet": {
    name: "Internet",
    description: "the publicly accessible internet.",
    category: "End-User Components",
    label_offset: -16,
    metadata: {
      name: '',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {node_types:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connection_preference: ['https', 'http', 'websocket'],
      incompatible_with: ['iot_device', 'mobile', 'browser'],
      requests: 'creator',
      min_connections: 1,
      regionless: true
    }
  },

  "iot_device": {
    name: "IOT Device",
    description: "A limited functionality internet-capable device.",
    category: "End-User Components",
    metadata: {
      name: "",
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'floating_ip', 'load_balancer', 'app_server', 'droplet'], via:'https', metadata:{dns:'example.com'}},
        {node_types:['cdn'], via:'https', metadata:{'dns':'cdn.example.com'}}
      ],
      connection_preference: ['https', 'http', 'websocket'],
      incompatible_with: ['iot_device', 'mobile'],
      requests: 'creator',
      min_connections: 1,
      regionless: true
    }
  },

  "developer_device": {
    name: "Dev Device",
    description: "Developer's local device",
    category: "End-User Components",
    metadata: {
      name: "",
      management_method: 'terminal',
      favicon: '',
      color: ''
    },
    behavior: {
      wants: [
        {node_types:['app_server', 'db_server', 'log_server', 'droplet'], via:'ssh'},
      ],
      connection_preference: ['ssh'],
      incompatible_with: ['iot_device', 'mobile', 'floating_ip', 'load_balancer'],
      requests: 'creator',
      min_connections: 1,
      regionless: true
    }
  },

  "floating_ip": {
    name: "Floating IP",
    description: "an IP address that can be assigned and reassigned to a single droplet",
    category: "DO Server Components",
    metadata: {
      ip: '',
      cost: 0,
      scale: 0.7
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'browser', 'mobile', 'iot_device'], via: 'https'},
        {node_types:['app_server', 'droplet'], via: 'https'}
      ],
      connection_preference:['https', 'http', 'websocket', 'udp'],
      requests: 'pass_through',
      min_connections: 2,
      edge: true
    }
  },

  "load_balancer": {
    name: "Load Balancer",
    description: "reverse proxy that distributes network or application traffic across a number of servers",
    category: "DO Server Components",
    metadata: {
      name: "",
      algo: "round-robin"
    },
    behavior: {
      wants: [
        {node_types:['floating_ip', 'gateway', 'browser', 'mobile', 'iot_device'], via: 'https', metadata:{'dns':'example.com'}},
        {node_types:['app_server'], via: 'https', all:true}
      ],
      connection_preference:['https', 'http', 'tcp', 'websocket'],
      min_connections: 2,
      requests: 'load_balanced',
      edge: true
    }
  },

  "app_server": {
    name: "Application Server",
    description: "a stateless server that processes incoming requests via an application and returns a response",
    category: "DO Server Components",
    extends: "droplet",
    metadata: {
      name: "",
      agent: true,
      private_network: true
    },
    behavior: {
      wants: [
        {node_types:['load_balancer', 'floating_ip','gateway', 'browser', 'mobile', 'iot_device'], via: 'https'},
        {node_types:['db_server'], via: 'tcp'},
        {node_types:['cache_server'], via: 'tcp'}
      ],
      connection_preference:['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursive_sync'
    }
  },

  "db_server": {
    name: "Database Server",
    description: "a server dedicated to running a database",
    category: "DO Server Components",
    extends: "droplet",
    metadata: {
      name: "",
      agent: true,
      backups: true,
      private_network: true,
      block_storage: 100
    },
    behavior: {
      wants: [
        {node_types:['app_server', 'droplet', 'worker_server'], via: 'tcp', all:true},
        {node_types:['db_server'], via: 'replication', all:true}
      ],
      connection_preference:['tcp', 'mount', 'replication'],
      requests: 'recursive_async'
    }
  },

  "log_server": {
    name: "Logging Server",
    description: "a server dedicated to aggregating and indexing logs and analytics.",
    category: "DO Server Components",
    extends: "droplet",
    metadata: {
      name: "",
      agent: true,
      backups: true,
      private_network: true
    },
    behavior: {
      wants: [
        {node_types:['app_server'], via: 'udp', all:true},
        {node_types:['worker_server'], via: 'udp', all:true},
        {node_types:['db_server'], via: 'udp', all:true},
        {node_types:['cache_server'], via: 'udp', all:true}
      ],
      connection_preference:['udp'],
      requests: 'respond'
    }
  },

  "cache_server": {
    name: "Cache Server",
    description: "a server dedicated to caching data.",
    category: "DO Server Components",
    extends: "droplet",
    metadata: {
      name: "",
      agent: true,
      backups: true,
      private_network: true
    },
    behavior: {
      wants: [
        {node_types:['app_server'], via: 'tcp', all:true}
      ],
      connection_preference:['tcp', 'mount', 'replication'],
      requests: 'respond'
    }
  },

  "worker_server": {
    name: "Worker Server",
    description: "a stateless server dedicated to performing a task and returning the results",
    category: "DO Server Components",
    extends: "droplet",
    metadata: {
      name: "",
      agent: true,
      backups: true,
      private_network: true
    },
    behavior: {
      wants: [
        {node_types:['db_server'], via: 'mount'},
        {node_types:['cache_server'], via: 'mount'}
      ],
      connection_preference:['tcp'],
      requests: 'recursive_async'
    }
  },

  "droplet": {
    name: "Droplet",
    description: "a droplet",
    category: "DO Server Components",
    metadata: {
      name: "",
      agent: false,
      private_network: false,
      enable_ipv6: false,
      backups: false,
      image: 'Ubuntu 16.04.4 x64',
      size:  's-4vcpu-8gb',
      region: 'nyc3',
      tags: '',
      cloud_firewall: 'disabled',
      block_storage: null,
      scale:1
    },
    behavior: {
      wants: [
        {node_types:['load_balancer', 'floating_ip','gateway', 'browser', 'mobile', 'iot_device'], via: 'https'},
        {node_types:['db_server'], via: 'tcp'},
        {node_types:['cache_server'], via: 'tcp'}
      ],
      connection_preference:['https', 'http', 'websocket', 'tcp', 'udp'],
      requests: 'recursive_sync'
    }
  },

  "spaces": {
    name: "Spaces",
    description: "a DigitalOcean object storage space of addressable objects",
    category: "DO Server Components",
    metadata: {
      name: "",
      edge: true,
      private: true
    },
    behavior: {
      wants: [
          {node_types:['app_server', 'worker_server', 'log_server'], via: 'https', all:true},
          {node_types:['browser'], via: 'https'}
      ],
      incompatible_with:['load_balancer', 'db_server'],
      connection_preference:['https'],
      requests: 'respond'
    }
  },

  "ci-cd": {
    name: "CI/CD Server",
    description: "Continuous Integration / Continuous Deployment server to automatically build and test software.",
    category: "DO Server Components",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  "github_repo": {
    name: "GitHub Repo",
    description: "Source Code Management platform.",
    category: "3rd Party Tools",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true,
      connection_preference:['https', 'http']
    }
  },

  "terraform": {
    name: "Terraform",
    description: "A configuration tool that can create an execution plan and build infrastructure",
    category: "3rd Party Tools",
    metadata: {
    },
    behavior: {
      wants: [],
      regionless:true
    }
  },

  "cloudflare": {
    name: "cloudflare",
    description: "A gateway like CloudFlare, sits between user and your infrastructure.",
    category: "3rd Party Tools",
    metadata: {
      provider: 'cloudflare',
      owner: '',
      notes: ''
    },
    behavior: {
      wants: [
        {node_types:['gateway', 'browser', 'mobile', 'iot_device'], via: 'https'},
        {node_types:['load_balancer', 'floating_ip', 'gateway'], via: 'https'},
      ],
      connection_limitations:['http', 'https', 'udp', 'websockets'],
      min_connections: 2,
      max_connections: 2,
      regionless: true,
      requests: 'pass_through'
    }
  }
};

export default NODES;
