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

export default {
  tcp: {
    name: 'TCP',
    mode: 'duplex',
    /* META-DATA FIELDS CAN BE OVER-RIDDEN IN DIAGRAM CONFIG,
    TOP-LEVEL ATTRIBUTES CANNOT */
    metadata: {
      port: 9000,
      encryption: '',
      color: '#0069ff',
    }
  },
  udp: {
    name: 'UDP',
    mode: 'simplex',
    opacity: 0.5,
    metadata: {
      port: 9090,
      encryption: '',
      color: '#1abc9c',
      style: 'angular'
    }
  },
  http: {
    name: 'HTTP',
    mode: 'duplex',
    metadata: {
      port: 80,
      color: '#e67e22',
    }
  },
  https: {
    name: 'HTTPS',
    mode: 'duplex',
    metadata: {
      port: 443,
      encryption: 'TLS',
      color: '#2ecc71',
    }
  },
  http2: {
    name: 'HTTP/2',
    mode: 'duplex',
    metadata: {
      port: 443,
      encryption: 'TLS',
      color: '#16a085',
    }
  },
  websocket: {
    name: 'Websocket',
    mode: 'duplex',
    metadata: {
      port: 443,
      encryption: 'TLS',
      color: '#8e44ad'
    }
  },
  replication: {
    name: 'DB Replication',
    mode: 'duplex',
    metadata: {
      port: 80,
      encryption: 'TLS',
      color: '#8e44ad'
    }
  }
  ,
  ssh: {
    name: 'SSH',
    mode: 'duplex',
    opacity: 0.5,
    metadata: {
      port: 21,
      encryption: 'ssh',
      color: '#95a5a6',
      style: 'angular'
    }
  }
};
