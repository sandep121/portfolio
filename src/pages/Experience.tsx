import { Container, Paper, Stack, Typography, Chip } from "@mui/material";
import { experience } from "../constants/experienceReport.ts";

export default function Experience() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Experience</Typography>
      <Stack spacing={3}>
        {experience.map((e, idx) => (
          <Paper key={idx} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6">{e.title} • {e.company}</Typography>
            <Typography variant="body2" color="text.secondary">{e.start} — {e.end}</Typography>
            <ul>
              {e.bullets.map((b, i) => <li key={i}><Typography variant="body2">{b}</Typography></li>)}
            </ul>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {e.tech.map((t) => <Chip key={t} size="small" label={t} />)}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
