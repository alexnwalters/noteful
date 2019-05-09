import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Folder extends Component{
    static defaultProps = {
        folders: []
    };

    render() {
        const { folders } = this.props
        return (
            <>
                <ul className='Folder'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <button>Add Folder</button>
            </>
        )
    }
}

export default withRouter(Folder)