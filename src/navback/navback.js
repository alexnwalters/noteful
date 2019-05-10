import React from 'react';
import './navback.css';

export default function NavBack(props) {
    const name = props.folders.find(folder => folder.id === props.note.folderId)

    return (
        <div className='folder-name'>
            <button onClick={props.onClickBack}>Back</button>
            <h2>{name.name}</h2>
        </div>
    )
}
