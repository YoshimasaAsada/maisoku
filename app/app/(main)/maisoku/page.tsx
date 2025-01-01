import { createClient } from "@/utils/supabase/server";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();
  const maisoku = await supabase.from("maisoku").select();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          物件一覧
        </Typography>
        <Grid container spacing={2}>
          {maisoku?.data?.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Link href={`/maisoku/${m.id}`}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="body1" component="p">
                    〒{m.postal_code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.address}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
