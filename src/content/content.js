import React, { Component } from 'react';
import './content.css';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';


class Content extends Component {

    static contextType = NoteContext;

    render() {
        const content = this.context.notes.find(note => note.id == this.props.match.params.noteId);
        console.log(content)
        return (
            <div className='content'>
                <h2>{content.name}</h2>
                <p>{content.content}</p>
                <button>
                    <Link to={`/update/${content.id}`}>
                        Update
                    </Link>
                </button>
                <button
                    onClick={() => {
                        this.context.deleteRequest(
                            content.id,
                            this.context.deleteNote
                        )
                        this.props.history.push('/')
                    }}
                    >
                    Delete
                </button>
            </div>
        )
    }
}

export default Content
