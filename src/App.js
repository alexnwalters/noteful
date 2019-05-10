import React, { Component } from 'react';
import { Route, Link,  } from 'react-router-dom';
import Folder from './folder/folder'
import Note from './note/note'
import Content from './content/content'
import NavBack from './navback/navback'
import STORE from './dummy-store' 
import './App.css';
import { notDeepEqual } from 'assert';

class App extends Component {
  state = {
    STORE
  }

  render() {
    const { folders, notes } = this.state.STORE

    return (
      <div className='App'>
        <header>
          <Link to='/'>Noteful</Link>
        </header>
        <div className='container'>
          <nav className='sidebar'>
            <Route
              exact path='/'
              render={() => <Folder folders={ folders }/>}
            />
            <Route
              path='/folder'
              render={() => <Folder folders={ folders }/>}
            />
            <Route
              path='/note/:noteId'
              render={(routeProps) =>       
                <NavBack 
                  folders={ folders }
                  note={notes.find(note => note.id === routeProps.match.params.noteId)}
                  onClickBack={() => {routeProps.history.goBack()}}
                />
              }
            />
          </nav>
          <main className='main'>
            <Route
              exact path='/'
              render={() => <Note notes={ notes } />}
            />
            <Route
                path='/folder/:folderId'
                render={(routeProps) =>
                    <Note notes={notes.filter(note => note.folderId === routeProps.match.params.folderId)}/>
                }
            />
            <Route
                path='/note/:noteId'
                render={(routeProps) =>
                  <>
                  <Note notes={notes.filter(note => note.id === routeProps.match.params.noteId)}/>
                  <Content content={notes.find(note => note.id === routeProps.match.params.noteId)}/>
                  </>
                }
            />
          </main>
        </div>      
      </div>
    )
  }
}

export default App