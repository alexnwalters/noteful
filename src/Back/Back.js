import React from 'react'

export default function Back(props) {
    return(
        <button onClick={() => {props.history.goBack()}}>Back</button>
    )
}