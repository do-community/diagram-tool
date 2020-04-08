import React from 'react';

class ButtonsView extends React.Component {
    render() {
        const {
            buttons,
            onClick,
        } = this.props;

        return <div className="columns">
            {buttons.map(button => <div key={button.id} onClick={() => onClick(button.id)} className="column">
                <svg viewBox="0 0 60 60">
                    <g transform="scale(0.6)">
                        {button.icon}
                    </g>
                </svg>
                <br />
                <label>{button.name}</label>
            </div>)}
        </div>;
    }
}

export default class FileLikeBrowser extends React.Component {
    render() {
        const {
            // The action for the blank button. Leave as null/undefined for no back button.
            backAction,

            // The title of the current "folder".
            title,

            // A array of buttons ({name: String, icon: React.Element, id: String}). The ID is given to the onClick callback.
            buttons,

            // The callback on the click of an item.
            onClick,
        } = this.props;

        return <div className="file-like-browser">
            <div style={{paddingLeft: 25, paddingRight: 25}}>
                <h3 className="title is-3" style={{textAlign: 'center'}}>
                    <span style={{float: 'left'}}>
                        {
                            backAction ? <a onClick={backAction} style={{color: 'black', cursor: 'default'}}>
                                {'<'}
                            </a> : undefined
                        }
                    </span>
                    {title}
                </h3>
            </div>
            <ButtonsView buttons={buttons} onClick={onClick} />
        </div>;
    }
}
