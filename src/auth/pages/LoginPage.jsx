import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
    email: '',
    password: ''
}

export function LoginPage(){

    const { status, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === 'checking', [ status ])
    
    const { email, password, onInputChanged } = useForm( formData )

    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startLoginWithEmailAndPassword({ email, password }) )
    }

    const handleGoogleSignIn = () => {
        dispatch( startGoogleSignIn() )
    }

    return(
        
        <AuthLayout title="Login">
            <form className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt:2 }}>
                            <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            name="email"
                            onChange={ onInputChanged }
                            value={ email }
                            fullWidth
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt:2 }}>
                            <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            name="password"
                            onChange={ onInputChanged }
                            value={ password}
                            fullWidth
                            />
                        </Grid>
                            
                        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                            <Grid item xs={ 12 } display={ !errorMessage && 'none'}>
                                <Alert severity="error"> { errorMessage } </Alert>
                            </Grid>
                            
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                disabled={ isAuthenticating }    
                                type="submit" variant="contained" fullWidth onClick={ handleSubmit }>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                disabled={ isAuthenticating }
                                variant="contained" fullWidth 
                                onClick={ handleGoogleSignIn }>
                                    <Google />
                                    <Typography sx={{ ml:1 }}> Google </Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link component={ RouterLink } color='inherit' to='/auth/register'>
                            Crear una cuenta
                            </Link>
                        </Grid>

                    </Grid>
                </form>
        </AuthLayout>
    )
}