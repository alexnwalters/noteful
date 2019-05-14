import React, { Component } from 'react';
import { Route, Link,  } from 'react-router-dom';
import Folder from './folder/folder';
import Note from './note/note';
import Content from './content/content';
import NavBack from './navback/navback';
import STORE from './dummy-store';
import './App.css';
import NoteContext from './NoteContext'

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  }

  setfolders = (folders) => {
    this.setState({
      folders,
      error: null,
    })
  }

  setnotes = (notes) => {
    this.setState({
      notes,
      error: null,
    })
  }

  deleteRequest = (noteId, callback ) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res =>{
      if(!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }
  

  componentDidMount () {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res =>{
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(this.setfolders)
    .catch(error => this.setState({ error }))

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res =>{
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(this.setnotes)
    .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteRequest: this.deleteRequest,
      deleteNote: this.deleteNote
    }

    return (
      <div className='App'>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <div className='container'>
          <NoteContext.Provider value={contextValue}>
          <nav className='sidebar'>
            <Route
              exact path='/'
              component={Folder}
            />
            <Route
              path='/folder'
              component={Folder}
            />
            <Route
              path='/note/:noteId'
              component={NavBack}
            />
          </nav>
          <main className='main'>
            <Route
              exact path='/'
              component={Note}
            />
            <Route
                path='/folder/:folderId'
                component={Note}
            />
            <Route
                path='/note/:noteId'
                component={Content}
            />
          </main>
          </NoteContext.Provider>
        </div>      
      </div>
    )
  }
}

export default App