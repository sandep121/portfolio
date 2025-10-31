import { Box, Chip, Stack } from "@mui/material";

export function ArchitectureDiagram({ steps }: { steps?: string[] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      {steps.map((s, i) => (
        <Stack key={i} direction="row" alignItems="center" spacing={1}>
          <Chip color="primary" variant="outlined" label={s} />
          {i < steps.length - 1 && <Box sx={{ width: 24, height: 2, bgcolor: "primary.main", opacity: 0.6 }} />}
        </Stack>
      ))}
    </Stack>
  );
}
