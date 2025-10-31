import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { hero } from "../constants/hero";
import { skills } from "../constants/skills";
import { projects } from "../constants/projects";
import { site } from "../constants/site";
import { Stat } from "../components/Stat";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2" fontWeight={800} gutterBottom>
        {hero.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {hero.subtitle}
      </Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {hero.stats.map((s) => (
          <Grid key={s.label} item xs={12} sm={6} md={4}>
            <Stat value={s.value} label={s.label} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Button variant="contained" component={RouterLink} to="/projects">
          View Projects
        </Button>
        <Button variant="outlined" href={site.contact.resumeUrl}>
          Download Resume
        </Button>
      </Stack>

      <Box id="about" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>About</Typography>
        <Typography color="text.secondary">
          {hero.summary}
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>Skills</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {skills.primary.map((s) => (
            <Button key={s} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }}>{s}</Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Featured Architecture</Typography>
        <ArchitectureDiagram steps={projects.find(p => p.featured)?.architecture} />
      </Box>

      <Box id="contact" sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>Contact</Typography>
        <Typography>Email: {site.contact.email} • Phone: {site.contact.phone}</Typography>
      </Box>
    </Container>
  );
}
