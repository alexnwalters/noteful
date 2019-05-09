import React from 'react';
import './content.css';

export default function Content(props) {
    const {content} = props

    return (
        <div className='content'>
            <h2>{content.name}</h2>
            <p>Modified {content.modified}</p>
            <p>{content.content}</p>
        </div>
    )
}
