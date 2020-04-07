import React from 'react';

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

export const showWhereClick = (el, event) => {
    const left = `${event.clientX + window.pageXOffset}px`;
    const top =  `${event.clientY + window.pageYOffset}px`;
    const positionedEl = <div className="infragram" style={{
        position: 'absolute',
        left, top,
    }}>
        {el}
    </div>;
    clickHandler.setState({el: positionedEl, left, top});
}

export const getPosition = () => {
    return {
        left: clickHandler.state.left,
        top: clickHandler.state.top,
    };
}

export const clear = () => {
    clickHandler.setState({el: null});
}

export const viewVisible = () => {
    return (clickHandler || {state: {}}).state.el !== null;
}
