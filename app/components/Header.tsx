import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/logout/actions";

export default async function Header() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
  }
  return (
    <>
      {data.user ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Maisoku
                </Typography>
                <Button color="inherit" href="/maisoku">
                  MaisokuAll
                </Button>
                <Button color="inherit" href="/maisoku/register">
                  マイソク登録
                </Button>
                <Button color="inherit" onClick={logout}>
                  ログアウト
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Maisoku
                </Typography>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/signup">
                  Signup
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      )}
    </>
  );
}
