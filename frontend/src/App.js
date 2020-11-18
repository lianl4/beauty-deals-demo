import React from 'react'
import { Link, useHistory,Switch, Route,BrowserRouter } from "react-router-dom";
import { Grommet, Main, Header, Nav, Tabs, Tab, Box, Button, Heading, Select, TextInput, Footer } from 'grommet'
import HomePage from "./Pages/home"
import SearchResult from './Pages/searchResult';
import Signup from './Pages/signup';
import Signin from './Pages/login';
import Upload from './Pages/upload';

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
export default () => {
    
  return (
    <Grommet full theme={theme}>
      <Box>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/search-result" component={SearchResult} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Signin} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </BrowserRouter>
      </Box>
    </Grommet>
  );
}
