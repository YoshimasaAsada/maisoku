"use client";
import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h1>Topページ</h1>
          </Box>
        </main>
      </div>
    </>
  );
}
