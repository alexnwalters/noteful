import React, { Component } from 'react'
import NoteContext from '../NoteContext'

class UpdateNote extends Component {

    static contextType = NoteContext

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            folder_id: '',
            error: null
        }
    }

    handleChangeName = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleChangeContent = e => {
        this.setState({
            content: e.target.value
        });
    }

    handleChangeFolder = e => {
        this.setState({
            folder_id: e.target.value
        });
    }

    resetFields = (newFields) => {
        this.setState({
          name: newFields.name || '',
          content: newFields.content || '',
          folder_id: newFields.folder_id || '',
        })
      }

    handleSubmit = e => {
        e.preventDefault();

        const noteId = this.props.match.params.noteId
        const  { name, content, folder_id } = this.state;
        const newNote = {
            name, 
            content, 
            folder_id, 
        };

        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'PATCH',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res =>{
            if(!res.ok) {
                throw new Error(res.status)
            }
        })
        .then(() => {
            this.resetFields(newNote)
            this.context.updateNote(newNote);
            this.props.history.push('/');
        })
        .catch(error => this.setState({ error: error.message }))
    }

    componentDidMount() {
        const noteId = this.props.match.params.noteId

        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'GET',
            header: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(error => Promise.reject(error))
            return res.json()
        })
        .then(resData => {
            this.setState({
                name: resData.name,
                content: resData.content,
                folder_id: resData.folder_id
            })
        })
        .catch(error => {
            this.setState({ error })
        })
    }
    
    
    
    render() {
        const { name, content, folder_id } = this.state
        const folders = this.context.folders;
        const error = this.state.error 
          ? <div className="error">Something went wrong: {this.state.error}</div>
          : "";

        return(
            <div>
                <h2>Update Note</h2>
                {error}
                <form className='addnote__form' onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                        <div>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={ name }
                                onChange={this.handleChangeName} 
                                required/>
                        </div>
                    <label htmlFor='content'>Content:</label>
                        <div>
                            <textarea
                                name='content'
                                id='content'
                                value={ content }
                                onChange={this.handleChangeContent}
                                required/>
                        </div>
                    <label htmlFor='folder'>Folder:</label>
                        <div>
                            <select value={ folder_id } onChange={this.handleChangeFolder} required>
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
                        <button type='submit'>Update Note</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateNote