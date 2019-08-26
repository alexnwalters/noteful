import React, { Component } from 'react';
import NoteContext from '../NoteContext'

class FolderName extends Component {
   
    static contextType = NoteContext;

    render() {
        const note = this.context.notes.find(note => note.id == this.props.match.params.noteId);
        const folderName = this.context.folders.find(folder => folder.id == note.folder_id)

        return (            
            <div className='folder-name'>
                <button onClick={() => {this.props.history.goBack()}}>Back</button>
                <h2>{folderName.name}</h2>
            </div>
        )
    }
}

export default FolderName