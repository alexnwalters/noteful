import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Folder from './folder/folder'
import Note from './note/note'
import STORE from './dummy-store' 
import './App.css';

class App extends Component {
  state = {
    STORE
  }

  render() {
    const { folders } = this.state.STORE.folders

    return (
      <div className='App'>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <nav className='sidebar'>
          <Folder folders={this.state.STORE.folders} />
          {/* <Route
            path='/folder/:folderId'
            render={() => {
              return <Folder 
                folders={this.state.STORE.folders}
              />
            }}
          /> */}
        </nav>
        <main>
          <Note notes={this.state.STORE.notes} />
        </main>      
      </div>
    )
  }
}

export default App