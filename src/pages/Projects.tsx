import { Container, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import { projects } from "../constants/projects.ts";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";

export default function Projects() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Projects</Typography>
      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid size={{ xs: 24, md: 12 }} key={p.slug}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h5">{p.title}</Typography>
              <Typography variant="body2" color="text.secondary">{p.timeframe} • {p.role}</Typography>
              <Typography sx={{ mt: 1 }}>{p.overview}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {p.stack.map((s) => <Chip key={s} size="small" label={s} />)}
              </Stack>
              <ul>
                {p.highlights.map((h, i) => <li key={i}><Typography variant="body2">{h}</Typography></li>)}
              </ul>
              <ArchitectureDiagram steps={p.architecture} />
              {/*<Stack direction="row" spacing={2} sx={{ mt: 1 }}>*/}
              {/*  {p.links?.map((l) => <Link key={l.label} href={l.url} target="_blank" rel="noreferrer">{l.label}</Link>)}*/}
              {/*</Stack>*/}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
