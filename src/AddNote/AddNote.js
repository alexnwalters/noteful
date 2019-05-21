import React, { Component } from 'react'
import NoteContext from '../NoteContext'

class AddNote extends Component {

    static contextType = NoteContext

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.key,
            name: '',
            content: '',
            folderId: '',
            modified: Date(),
            error: null
        }
    }

    addName(name) {
        this.setState({
            name
        });
    }

    addContent(content) {
        this.setState({
            content
        });
    }

    addFolderId(folderId) {
        this.setState({
            folderId
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const  {id, name, content, folderId, modified} = this.state;
        const note = {
            id, 
            name, 
            content, 
            folderId, 
            modified
        };

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res =>{
            if(!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                id: '',
                name: '',
                content: '',
                folderId: '',
                modified: ''
            });
            this.context.handleAddNote(note);
            this.props.history.push('/');
        })
        .catch(error => this.setState({ error: error.message }))
    }
    
    
    render() {
        const folders = this.context.folders;
        const error = this.state.error 
          ? <div className="error">Something went wrong: {this.state.error}</div>
          : "";
        
        return(
            <div>
                <h2>Create a Note</h2>
                {error}
                <form className='addnote__form' onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name:</label>
                        <div>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={this.state.name}
                                onChange={e => this.addName(e.target.value)} 
                                required/>
                        </div>
                    <label htmlFor='content'>Content:</label>
                        <div>
                            <textarea
                                name='content'
                                id='content'
                                value={this.state.content}
                                onChange={e => this.addContent(e.target.value)}
                                required/>
                        </div>
                    <label htmlFor='folder'>Folder:</label>
                        <div>
                            <select value={this.state.FolderId} onChange={e => this.addFolderId(e.target.value)} required>
                                <option disabled='' value=''>...</option>
                                {folders.map(folder =>
                                    <option
                                        key={folder.id}
                                        value={folder.id}
                                        >
                                            {folder.name}
                                    </option>
                                )}
                            </select>
                            </div>
                    <div className='addnote__buttons'>
                        <button type='submit'>Add Note</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNote