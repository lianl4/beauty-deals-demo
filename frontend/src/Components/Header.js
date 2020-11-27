import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Anchor, Header, Nav, Box } from 'grommet'
import { Login,Home, Favorite, UploadOption } from 'grommet-icons'
    
class Headers extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }
    handleMenuClick() {
          this.props.onLogout();
      }
    render() {
        let menuItems;
        if(!this.props.currentUser) {
        menuItems = [
        <Header align="center" direction="row" justify="between" gap="small" background={{"image":"url('')","color":"active-text"}} pad={{"horizontal":"xsmall","vertical":"medium"}} flex="grow" fill="horizontal" overflow="auto">
          <Nav align="center" flex={false} justify="end">
          <Box align="end" justify="center" direction="row" gap="medium" alignSelf="end">
          <Anchor label="Home" icon={<Home />} size="medium"
            onClick={()=> this.props.history.push("/") } />
            <Anchor label="Sign In/Up" icon={<Login />} size="medium" 
            onClick={()=> this.props.history.push("/signup") }/>
          </Box>
          </Nav>
        </Header>
          ]; 
        } else {
          menuItems = [
        <Header align="center" direction="row" justify="between" gap="small" background={{"image":"url('')","color":"active-text"}} pad={{"horizontal":"xsmall","vertical":"medium"}} flex="grow" fill="horizontal" overflow="auto">
          <Nav align="center" flex={false} justify="end">
          <Box align="end" justify="center" direction="row" gap="medium" alignSelf="end">
            <Anchor label="Home" icon={<Home />} size="medium"
            onClick={()=> this.props.history.push("/") } />
            <Anchor label="Favorite" icon={<Favorite />} size="medium" 
            onClick={()=>this.props.history.push('/favorite')}/>
            <Anchor label="Logout" icon={<Login />} size="medium" 
            onClick={()=>this.handleMenuClick()}/>
          </Box>
          </Nav>
        </Header>
          ];
        }

        return (
                  menuItems
        );
    }
}


export default withRouter(Headers);