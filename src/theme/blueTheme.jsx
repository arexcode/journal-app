import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: blue[800]
        },
        secondary:{
            main: blue[600]
        },
        error:{
            main: red.A400
        }
    }
})