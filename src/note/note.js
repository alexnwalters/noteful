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
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                        <div>
                            <p>Date modified: {note.modified}</p>
                            <button>Delete Note</button>
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

export default Note