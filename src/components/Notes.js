import React, { Component } from 'react';
import { notesRef } from '../firebase';

class Notes extends Component {
    state = {
        userNotes: [],
        notes: []
    }

    componentDidMount = () => {
        console.log("inCDM");
        this.props.getNotes();
        this.getUserNotes(this.props.match.params.userId)
        
      };

    getUserNotes = async userId => {
        try {
            const userNotes = await notesRef
            .where("note.user", "==", userId) 
            .orderBy("note.createdAt")
            .get()
            userNotes.forEach(note => {
                const data = note.data().note
                    console.log("data", data);
                const noteOBJ = {
                    id: note.id,
                    ...data
                }
                this.setState({
                    userNotes: [...this.state.userNotes, noteOBJ]
                })
            });
        } catch (error) {
            console.log("Error fetching notes in Notes:", error)
        }
        console.log("userNotes", this.state.userNotes);
    }

    deleteNote = async e => {
        console.log("e", e);
        try {
            
            const noteId = e
            const note = await notesRef.doc(noteId)
            note.delete()
        } catch (error) {
            console.log("Error while deleting", error)
        }
    }

    render() {
        return (
            <div>
                <span>UserId: {this.props.match.params.userId}</span>
                <div className="notesWrapper">
                {this.state.userNotes.map(el=>{
                    return(
                        <div key={el.id} className="note">
                            <div>{el.id}</div>
                            <div>{el.title}</div>
                            <div>{el.body}</div>
                            <button 
                            /*onClick={()=>this.props.delNote(el.id)}>*/
                            onClick={()=>this.deleteNote(el.id)}>
                                &times;
                                 </button>
                        
                        </div>
                    )
                })}
                </div>
            </div>
        );
    }
}

export default Notes;