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
        selectedLabels: [],
         elTitle: this.props.elTitle,
         elBody: this.props.elBody,
         elLabels: this.props.elLabels,
         labels: []
    }

componentDidMount=()=>{
    console.log("elTitle", this.props.elTitle);
    console.log("clcikedElProps", this.props.clickedEl);
    console.log("elId in model", this.props.elId);
    console.log("labels in model", this.props.elLabels);

}

updateBody = (id, body, labels) => {
        console.log("eee", id, body);
    const noteId = id
    const newBody = body
    console.log("newBody", newBody);
    if(noteId && newBody) {
        this.props.updateBody(noteId, newBody, labels)
    }

}

handleSubmit = (e, id, body, labels) => {
    
    e.preventDefault();
    
    this.updateBody(id, body, labels);

    this.props.toggleModel(e, id, labels);
    this.setState({
        labels: this.props.elLabels
    })
}

setLabel = label => {
    const labels = [...this.state.selectedLabels]
    if(labels.includes(label)) {
        const newLabels = labels.filter((element) => {
            return element !==label
        })
        this.setState({
            selectedLabels: newLabels
        })
    } else {
        labels.push(label)
        this.setState({
            selectedLabels: labels
        })
    }
}

    render() {
        return (
            <div className="noteModelWrapper"
            style={{display: this.props.modelOpen ? "block" : "none"}}
            >
                <div className="noteModelBody">
                    <form onSubmit={(e)=>this.handleSubmit(e, e.target.body.id, e.target.body.value, this.state.selectedLabels)}>
                        <div>
                            <h2>{this.props.elTitle}</h2>
                            <span 
                            className="noteModelCloseBtn"
                            onClick={this.props.toggleModel}
                            >&times;</span>
                            <p>add / remove labels:</p>
                            <div className="labelWrapper">
                            {this.state.availablelabels.map(label => {
                                return (
                                    <div 
                                    onClick={()=>this.setLabel(label)}
                                    key={label}
                                    className="label" 
                                    style={{background: label}}></div>
                                )
                            })}
                            </div>
                            <hr />
                            <div className="noteEditArea">
                                <span className="editIcon">&#x270E;</span>
                                <input 
                                name="body"
                                id={this.props.elId}
                                className="noteEditAreaInput"
                                defaultValue={this.props.elBody}
                                />

                            </div>
                            <div>
                                <div className="labelSelected labelWrapper">
                                    <span>{`labels:   `}</span>
                                    {this.state.selectedLabels.map(label => {
                                return (
                                    <div 
                                    onClick={()=>this.setLabel(label)}
                                    key={label}
                                    className="label" 
                                    style={{background: label}}></div>
                                )
                            })}
                                </div>

                            </div>
                            <button >save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteModel;