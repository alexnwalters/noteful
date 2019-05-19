import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteRequest: () => {},
    deleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {}
})

export default NoteContext