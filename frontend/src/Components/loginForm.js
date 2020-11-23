import React, { Component } from 'react';
import { login } from '../util/API';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../Constants';
import { Form, Input, Button, notification } from 'antd';
import { Anchor, Grommet, Header, Nav, Box } from 'grommet'
import { Login,Home } from 'grommet-icons'
const FormItem = Form.Item;

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

class Signin extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <Grommet full theme={theme}>
            
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
            </Grommet>
        );
    }
} 
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Beauty Deals',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Beauty Deals!!!',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={(event)=>this.handleSubmit(event)} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: '(Please input your username or email!)' }],
                    })(
                    <Input 
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Username or Email" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '(Please input your Password!)' }],
                })(
                    <Input 
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Signin;