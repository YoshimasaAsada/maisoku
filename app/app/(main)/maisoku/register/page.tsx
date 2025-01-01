"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { registerMaisoku } from "./actions";

export default function RegisterMaisokuPage() {
  const [postalcode, setPostalcode] = useState("");
  const [address, setAddress] = useState("");

  const handlePostalcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalcode(e.target.value);
  };

  // 郵便番号から住所を検索する関数
  const searchAddress = async () => {
    if (!postalcode) {
      alert("郵便番号を入力してください");
      return;
    }

    try {
      const response = await fetch(
        `https://zip-cloud.appspot.com/api/search?zipcode=${postalcode}`
      );
      const data = await response.json();

      if (data?.results) {
        const result = data.results[0];
        setAddress(`${result.address1}${result.address2}${result.address3}`);
      } else {
        alert("住所が見つかりませんでした。");
        setAddress("");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("住所の検索に失敗しました。");
    }
  };

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
        マイソク登録
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          id="postalCode"
          name="postalCode"
          type="text"
          label="郵便番号"
          value={postalcode}
          onChange={handlePostalcodeChange}
          variant="outlined"
          required
          fullWidth
        />
        <Button variant="contained" onClick={searchAddress}>
          検索
        </Button>
      </Box>

      <TextField
        id="address"
        name="address"
        type="text"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        required
        fullWidth
      />

      <Button
        formAction={registerMaisoku}
        variant="outlined"
        color="secondary"
        type="submit"
        fullWidth
      >
        登録
      </Button>
    </Box>
  );
}
