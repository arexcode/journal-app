import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined, Note } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";
import { useDispatch, useSelector } from "react-redux";

export function JournalPage(){

    const { active, isSaving } = useSelector( state => state.journal )
    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    return(
        <JournalLayout>
            {
                (!!active)
                ? <NoteView />
                : <NothingSelectedView />
            }

            <IconButton
            disabled={ isSaving } 
            onClick={ onClickNewNote }
            size="large"
            sx={{ color:'white', backgroundColor: 'error.main', ":hover": { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed', right: 50, bottom: 50}}
            >

            <AddOutlined sx={{ fontSize: 30 }} />

            </IconButton>
        </JournalLayout>
    )
}