import React from 'react';

export default class FirstUsageTutorial extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.getWindowSize();
        window.addEventListener("resize", this.getWindowSize.bind(this));
    }

    componentDidMount() {
        this.mounted = true;
    }

    getWindowSize() {
        const edits = {width: window.innerWidth, height: window.innerHeight};
        if (this.mounted) this.setState(edits);
        else this.state = edits;
    }

    render() {
        return <span style={{
            position: "absolute",
            textAlign: "center",
            left: `${this.state.width / 2}px`,
            WebkitTransform: "translate(-50%, -50%)",
            top: `${this.state.height / 2}px`,
        }}>
            <h1 className="title is-1">To start, simply click somewhere on the screen.</h1>
        </span>;
    }
}
