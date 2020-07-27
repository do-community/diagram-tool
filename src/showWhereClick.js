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

import React from 'react';
import lineGenerator from './lineGenerator';

let clickHandler;

export class ClickPositioner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {el: null};
    }

    componentDidMount() {
        clickHandler = this;
    }

    render() {
        if (this.state.el) {
            return this.state.el;
        } else {
            return <span />;
        }
    }
}

let positioner;

class CloseEnoughPositioner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {contentWidth: 0, contentHeight: 0, pageWidth: 0, pageHeight: 0};
        this.componentDidMount = this.getWidthsHeights.bind(this);
        window.onresize = this.getWidthsHeights.bind(this);
        this.ref = React.createRef();
        positioner = this;
    }

    getWidthsHeights() {
        const domEl = this.ref.current;
        this.setState({contentWidth: domEl.clientWidth, contentHeight: domEl.clientHeight, pageWidth: window.innerWidth, pageHeight: window.innerHeight});
    }

    render() {
        // Get the wanted left and top positions with the element.
        let {
            left, top, el,
            cornerPaddding,
        } = this.props;

        // Add the corner padding.
        if (cornerPaddding) {
            top = `${Number(top.slice(0, -2)) + cornerPaddding}px`;
            left = `${Number(left.slice(0, -2)) + cornerPaddding}px`;
        }

        // Ensure it fits on the Y axis.
        const topInt = Number(top.slice(0, -2));
        if (this.state.pageHeight >= topInt) {
            const itemAdded = topInt + this.state.contentHeight;
            if (itemAdded > this.state.pageHeight) {
                // Ok, it will be larger than the page.
                // We will subtract the content width from the page height (and minus 25 for some wiggle room) to get the top position.
                top = `${this.state.pageHeight - this.state.contentHeight - 25}px`;
            }
        }

        // Ensure it fits on the X axis.
        const leftInt = Number(left.slice(0, -2));
        if (this.state.pageWidth >= leftInt) {
            const itemAdded = leftInt + this.state.contentWidth;
            if (itemAdded > this.state.pageWidth) {
                // Ok, it will be larger than the page.
                // We will subtract the content width from the page width (and minus 100 for some wiggle room) to get the left position.
                left = `${this.state.pageWidth - this.state.contentWidth - 100}px`;
            }
        }

        // Render the element with all of this wrapped.
        return <div style={{left, top, position: 'absolute'}} className="diagram-tool do-bulma" ref={this.ref}>{el}</div>;
    }
}

export const updatePosition = () => {
    if (positioner) {
        positioner.getWidthsHeights.bind(positioner)();
    }
};

export const showWhereClick = (el, event, cornerPaddding) => {
    const left = `${event.clientX + window.pageXOffset}px`;
    const top = `${event.clientY + window.pageYOffset}px`;
    clickHandler.setState({el: <CloseEnoughPositioner left={left} top={top} el={el} cornerPaddding={cornerPaddding} />, left, top});
};

export const getPosition = () => {
    return {
        left: clickHandler.state.left,
        top: clickHandler.state.top,
    };
};

export const clear = () => {
    lineGenerator();
    clickHandler.setState({el: null});
};

export const viewVisible = () => {
    return (clickHandler || {state: {el: null}}).state.el !== null;
};

document.onkeydown = e => {
    if (e.keyCode === 27) clear();
};
