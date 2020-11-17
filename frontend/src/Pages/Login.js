import React from "react";
import { Box, Grommet } from "grommet";
import Login from "../Components/loginForm"

function Signin() {
  return (
    <Grommet>
      <Box>
        <Box>
          <Login></Login>
        </Box>
      </Box>
    </Grommet>
  );
}

export default Signin;