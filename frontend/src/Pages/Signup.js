import React from "react";
import { Anchor, Grommet, Main, Header, Nav, Tabs, Tab, Box, Button, Heading, Select, TextInput, Footer } from 'grommet'
import { Login,Home, Favorite, UploadOption, Mail, Phone, Github, HelpOption } from 'grommet-icons'
import { Link, useHistory } from "react-router-dom";
import SignUpForm from "../Components/signUpForm";

const theme = {
  "global": {
    "colors": {
      "background": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "font": {
      "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
    }
  },
  "button": {
    "extend": [
      null
    ]
  }
}
function Signup() {
  const history = useHistory();
  return (
    <Grommet full theme={theme}>
      <Header align="center" direction="row" justify="between" gap="small" background={{"opacity":"strong","color":"text-strong"}} pad={{"horizontal":"xsmall","vertical":"medium"}} flex="grow" fill="horizontal" overflow="auto">
          <Nav align="center" flex={false} justify="end">
          <Box align="end" justify="center" direction="row" gap="medium" alignSelf="end">
            <Anchor label="Home" icon={<Home />} size="medium"
            onClick={()=> history.push("/") } />
            <Anchor label="Sign In/Up" icon={<Login />} size="medium" 
            onClick={()=> history.push("/signup") }/>
          </Box>
          </Nav>
          </Header>
          <SignUpForm></SignUpForm>
    </Grommet>
  );
}

export default Signup;