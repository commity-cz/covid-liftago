import {Box, CircularProgress} from "@material-ui/core";
import React from "react";

function CenteredCircularProgress() {
  return (
    <Box display="flex">
      <Box m="auto">
        <CircularProgress/>
      </Box>
    </Box>
  );
}

export default CenteredCircularProgress;
