import React, { Component } from 'react';
import Notes from "../components/Notes"

class IntroForm extends Component {
    state={
        title: "",
        body: ""
    }

handleTitleChange=(e)=>{
    this.setState({
        title: e.target.value
    })
}

handleBodyChange=(e)=>{
    this.setState({
        body: e.target.value
    })
}

handleSubmit=(e, title, body)=>{
    e.preventDefault()
    
    const note = {
        title: title,
        body: body,
        user: this.props.match.params.userId,
        createdAt: new Date(),
        labels: []
        
    }
    console.log(note);
    this.props.createNote(note)
    this.setState({
        title: "",
        body: "",
        
    })
    console.log("userId:", this.props.match.params.userId);
}


    render() {
        return (
            <div>
                <form 
                className="introForm"
                onSubmit={(e)=>this.handleSubmit(e, e.target.title.value, e.target.body.value)}
                >
                    <label>Create note</label>
                    <br/>
                    <input
                    id="title"
                    type="text"
                    placeholder="title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    />
                    <br/>
                    <input
                    id="body"
                    type="text"
                    placeholder="body"
                    value={this.state.body}
                    onChange={this.handleBodyChange}
                    />
                    <br/>
                    <button>Create</button>
                </form>
                
            </div>
        );
    }
}

export default IntroForm;