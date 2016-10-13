const tray_presets = {
  connectors: {
    tcp: {
      name: "General TCP",
      short_name: "TCP",
      color: "#0069ff",
      dash: "1 4 91 4",
      mode: "duplex",
      metadata: {
        port: 9000,
        encryption: '',
        protocol: ''
      }
    },
    udp: {
      name: "General UDP",
      short_name: "UDP",
      color: "#0069ff",
      dash: "1 4 91 4",
      mode: "simplex",
      metadata: {
        port: 9090,
        encryption: '',
        protocol: ''
      }
    },
    http: {
      name: "HTTP",
      short_name: "HTTP",
      color: "#2980b9",
      dash: "1 4 1200 4",
      mode: "duplex",
      metadata: {
        port: 80,
        dns: 'domain.com'
      }
    },
    https: {
      name: "HTTPS",
      short_name: "HTTPS",
      color: "#27ae60",
      dash: "1 4 1200 4",
      mode: "duplex",
      metadata: {
        port: 443,
        encryption: 'TLS'
      }
    },
    http2: {
      name: "HTTP/2",
      short_name: "HTTP/2",
      color: "green",
      dash: "1 4 1200 4",
      mode: "duplex",
      metadata: {
        port: 443,
        encryption: 'TLS'
      }
    },
    websocket: {
      name: "Websocket",
      short_name: "WS",
      color: "#8e44ad",
      dash: "1 4 85 4",
      mode: "duplex",
      metadata: {
        port: 80
      }
    },
    db_replication: {
      name: "DB Replication",
      short_name: "DB-Repl",
      color: "#8e44ad",
      dash: "1 4 51 4",
      mode: "duplex",
      metadata: {
        port: 80
      }
    },
    monitoring: {
      name: "Monitoring Connection",
      short_name: "👁",
      color: "#0069ff",
      dash: "1 4 91 4",
      mode: "simplex",
      metadata: {
        port: 9090,
        encryption: '',
        protocol: ''
      }
    },
  },
  nodes: {
    "default": {
      name: "Basic Node",
      short_name: "?",
      description: "generic placeholder component",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z"
    },
    "browser": {
      name: "Browser (User)",
      short_name: "Browser",
      description: "the person using the service AND the client/browser",
      constraints: {
        connectors: {
          no: ['tcp'],
          max: 1,
          min: 1
        },
        nodes: {
          no: ['db_server', 'cache_server', 'worker_server']
        }
      },
      svg_path: "M 15 90 C 12.5 90 10 87.5 10 85 L 10 15 C 10 12.5 12.5 10 15 10 L 85 10 C 87.5 10 90 12.5 90 15 L 90 85 C 90 87.5 87.5 90 85 90 L 15 90 M 10 22 L 90 22 M 15 19 L 20 14 M 15 14 L 20 19"
    },
    "mobile": {
      name: "Mobile App (User)",
      short_name: "Mobile",
      description: "the person using the service through the mobile app",
      constraints: {
        connectors: {
          no: ['tcp'],
          max: 1,
          min: 1
        },
        nodes: {
          no: ['db_server', 'cache_server', 'worker_server']
        }
      },
      svg_path: "M 35 90 C 32.5 90 30 87.5 30 85 L 30 15 C 30 12.5 32.5 10 35 10 L 65 10 C 67.5 10 70 12.5 70 15 L 70 85 C 70 87.5 67.5 90 65 90 L 35 90 "
    },
    "device": {
      name: "IOT Device",
      short_name: "Device",
      description: "An internet-capable device.",
      constraints: {
        connectors: {
          no: ['tcp'],
          max: 1,
          min: 1
        },
        nodes: {
          no: ['db_server', 'cache_server', 'worker_server']
        }
      },
      svg_path: "M 35 70 C 32.5 70 30 67.5 30 65 L 30 35 C 30 32.5 32.5 30 35 30 L 65 30 C 67.5 30 70 32.5 70 35 L 70 65 C 70 67.5 67.5 70 65 70 L 35 70 M 70 45 L 75 45 L 75 47 L 77 47 L 77 10 C 77 5 82 5 82 10 L 82 53 L 75 53 L 75 55 L 70 55"
    },
    "gateway": {
      name: "3rd Party Gateway",
      short_name: "Gateway",
      description: "really just CloudFlare at this point",
      connection_limit: 2,
      connection_type: 'bimodal',
      svg_path: "M 10 90 L 10 80 L 15 80 L 15 30 L 10 30 L 10 20 L 90 20 L 90 30 L 85 30 L 85 80 L 90 80 L 90 90 L 60 90 L 60 60 L 50 50 L 40 60 L 40 90 L 10 90 z",
      metadata: {
        provider: 'cloudflare',
        owner: '',
        notes: ''
      }
    },
    "floating_ip": {
      name: "Floating IP",
      short_name: "IP",
      description: "a DigitalOcean floating IP address",
      connection_limit: 2,
      connection_type: 'bimodal',
      svg_path: "M 10 20 C 10 15 30 10 50 10 C 70 10 90 15 90 20 C 90 25 70 30 50 30 C 30 30 10 25 10 20 z M 10 22 L 40 50 L 40 70 M 60 70 L 60 50 L 90 22 M 42 70 C 42 66 45 60 50 60 C 55 60 58 66 58 70 L 56 72 L 66 85 L 60 90 L 44 72 L 42 70",
      metadata: {
        ip: '',
        region: 'nyc1',
        owner: '',
        notes: ''
      }
    },
    "droplet": {
      name: "Generic Droplet",
      short_name: "Droplet",
      description: "group encompassing all uses of droplets",
      connection_type: "bimodal",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        id: 1234,
        name: 'droplet-name',
        public_ipv4: '192.168.0.1',
        memory: '512mb',
        vcpus: 1,
        disk: 30,
        region: 'nyc1',
        image: 'Ubuntu 16.04 x64',
        status: 'active',
        tags: 'comma,separated'
      }
    },
    "load_balancer": {
      name: "Load Balancer",
      code: "LB",
      description: "reverse proxy that distributes network or application traffic across a number of servers",
      connection_type: 'bimodal',
      category: "droplet",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        provider: "haproxy"
      }
    },
    "app_server": {
      name: "Application Server",
      code: "App",
      description: "",
      connection_type: 'bimodal',
      category: "droplet",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        id: 1234,
        name: 'droplet-name',
        public_ipv4: '192.168.0.1',
        memory: '512mb',
        vcpus: 1,
        disk: 30,
        region: 'nyc1',
        image: 'Ubuntu 16.04 x64',
        status: 'active',
        tags: 'comma,separated'
      }
    },
    "db_server": {
      name: "Database Server",
      code: "DB",
      description: "",
      connection_type: 'bimodal',
      category: "droplet",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        id: 1234,
        name: 'droplet-name',
        public_ipv4: '192.168.0.1',
        memory: '512mb',
        vcpus: 1,
        disk: 30,
        region: 'nyc1',
        image: 'Ubuntu 16.04 x64',
        status: 'active',
        tags: 'comma,separated'
      }
    },
    "cache_server": {
      name: "Cache Server",
      code: "Cch",
      description: "",
      connection_type: 'bimodal',
      category: "droplet",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        id: 1234,
        name: 'droplet-name',
        public_ipv4: '192.168.0.1',
        memory: '512mb',
        vcpus: 1,
        disk: 30,
        region: 'nyc1',
        image: 'Ubuntu 16.04 x64',
        status: 'active',
        tags: 'comma,separated'
      }
    },
    "worker_server": {
      name: "Worker Server",
      code: "Wrkr",
      description: "",
      connection_type: 'bimodal',
      category: "droplet",
      svg_path: "M 10 90 L 90 90 L 90 60 L 10 60 L 10 90 z M 10 55 L 30 35 L 70 35 L 90 55 z",
      metadata: {
        id: 1234,
        name: 'droplet-name',
        public_ipv4: '192.168.0.1',
        memory: '512mb',
        vcpus: 1,
        disk: 30,
        region: 'nyc1',
        image: 'Ubuntu 16.04 x64',
        status: 'active',
        tags: 'comma,separated'
      }
    },
    monitor: {
      name: "Monitor",
      code: "Mntr",
      description: "Monitors the status and performance of connected servers.",
      connection_type: '',
      category: "droplet",
      svg_path: "M 10 50 C 40 20 60 20 90 50 M 15 45 C 40 60 60 60 85 45 M 38 32 C 35 40 35 50 45 55 M 62 32 C 65 40 65 50 55 55",
      constraints: {
        connectors: {
          only: ['monitor', 'webhook'],
          max: 1,
          min: 1
        },
        nodes: {
          no: ['db_server', 'cache_server', 'worker_server']
        }
      },
      metadata: {

      }
    }
  }
};

export default tray_presets;
