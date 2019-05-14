import React, { Component } from 'react';
import NoteContext from '../NoteContext'
import './navback.css';

class NavBack extends Component {
    
    static contextType = NoteContext;

    render() {
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        const name = this.context.folders.find(folder => folder.id === note.folderId)

        console.log(name);
        return (            
            <div className='folder-name'>
                <button onClick={() => {this.props.history.goBack()}}>Back</button>
                <h2>{name.name}</h2>
            </div>
        )
    }
}

export default NavBack