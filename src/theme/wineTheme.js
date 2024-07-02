import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const wineTheme = createTheme({
    palette: {
        primary: {
            main: '#800000'
        },
        secondary: {
            main: '#FF6347'
        },
        error: {
            main: red.A400,
        }
    }
})