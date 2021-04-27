import "./App.css";
import React from "react";
import IntroForm from "./components/IntroForm";
import Notes from "./components/Notes";
import PageNotFound from "./components/PageNotFound";
import NoteModel from "./components/NoteModel";
import { dataRef, notesRef } from "./firebase";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    notes: [],
  };

  getNotes = async (userId) => {
    try {
      this.setState({
        notes: [],
      });
      const notes = await notesRef.get();
      notes.forEach((note) => {
        const data = note.data().note;
        const noteOBJ = {
          id: note.id,
          ...data,
        };
        this.setState({
          notes: [...this.state.notes, noteOBJ],
        });
      });
    } catch (error) {
      console.error("Error getting notes", error);
    }
  };

  createNote = async (note) => {
    try {
      const newNote = await notesRef.add({ note });
      const noteOBJ = {
        id: newNote.id,
        ...note,
      };
      console.log("newNote id", newNote.id);
      this.setState({
        notes: [...this.state.notes, noteOBJ],
      });
    } catch (error) {
      console.error("error creating note", error);
    }
    console.log("newnotes", this.state.notes);
  };

  delNote = (id) => {
    const tempNotes = this.state.notes.filter((note) => id !== note.id);
    this.setState({
      notes: [...tempNotes],
    });
  };

  updateNotes = async (noteId, newTitle) => {
    console.log(noteId, newTitle);
    try {
      const notes = await notesRef.doc(noteId)
      notes.update({
        "note.title": newTitle
      })


    } catch (error) {
      console.log("Error updating title", error);
    }
  }



  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/:userId"
            render={(props) => 
            <IntroForm 
            {...props}
              createNote={this.createNote} />}
          />

          <Route
            path="/:userId/notes"
            render={(props) => (
            <Notes
            {...props}
              notes={this.state.notes}
              delNote={this.delNote}
              getNotes={this.getNotes}
              updateNotes={this.updateNotes}
              updateBody={this.updateBody}
              />
            )}
          />
          <Route component={PageNotFound} />
          </Switch>
          <NoteModel 
          
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
