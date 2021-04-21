import "./App.css";
import React from "react";
import IntroForm from "./components/IntroForm";
import Notes from "./components/Notes";
import PageNotFound from "./components/PageNotFound";
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

      this.setState({
        notes: [...this.state.notes, noteOBJ],
      });
    } catch (error) {
      console.error("error creating note", error);
    }
  };

  delNote = (id) => {
    const tempNotes = this.state.notes.filter((note) => id !== note.id);
    this.setState({
      notes: [...tempNotes],
    });
  };

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
              />
            )}
          />
          <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
