import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './folder.css'

class Folder extends Component{
    static defaultProps = {
        folders: []
    };

    render() {
        const { folders } = this.props
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