import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout";
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth";

const formData = {
    displayName: '',
    email: '',
    password: ''
}

const formValidations = {
    email: [ (value) => value.includes('@') , 'El correo debe de contener un @'],
    password: [ (value) => value.length >= 6, 'La contraseña debe de tener al menos 6 caracteres'],
    displayName: [ (value) => value.trim().length > 0, 'El nombre no puede estar vacio']
}

export function RegisterPage(){

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false)

    const { status, errorMessage } = useSelector( state => state.auth )

    const isCheckingAuthentication = useMemo(() => status === 'checking' ,[ status ])

    const { displayName, email, password, onInputChanged, formState, displayNameValid, emailValid, passwordValid, isFormValid}
    = useForm( formData, formValidations );
    
    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted( true )

        if( !isFormValid ) return;
        dispatch( startCreatingUserWithEmailAndPassword( formState ) )
    }
    
    return(
        <AuthLayout title="Crear Cuenta"> 
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>
                        <Grid item xs={ 12 } sx={{ mt:2 }}>
                            <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombe completo"
                            value={ displayName }
                            name="displayName"
                            onChange={ onInputChanged }
                            fullWidth
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid } 
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt:2 }}>
                            <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            value={ email }
                            name="email"
                            onChange={ onInputChanged }
                            fullWidth
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid } 
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt:2 }}>
                            <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            value={ password }
                            name="password"
                            onChange={ onInputChanged }
                            fullWidth
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                            />
                        </Grid>
                            
                        <Grid container spacing={ 1 } sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                                <Alert severity="error">
                                { errorMessage }
                                </Alert>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 12 }>
                                <Button
                                disabled={ isCheckingAuthentication }
                                type="submit"
                                variant="contained" fullWidth>
                                    Crear cuenta
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                           <Typography sx={{ mr:1 }}> Ya tengo una cuenta </Typography>
                           <Link component={ RouterLink } color='inherit' to='/auth/login'>
                            Ingresar
                           </Link>
                        </Grid>

                    </Grid>
                </form>
        </AuthLayout>
    )
}