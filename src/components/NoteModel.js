import React, { Component } from 'react';

class NoteModel extends Component {
    state={
        availablelabels: [
            "#264653",
            "#2a9d8f",
            "#e9c46a",
            "#f4a261",
            "#e76f51",
        ],
        selectedLabels: []
    }

    render() {
        return (
            <div className="noteModelWrapper">
                <div className="noteModelBody">
                    <form>
                        <div>
                            <span className="noteModelCloseBtn">&times;</span>
                            <p>add / remove labels:</p>
                            <div className="labelWrapper">
                            {this.state.availablelabels.map(label => {
                                return (
                                    <div className="label" style={{background: label}}></div>
                                )
                            })}
                            </div>
                            <hr />
                            <div className="noteEditArea">
                                <span className="editIcon">&#x270E;</span>
                                <input className="noteEditAreaInput"/>

                            </div>
                            <div>
                                <p className="labelSelected">
                                    labels:
                                </p>

                            </div>
                            <button type="submit">save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteModel;