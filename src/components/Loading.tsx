import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item 
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box 
          px = {
            3
          }
          py = {
            .5
          }
          sx = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid rgb(39,114,185)",
            borderRadius: ".5em",
            gap: '1em'
          }}
        >
          <CircularProgress />
          <Typography>Cargando</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Loading;
