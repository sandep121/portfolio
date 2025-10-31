import { Paper, Typography } from "@mui/material";

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography variant="h5" fontWeight={700}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Paper>
  );
}
