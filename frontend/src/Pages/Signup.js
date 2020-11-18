import React from "react";
import { Box, Grommet } from "grommet";
import SignUpForm from "../Components/signUpForm";

function Signup() {
  return (
    <Grommet>
      <Box>
        <Box>
          <SignUpForm></SignUpForm>
        </Box>
      </Box>
    </Grommet>
  );
}

export default Signup;