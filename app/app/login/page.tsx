import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: 1,
        borderRadius: 2,
        borderColor: "grey.300",
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Login
      </Typography>

      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        variant="outlined"
        required
        fullWidth
      />

      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        required
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        formAction={login}
        type="submit"
        fullWidth
      >
        Log in
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        formAction={signup}
        type="submit"
        fullWidth
      >
        Sign up
      </Button>
    </Box>
  );
}
