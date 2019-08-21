import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './note.css';

class Note extends Component {
    static defaultProps = {
        match: {
            path: '',
        }
    }


    static contextType = NoteContext;

    render() {
        const notes = this.props.match.path === '/'
                ? this.context.notes
                : this.context.notes.filter(note => note.folder_id == this.props.match.params.folderId)

        return (
            <div>
                <ul className='notes'>
                    {notes.map(note =>
                        <li key={note.id}>
                            <Link to={`/notes/${note.id}`}>
                                {note.name}
                            </Link>
                            <div className='note-details'>
                                <p>Modified: {note.date_modified}</p>
                                <button>
                                    <Link to={`/update/${note.id}`}>
                                        Update
                                    </Link>
                                </button>
                                <button
                                    onClick={() => {
                                        this.context.deleteRequest(
                                            note.id,
                                            this.context.deleteNote
                                        )
                                    }}
                                    >
                                    Delete
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
                <div>
                    <Link to={'/addnote'}>
                        Add Note
                    </Link>
                </div>
            </div>
        )
    }
}

export default Note