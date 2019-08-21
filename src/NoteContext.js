import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteRequest: () => {},
    deleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {},
    updateNote: () => {}
})

export default NoteContext