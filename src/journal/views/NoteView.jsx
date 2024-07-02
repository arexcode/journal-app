import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, Icon, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNotes } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import 'sweetalert2/dist/sweetalert2.css'
import Swal from "sweetalert2";

export function NoteView(){

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )
    const dispatch = useDispatch();

    const { title, body, date, onInputChanged, formState } = useForm( note )

    const dateString = useMemo(() => {
        const newDate = new Date( date )
        return newDate.toUTCString();
    },[ date ])


    const fileInputRef = useRef();

    const handleSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const handleFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) )
    }

    const handleDeleteNote = () => {
        dispatch( startDeletingNote());
    }

    useEffect(() => {
        dispatch( setActiveNotes( formState ) )
    },[ formState ])

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }
    }, [ messageSaved ])
    
    return(
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 }> { dateString } </Typography>
            </Grid>

            <Grid item>

                <input
                ref={ fileInputRef }
                type="file"
                multiple
                onChange={ handleFileInputChange }
                style={{ display: 'none' }}
                />

                <IconButton
                color="primary"
                disabled={ isSaving } 
                onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={ isSaving  }
                    onClick={ handleSaveNote }
                    color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ mr:1, fontSize: 30 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                value={ title }
                onChange={ onInputChanged }
                name="title"
                variant="filled"
                type="text"
                placeholder="Título"
                label="Título"
                sx={{ border: 'none', mb:1 }}
                fullWidth
                />

                <TextField
                value={ body }
                onChange={ onInputChanged }
                name="body"
                variant="filled"
                type="text"
                placeholder="Qué pasó hoy?"
                multiline
                minRows={ 5 }
                fullWidth
                />
            </Grid>

            <Grid container justifyContent={'end'}>
                <Button onClick={ handleDeleteNote } sx={{
                    color:'red',
                    mt:2,
                }}>
                    <DeleteOutline sx={{ color:'red' }} />
                    Eliminar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}

