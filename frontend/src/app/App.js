import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Grommet, Box } from 'grommet'
import HomePage from "../Pages/home"
import SearchResult from '../Pages/searchResult';
import SignUpForm from '../Components/signUpForm';
import Signin from '../Components/loginForm';
import Upload from '../Components/uploadForm';

import { getCurrentUser } from '../util/API';
import { ACCESS_TOKEN } from '../Constants';
import { notification } from 'antd';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    return (
          <Grommet full theme={theme}>
            <Box>
              
                <Switch>
                  <Route exact path="/" component={HomePage}></Route>
                  <Route path="/search-result" component={SearchResult}></Route>
                  <Route path="/signup" component={SignUpForm}></Route>
                  <Route path="/login"
                         render={(props) => <Signin onLogin={this.handleLogin} {...props} />}
                  ></Route>
                  <Route path="/upload" component={Upload} ></Route>
                </Switch>
              
            </Box>
          </Grommet>
    );
  }
}

export default withRouter(App);
