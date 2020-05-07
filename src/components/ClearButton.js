import React from "react";

const clear = () => {
    localStorage.removeItem("infragramState");
    window.location.replace("/");
    window.location.reload();
};

export default class ClearButton extends React.Component {
    render() {
        return <span style={{position: "absolute"}} className="do-bulma infragram">
            <a className="button is-info" onClick={clear}>
                Clear
            </a>
        </span>;
    }
}
