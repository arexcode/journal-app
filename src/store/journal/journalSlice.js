
import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({

name: 'journal',

initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
},

reducers: {

    savingNewNote: (state) => {
        state.isSaving = true;
    },

    addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
    },

    setActiveNotes: (state, action) => {
        state.active = action.payload
        state.messageSaved = ''
    },

    setNotes:  (state, action ) => {
        state.notes = action.payload
    },

    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = ''
    },

    updateNote: ( state, action ) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => note.id === action.payload.id ? action.payload : note) 
        state.messageSaved = `${ action.payload.title }, actualizada con éxito!`
    },

    deleteNoteById: ( state, action ) => {
        state.notes = state.notes.filter( note => note.id !== action.payload )
        state.active = null;
    },

    clearNotesLogout: ( state ) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
    },

    setPhotosToActiveNote: (state, action) => {
        state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]
        state.isSaving = false;
    }

},
})

export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNotes,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
    } = journalSlice.actions