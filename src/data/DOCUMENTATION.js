/* 	documentation:
	Documents all the possible prop types and metadata
	that can be associated with Nodes, Connectors, Diagrams
*/

const documentation = {
	node:{
		name: {
			type:'string',
			validation:[1,40],
			info:'The node name or hostname.'
		},
	    shortName: {
	    	type: 'string',
	    	validation: [0,15],
	    	info: 'Optional shorter name (15 char max) of node to be displayed in diagrams.'
	    },
	    description: {
	    	type: 'string',
	    	length: [0,255],
	    	info: 'Optional description of node, can use markdown, 255 char max.',
	    	markdown: true
	    },
    	state: {
	        type: 'string',
	        validation: ['planned', 'initializing', 'active', 'off'],
	        info: 'Node\'s current state, planned (default), initializing, active, off.',
	        default: 'planned'
	    },
	    agent: {
	        type: 'boolean',
	        info: 'Should DigitalOcean monitoring agent be running on this node.',
	        default: true
	    },
	    algo: {
	        type: 'string',
	        validation: ['round-robin', 'least-connections', 'sticky'],
	        info: 'Routing algorithm to be used when load-balancing connections.',
	        default: 'round-robin'
	    },
	    backups: {
	        type: 'boolean',
	        info: 'Enable weekly backups for 20% increase on cost.',
	        default: true
	    },
	    region: {
	    	type: 'select',
	    	validation: ['nyc1', 'sfo1', 'nyc2', 'ams2', 'sgp1', 'lon1', 'nyc3', 'ams3', 'fra1', 'tor1', 'sfo2', 'blr1'],
	    	info: 'server\'s datacenter',
	    	default: 'nyc2'
	    },
	    cost: {
	        type: 'number',
	        validation: [0,640],
	        info: 'Monthly cost of running this node.',
	        default: 5,
	        format: '$#'
	    },
	    size: {
	        type: 'select',
	        validation: ['s-1vcpu-1gb',  's-1vcpu-2gb', 's-1vcpu-3gb', 's-2vcpu-2gb', 's-3vcpu-1gb', 's-2vcpu-4gb', 'c-1vcpu-2gb',  'c-2', 's-4vcpu-8gb',  'c-4', 's-6vcpu-16gb', 'c-8', 's-8vcpu-32gb', 's-12vcpu-48gb', 'c-16', 's-16vcpu-64gb', 's-20vcpu-96gb', 'c-32', 's-24vcpu-128gb', 'c-46vcpu-92gb', 'c-48', 's-32vcpu-192gb'],
	        info: 'Droplet size',
	        default: 's-2vcpu-4gb',
	    },
	    image: {
	        type: 'select',
	        validation: ['Ubuntu 16.04.4 x64'],
	        info: 'Droplet image',
	        default: 'Ubuntu 16.04.4 x64',
	    },
	    userData: {
	    	type: 'string',
	    	info: 'commands to be run upon server creation.'
	    },
	    edge: {
	        type: 'boolean',
	        info: 'Should node accept public (outside regional network) connections?',
	        default: false
	    },
	    privateNetwork: {
	        type: 'boolean',
	        info: 'Allow droplet to communicate on internal datacenter network.',
	        default: true
	    },
	    enableIpv6: {
	        type: 'boolean',
	        info: 'Assign droplet an IPV6 address in addition to IPV4.',
	        default: true
	    },
	    id: {
	        type: 'string',
	        systemOnly: true,
	        info: 'DigitalOcean-assigned ID of node.'
	    },
	    publicIpv4: {
	        type: 'string',
	        validation: [7, 15],
	        systemOnly: true,
	        info: 'Public IPv4 address'
	    },
	    publicIpv6: {
	        type: 'string',
	        validation: [7, 200],
	        systemOnly: true,
	        info: 'Public IPv6 address'
	    },
	    privateIpv4: {
	        type: 'string',
	        validation: [7, 15],
	        systemOnly: true,
	        info: 'Private IPv4 address'
	    },
	    privateIpv6: {
	        type: 'string',
	        validation: [7, 200],
	        systemOnly: true,
	        info: 'Private IPv6 address'
	    },
	    scale: {
	        type: 'number',
	        validation: [0.5,2],
	        info: 'Scales this node\'s appearance by 0.5 to 2.',
	        default: 1
	    },
	    tags: {
	        type: 'string',
	        info: 'Comma-separated list of tags to apply to droplet.'
	    },
	    favicon: {
	    	type: 'url',
	    	validation: [0,255],
	    	info: 'Optional link to a favicon to display on node.'
	    },
	    color: {
	    	type: 'color',
	    	info: 'Optional accent color to use on node.'
	    },
	    cloudFirewall: {
	        type: 'select',
	        validation: ['disabled', 'tagBased', 'customized'],
	        info: 'Cloud firewall',
	        default: 'disabled'
	    },
	    blockStorage: {
	        type: 'number',
	        validation: [0,16000],
	        info: 'Expandable SSD block storage.',
	        default: 100
	    },
	    managementMethod: {
	    	type: 'select',
	        validation: ['web', 'doctl', 'terminal', 'terraform'],
	        info: 'How the infrastructure is deployed and managed',
	        default: 'terminal'
	    }
	},
	connector:{
		name: {
			type:'string',
			validation:[1,40],
			info:'The node name or hostname.'
		},
	    description: {
	    	type: 'string',
	    	length: [0,255],
	    	info: 'Optional description of node, can use markdown, 255 char max.',
	    	markdown: true
	    },
	    dns: {
			type: 'string',
			validation: [0,255],
			info: 'domain or subdomain'
		},
		encryption: {
			type: 'string',
			validation: [0,255],
			info: 'type of encryption used (TLS,??)'
		},
		port: {
			type: 'number',
			validation: [0,12000],
			info: 'port used for connection'
		},
	    color: {
	    	type: 'color',
	    	info: 'Optional accent color to use on node.'
	    },
	    style: {
	    	type: 'select',
	    	validation: ['curved', 'angular', 'square'],
	        info: 'Visual style of connector path',
	        default: 'curved'
	    }
	}
};

export default documentation;
