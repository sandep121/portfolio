import {Box, Button, Container, Stack, Grid, Typography, Paper, Chip} from "@mui/material";
import {hero} from "../constants/hero";
import {skills} from "../constants/skills";
import {projects} from "../constants/projects";
import {site} from "../constants/site";
import {Stat} from "../components/Stat";
import {ArchitectureDiagram} from "../components/ArchitectureDiagram";
import {Link as RouterLink} from "react-router-dom";
import {experience} from "../constants/experienceReport.ts";

export default function Home() {
    return (
        <Container sx={{py: 8}}>
            <Typography variant="h2" fontWeight={800} gutterBottom>
                {hero.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {hero.subtitle}
            </Typography>
            <Grid container spacing={2} sx={{my: 2}}>
                {hero.stats.map((s) => (
                    <Grid key={s.label} size={{xs: 12, sm: 6, md: 4}}>
                        <Stat value={s.value} label={s.label}/>
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" spacing={2} sx={{my: 2}}>
                <Button variant="contained" component={RouterLink} to="/projects">
                    View Projects
                </Button>
                <Button variant="outlined" href={site.contact.resumeUrl}>
                    Download Resume
                </Button>
            </Stack>

            <Box id="about" sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom>About</Typography>
                <Typography color="text.secondary">
                    {hero.summary}
                </Typography>
            </Box>

            <Box sx={{mt: 6}}>
                <Typography variant="h5" gutterBottom>Skills</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {skills.primary.map((s) => (
                        <Button key={s} size="small" variant="outlined" sx={{mr: 1, mb: 1}}>{s}</Button>
                    ))}
                </Stack>
            </Box>

            <Box sx={{mt: 8}}>
                <Typography variant="h5" gutterBottom>Featured Architecture</Typography>
                <ArchitectureDiagram steps={projects.find(p => p.featured)?.architecture}/>
            </Box>

            <Box sx={{mt: 8}}>
                <Typography variant="h3" gutterBottom>Projects</Typography>
                <Grid container spacing={3}>
                    {projects.map((p) => (
                        <Grid size={{xs: 24, md: 12}} key={p.slug}>
                            <Paper variant="outlined" sx={{p: 3}}>
                                <Typography variant="h5">{p.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{p.timeframe} • {p.role}</Typography>
                                <Typography sx={{mt: 1}}>{p.overview}</Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{mt: 1}}>
                                    {p.stack.map((s) => <Chip key={s} size="small" label={s}/>)}
                                </Stack>
                                <ul>
                                    {p.highlights.map((h, i) => <li key={i}><Typography variant="body2">{h}</Typography>
                                    </li>)}
                                </ul>
                                <ArchitectureDiagram steps={p.architecture}/>
                                {/*<Stack direction="row" spacing={2} sx={{ mt: 1 }}>*/}
                                {/*  {p.links?.map((l) => <Link key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label}</Link>)}*/}
                                {/*</Stack>*/}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{mt: 8}}>
                <Typography variant="h3" gutterBottom>Experience</Typography>
                <Stack spacing={3}>
                    {experience.map((e, idx) => (
                        <Paper key={idx} variant="outlined" sx={{p: 3}}>
                            <Typography variant="h6">{e.title} • {e.company}</Typography>
                            <Typography variant="body2" color="text.secondary">{e.start} — {e.end}</Typography>
                            <ul>
                                {e.bullets.map((b, i) => <li key={i}><Typography variant="body2">{b}</Typography></li>)}
                            </ul>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {e.tech.map((t) => <Chip key={t} size="small" label={t}/>)}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            <Box id="contact" sx={{mt: 10}}>
                <Typography variant="h4" gutterBottom>Contact</Typography>
                <Typography>Email: {site.contact.email} • Phone: {site.contact.phone}</Typography>
            </Box>
        </Container>
    );
}
