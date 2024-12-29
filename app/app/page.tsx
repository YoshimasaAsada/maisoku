"use client";
import styles from "./page.module.css";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <TextField
            label="Example"
            defaultValue="test"
            {...register("example")}
            fullWidth
          />

          <TextField
            label="Example Required"
            {...register("exampleRequired", {
              required: "This field is required",
            })}
            error={!!errors.exampleRequired}
            helperText={errors.exampleRequired?.message}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          ></Button>
        </Box>
      </main>
      <footer className={styles.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 maisoku
        </Typography>
      </footer>
    </div>
  );
}
