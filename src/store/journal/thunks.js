import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNotes, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth;

        const newNote = {
            title: 'Nueva Nota',
            body: 'No description',
            date: new Date().getTime(),
        }

        const userCollection = collection( FirebaseDB, `${ uid }/journal/notas`)
        const newDoc = doc( userCollection );
        console.log( newDoc.id )
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ))
        dispatch( setActiveNotes( newNote ) )

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('uid not found');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        if(!uid) throw new Error('uid not found');

        const noteToFireStore = { ...note }       
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`)
        await setDoc( docRef, noteToFireStore, { merge: true } )

        dispatch( updateNote( note ) )
    }
}

export const startUploadingFiles = ( files=[] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );
        await fileUpload( files[0] ); 

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) )

    }

}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ note.id }`)
        await deleteDoc( docRef );
        
        dispatch( deleteNoteById( note.id ));

    }
}