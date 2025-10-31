import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#80cbc4" },
    background: { default: "#0f1115", paper: "#111318" },
  },
  typography: {
    fontFamily: ['Inter', 'Segoe UI', 'Roboto', 'system-ui'].join(','),
  },
});
