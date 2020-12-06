import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import SignUpForm from '../Components/signUpForm';
import Signin from '../Components/loginForm';
import Upload from '../Components/uploadForm';
import Headers from '../Components/Header';
import HomePage from "../Pages/home";
import SearchResult from '../Pages/searchResult';
import ProductDetail from "../Pages/productDetail";
import Favorites from '../Pages/favorite';
import { getCurrentUser } from '../util/API';
import { ACCESS_TOKEN } from '../Constants';
import { notification } from 'antd';
import { theme } from "../Constants";

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
      message: 'Beauty Deals',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Beauty Deals',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    
    return (
          <Grommet full theme={theme}>
            <Headers currentUser={this.state.currentUser} 
              onLogout={this.handleLogout}/>
            <Box>
                <Switch>
                  <Route exact path="/"  
                  render={(props) => <HomePage
                      currentUser={this.state.currentUser} {...props} />}></Route>
                  <Route path="/brand::brand:category::category" component={SearchResult}></Route>
                  <Route path="/favorite" 
                  render={(props) => <Favorites
                      currentUser={this.state.currentUser} {...props} />}></Route>
                  <Route path="/signup" component={SignUpForm}></Route>
                  <Route path="/login"
                         render={(props) => <Signin onLogin={this.handleLogin} {...props} />}
                  ></Route>
                  <Route path="/upload" component={Upload} ></Route>
                  <Route exact path="/product" component={ProductDetail} />
                  <Route exact path="/product/:id" component={ProductDetail} />
                </Switch>
            </Box>
          </Grommet>
    );
  }
}

export default withRouter(App);
