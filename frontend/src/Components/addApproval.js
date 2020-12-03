import React, { Component } from "react";
import { Button } from "grommet";
import { Add} from 'grommet-icons'
import {  notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { addApproval } from "../util/API";

class AddApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealId: {
                value: ''
            },
            approveAccount : this.props.dealId.approvalCount,
    }
}

    handleClick() {
        const productId=this.props.productId.id;
        const data = {
           dealId:this.props.dealId.id,
           productId: productId,
       }
       
       addApproval(data,productId).then(
        response => {
            notification.success({
                message: 'Beauty Deals',
                description: "Thank you! You have successfully approved",
            });   
            this.setState({
                approveAccount : ++this.state.approveAccount
            })
        }).catch(error => {
            
                notification.error({
                    message: 'Beauty Deals',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
        })
    }

    render() {
        const label = this.state.approveAccount?this.state.approveAccount:"0"
        return (
        
            <Button
              icon={<Add color="red" />}
              onClick={this.handleClick.bind(this)}
              label = {label}
              hoverIndicator 
              color="accent-4" 
            />
        );
    }
}

export default withRouter(AddApproval);