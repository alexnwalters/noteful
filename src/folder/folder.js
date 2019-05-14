import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './folder.css'

class Folder extends Component{

    static contextType = NoteContext;

    render() {
        const folders = this.context.folders
        return (
            <div className='nav'>
                <ul className='folders'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <button>Add Folder</button>
            </div>
        )
    }
}

export default withRouter(Folder)