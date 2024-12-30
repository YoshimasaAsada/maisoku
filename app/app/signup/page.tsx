import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { signup } from "./actions";

export default function SignUpPage() {
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
        SignUp
      </Typography>

      <TextField
        id="name"
        name="name"
        type="name"
        label="Name"
        variant="outlined"
        required
        fullWidth
      />

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
