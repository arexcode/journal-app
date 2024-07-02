import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme, wineTheme, blueTheme} from "./";

export function AppTheme({ children }){
    return(
    <ThemeProvider theme={ blueTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
    )
}