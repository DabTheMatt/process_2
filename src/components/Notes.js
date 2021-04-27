import React, { Component } from 'react';
import { notesRef } from '../firebase';
import NoteModel from "../components/NoteModel"

class Notes extends Component {
    state = {
        userNotes: [],
        notes: [],
        modelOpen: false,
        elTitle: "",
        elBody: "",
        elId: "",
        elLabels: []
        
    }

    toggleModel = (el) => {
        this.setState({
            modelOpen: !this.state.modelOpen
        })
        console.log("modelOpen", this.state.modelOpen);
        console.log("toggleEl", el.labels);
        
        this.setState({
            elTitle: el.title,
            elBody: el.body,
            elId: el.id,
            elLabels: el.labels
        })
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
        
        try {
            
            const noteId = e
            const note = await notesRef.doc(noteId)
            note.delete()
        } catch (error) {
            console.log("Error while deleting", error)
        }
    }

    updateTitle = (e) => {
        
        const noteId = e.target.id
        const newTitle = e.target.value
        if(noteId && newTitle) {
            this.props.updateNotes(noteId, newTitle)
        }

    }

    updateBody = async (noteId, newBody, labels) => {
        try {
          console.log("app upd body", noteId, newBody, labels);
          const notes = await notesRef.doc(noteId)
          notes.update({
            "note.body": newBody,
            "note.labels": labels
          })
          this.setState({
              userNotes: this.state.userNotes
          })
        } catch (error) {
          console.log("error updating body", error);
        }
        
        
      }

      updateNotes = async (noteId, newBody) => {
        
        try {
          const notes = await notesRef.doc(noteId)
          notes.update({
            "note.body": newBody
          })
    
    
        } catch (error) {
          console.log("Error updating title", error);
        }
      }

    render() {
        return (
            <React.Fragment>
            <div>
                <span>UserId: {this.props.match.params.userId}</span>
                <div className="notesWrapper">
                {this.state.userNotes.map(el=>{
                    return(
                        <div key={el.id} className="note">
                            <div 
                            onClick={()=>this.toggleModel(el)}
                            >{el.id}</div>
                            <input
                            className="noteTitle"
                            type="text"
                            name="noteTitle"
                            onChange={this.updateTitle}
                            defaultValue={el.title}
                            id={el.id}
                            
                            />
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
            <NoteModel 
            toggleModel={(el)=>this.toggleModel(el)}
            modelOpen={this.state.modelOpen}
            userNotes={this.state.userNotes}
            elTitle={this.state.elTitle}
            elBody={this.state.elBody}
            elId={this.state.elId}
            elLabels={this.state.elLabels}
            updateBody={this.updateBody}
            />
            </React.Fragment>
        );
    }
}

export default Notes;