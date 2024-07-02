import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const sigInWithGoogle = async() => {
    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result )

        const { displayName, email, photoURL, uid } = result.user;

        return({
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        })

    } catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return({
            ok: false,
            errorCode,
            errorMessage
        })
    }

}

// Función para registrar un usuario con correo y contraseña
export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
    try{

        const res = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = res.user
        
        await updateProfile( FirebaseAuth.currentUser, { displayName })

        return({
            ok: true,
            uid, photoURL, email, displayName
        })

    } catch(error){
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
    
    try{
        const res = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, displayName, photoURL } = res.user

        return({
            ok: true,
            uid, email, displayName, photoURL
        })

    } catch(error){
        return({
            ok: false,
            errorMessage: error.message
        })
        
    }   
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}