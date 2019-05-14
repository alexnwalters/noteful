import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './note.css';

class Note extends Component {

    static contextType = NoteContext;

    render() {
        const notes = this.props.match.path === '/'
                ? this.context.notes
                : this.context.notes.filter(note => note.folderId === this.props.match.params.folderId)

        return (
            <ul className='notes'>
                {notes.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                        <div className='note-details'>
                            <p>Modified: {note.modified}</p>
                            <button
                                onClick={() => {
                                    this.context.deleteRequest(
                                        note.id,
                                        this.context.deleteNote
                                    )
                                }}
                                >
                                Delete Note
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

export default Note