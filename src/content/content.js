import React from 'react';
import './content.css';

export default function Content(props) {
    const {content} = props

    return (
        <div className='content'>
            <p>{content.content}</p>
        </div>
    )
}
