import React, { Component } from 'react';
import './content.css';
import NoteContext from '../NoteContext';


class Content extends Component {

    static contextType = NoteContext;

    render() {
        const content = this.context.notes.find(note => note.id === this.props.match.params.noteId);

        return (
            <div className='content'>
                <p>{content.content}</p>
                <button
                    onClick={() => {
                        this.context.deleteRequest(
                            content.id,
                            this.context.deleteNote
                        )
                        this.props.history.push('/')
                    }}
                    >
                    Delete Note
                </button>
            </div>
        )
    }
}

export default Content
