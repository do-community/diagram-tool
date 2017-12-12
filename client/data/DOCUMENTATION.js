/* 	DOCUMENTATION:
	Documents all the possible prop types and metadata
	that can be associated with Nodes, Connectors, Diagrams
*/

const DOCUMENTATION = {
	node:{
		name: {
			type:"string",
			validation:[1,40],
			info:'The node name or hostname.'
		},
	    short_name: {
	    	type: "string",
	    	validation: [0,15],
	    	info: 'Optional shorter name (15 char max) of node to be displayed in diagrams.'
	    },
	    description: {
	    	type: "string",
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
	    	type: 'string',
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
	    memory: {
	        type: 'number',
	        validation: [0.5, 96],
	        info: 'GB of RAM (memory) allocated.',
	        default: 0.5,
	        format: '# GB'
	    },
	    disk: {
	        type: 'number',
	        validation: [0.5, 640],
	        info: 'GB of SSD disk allocated.',
	        default: 20,
	        format: '# GB'
	    },
	    cpus: {
	        type: 'number',
	        validation: [1,32],
	        info: 'vCPUs available to droplet.',
	        default: 1,
	        format: '# CPUs'
	    },
	    bandwidth: {
	        type: 'number',
	        validation: [1,10],
	        info: 'Monthly external transfer bandwidth allowed.',
	        default: 1,
	        format:'# TB'
	    },
	    user_data: {
	    	type: 'string',
	    	info: 'commands to be run upon server creation.'
	    },
	    edge: {
	        type: 'boolean',
	        info: 'Should node accept public (outside regional network) connections?',
	        default: false
	    },
	    id: {
	        type: 'string',
	        system_only: true,
	        info: 'DigitalOcean-assigned ID of node.'
	    },
	    private_network: {
	        type: 'boolean',
	        info: 'Allow droplet to communicate on internal datacenter network.',
	        default: true
	    },
	    enable_ipv6: {
	        type: 'boolean',
	        info: 'Assign droplet an IPV6 address in addition to IPV4.',
	        default: true
	    },
	    public_ipv4: {
	        type: 'string',
	        validation: [7, 15],
	        system_only: true,
	        info: 'Public IPv4 address'
	    },
	    public_ipv6: {
	        type: 'string',
	        validation: [7, 200],
	        system_only: true,
	        info: 'Public IPv6 address'
	    },
	    private_ipv4: {
	        type: 'string',
	        validation: [7, 15],
	        system_only: true,
	        info: 'Private IPv4 address'
	    },
	    private_ipv6: {
	        type: 'string',
	        validation: [7, 200],
	        system_only: true,
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
	    tier2_connections: {
	        type: '',
	        validation: [],
	        info: '',
	        example: 'true'
	    },
	    favicon: {
	    	type: 'url',
	    	validation: [0,255],
	    	info: 'Optional link to a favicon to display on node.'
	    },
	    color: {
	    	type: 'color',
	    	info: 'Optional accent color to use on node.'
	    }
	},
	connector:{
		dns: {
			type: 'string',
			validation: [0,255],
			info: 'domain or subdomain'
		}
	}
};

export default DOCUMENTATION;
