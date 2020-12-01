import React, { Component } from "react";
import {Button} from "grommet";
import { Favorite} from 'grommet-icons'
import {  notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { addFavorite } from "../util/API";

class AddFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealId: {
                value: ''
            }
        };
    }

    handleClick() {
        
           const data = {
           dealId:this.props.dealId.id,
       
       }
      
       const productId=this.props.productId.id;
       
    addFavorite(data,productId).then(
        response => {
            notification.success({
                message: 'Beauty Deals',
                description: "Thank you! You have added it to the favorites",
            });          
        }).catch(error => {
            
                notification.error({
                    message: 'Beauty Deals',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            
        
    })
    }
    
  


    render() {
        return (
            <Button
              icon={<Favorite color="red" />}
              onClick={this.handleClick.bind(this)}
        />
        );
    }

}

export default withRouter(AddFavorite);