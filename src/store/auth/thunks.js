import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, sigInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        
        dispatch( checkingCredentials() );
        
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )
        const result = await sigInWithGoogle()
        if( !result.ok ) return dispatch( logout( result.errorMessage ) ) 

        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName })
    
        if( !ok ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid, displayName, email, photoURL }) )

    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailAndPassword({ email, password })
        
        if( !ok ) return dispatch( logout({ errorMessage }) )

        dispatch( login({ uid, email, displayName, photoURL }) )

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase(); 
        dispatch( clearNotesLogout() )
        dispatch( logout() )
        
    }
}
