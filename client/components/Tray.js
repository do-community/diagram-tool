import React from 'react';
import dndHelper from '../dndHelper.js';
import TrayNode from './TrayNode';
import DATA from '../data';
console.log(DATA.NODES_BY_CATEGORY);

class Tray extends React.Component {
	constructor(props) {
		super(props);
		const topOffset = document.getElementById('root').getBoundingClientRect().top + 20;
		this.state = {'top': topOffset - window.pageYOffset};
		window.addEventListener('scroll', () => {
			this.setState({top: topOffset - window.pageYOffset});
		});
	}
	toggleMinimized() {
		const sidenav = document.querySelector('.bui-SideNav');
		sidenav.classList.toggle('minimized');
	}
	render(){
		return this.props.connectDropTarget(
			<div className="tray side-panel" style={{top: this.state.top}}>
				<h3>Build</h3>
				<div className="scrollable">
					<ul>
						{ Object.keys(DATA.NODES_BY_CATEGORY).map(
							(category) => { return (
                  <li key={category}>
                    <h4>{category}</h4>
                    <ul>{ Object.keys(DATA.NODES_BY_CATEGORY[category]).map(
                        (node, i) => { return (<TrayNode key={i} id={node} />) }
                    )}</ul>
                  </li>
              ) }
            )}
					</ul>
				</div>
				<a className="minimizeButton" onClick={this.toggleMinimized}></a>
			</div>
		);
	}
};

export default dndHelper.composeDrop(Tray);
