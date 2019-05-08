import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './note.css';

class Note extends Component {
    static defaultProps = {
        notes: []
    }

    render() {
        const {notes} = this.props

        return (
            <ul className='notes'>
                {notes.map(note =>
                    <li key={note.id}>
                        <Link to={`./note/${note.folderId}/${note.id}`}>
                            {note.name}
                            <br />
                            Date modified: {note.modified}
                        </Link>
                    </li>
                )}
            </ul>
        )
    }
}

export default Note