import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    note: [],
    content: [],
    onClickBack: () => {},
})

export default NoteContext