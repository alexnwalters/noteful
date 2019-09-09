import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import config from './config'
import Folder from './Folder/Folder';
import Note from './Note/Note';
import Content from './Content/Content';
import NoteContext from './NoteContext'
import AddFolder from './AddFolder/AddFolder';
import FolderName from './FolderName/FolderName';
import Back from './Back/Back'
import AddNote from './AddNote/AddNote'
import NotefulError from './NotefulError/NotefulError';
import UpdateNote from './UpdateNote/UpdateNote'

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
    fetch(config.API_ENDPOINT + `/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `${config.API_KEY}`
      }
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

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    })
  }

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    })
  }
  

  componentDidMount () {
    fetch(config.API_ENDPOINT + `/api/folders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `${config.API_KEY}`
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

    fetch(config.API_ENDPOINT + `/api/notes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `${config.API_KEY}`
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

  // componentDidUpdate () {
  //   fetch(config.API_ENDPOINT + `/api/notes`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `${config.API_KEY}`
  //     }
  //   })
  //   .then(res =>{
  //     if(!res.ok) {
  //       throw new Error(res.status)
  //     }
  //     return res.json()
  //   })
  //   .then(this.setnotes)
  //   .catch(error => this.setState({ error }))
  // }

  updateNote = updateNote => {
    this.setState({
      notes: this.state.notes.map(note =>
        (note.id !== updateNote.id) ? note : updateNote
      )
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteRequest: this.deleteRequest,
      deleteNote: this.deleteNote,
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
      updateNote: this.updateNote
    }

    return (
      <div className='App'>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <div className='container'>
          <NoteContext.Provider value={contextValue}>
          <div>
            
          </div>
          <NotefulError>
            <nav className='sidebar'>
              <Route
                exact path='/'
                component={Folder}
              />
              <Route
                path='/folders'
                component={Folder}
              />
              <Route
                path='/notes/:noteId'
                component={FolderName}
              />
              <Route
                path = { ['/addfolder', '/addnote', '/update'] }
                component={Back}
              />
            </nav>
          </NotefulError>
          <NotefulError>
            <main className='main'>
              <Route
                exact path='/'
                component={Note}
              />
              <Route
                path='/folders/:folderId'
                component={Note}
              />
              <Route
                path='/notes/:noteId'
                component={Content}
              />
              <Route
                path='/addfolder'
                component={AddFolder}
              />
              <Route
                path='/addnote'
                component={AddNote}
              />
              <Route
                path='/update/:noteId'
                component={UpdateNote}
              />
            </main>
          </NotefulError>
          </NoteContext.Provider>
        </div>      
      </div>
    )
  }
}

export default App