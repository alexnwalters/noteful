import React, { Component } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './Folder.css'

class Folder extends Component{

    static contextType = NoteContext;

    render() {
        const folders = this.context.folders
        return (
            <div className='nav'>
                <ul className='folders'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <NavLink to={`/folders/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div>
                    <Link to={'/addfolder'}>
                        Add Folder
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Folder)