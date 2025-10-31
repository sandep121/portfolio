import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { site } from "./constants/site";
import BackgroundGraphics from "./background/BackgroundGraphics";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <BackgroundGraphics />
                <header style={{ padding: 16, display: "flex", gap: 16, position: "relative", zIndex: 1 }}>
                    {site.navigation.map((n) => (
                        <Link key={n.path} to={n.path} style={{ color: "#ddd", textDecoration: "none" }}>{n.label}</Link>
                    ))}
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/experience" element={<Experience />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}