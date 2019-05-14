import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteRequest: () => {},
    deleteNote: () => {}
})

export default NoteContext