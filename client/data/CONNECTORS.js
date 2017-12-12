const CONNECTORS = {
  tcp: {
    name: "General TCP",
    short_name: "TCP",
    mode: "duplex",
    /* META-DATA FIELDS CAN BE OVER-RIDDEN IN DIAGRAM CONFIG,
    TOP-LEVEL ATTRIUBTES CANNOT */
    metadata: {
      port: 9000,
      latency: 10,
      variation: 5,
      encryption: '',
      color: "#0069ff"
    }
  },
  udp: {
    name: "General UDP",
    short_name: "UDP",
    mode: "simplex",
    metadata: {
      port: 9090,
      latency: 10,
      variation: 5,
      encryption: '',
      color: "#1abc9c",
    }
  },
  http: {
    name: "HTTP",
    short_name: "HTTP",
    mode: "duplex",
    metadata: {
      port: 80,
      latency: 20,
      variation: 5,
      dns: 'domain.com',
      color: "#e67e22",
    }
  },
  https: {
    name: "HTTPS",
    short_name: "HTTPS",
    mode: "duplex",
    metadata: {
      port: 443,
      latency: 20,
      variation: 5,
      encryption: 'TLS',
      color: "#2ecc71",
    }
  },
  http2: {
    name: "HTTP/2",
    short_name: "HTTP/2",
    mode: "duplex",
    metadata: {
      port: 443,
      latency: 20,
      variation: 5,
      encryption: 'TLS',
      color: "#16a085",
    }
  },
  websocket: {
    name: "Websocket",
    short_name: "WS",
    mode: "duplex",
    metadata: {
      port: 443,
      latency: 20,
      variation: 5,
      encryption: 'TLS',
      color: "#8e44ad"
    }
  },
  replication: {
    name: "DB Replication",
    short_name: "DB-Repl",
    mode: "duplex",
    metadata: {
      port: 80,
      latency: 20,
      variation: 5,
      encryption: 'TLS',
      color: "#8e44ad"
    }
  },
  mount: {
    name: "Mounted Volume",
    short_name: "Mount",
    mode: "duplex",
    metadata: {
      color: "#333"
    }
  }
};

export default CONNECTORS;
