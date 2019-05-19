import React, { Component } from 'react'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'

class AddFolder extends Component {

    static contextType = NoteContext

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.key,
            name: '',
        }
    }

    addName(name) {
        this.setState({
            name
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const folder = (({id, name}) => ({id, name}))(this.state);
        
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(folder),
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
            });
            this.context.handleAddFolder(folder);
            this.props.history.push('/');
        })
        .catch(error => this.setState({ error }))
    }
    
    
    render() {
        const error = this.state.error 
          ? <div className="error">{this.state.error}</div>
          : "";
        
        return(
            <div>
                <h2>Create a Folder</h2>
                {error}
                <form className='addfolder__form' onSubmit={e => this.handleSubmit(e)} required>
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
                    <div className='addfolder__buttons'>
                        <button type='submit'>Add Folder</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFolder