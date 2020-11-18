import React, { Component } from 'react';
import { upload } from '../util/API';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../Constants';
import { Select, DateInput, Box, Form, FormField, Button, TextInput,Grommet,Heading } from 'grommet';
import { notification } from 'antd';

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            discount: {
                value: ''
            },
            seller: {
                value: ''
            },

            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const uploadRequest = {
            name: this.state.name.value,
            discount: this.state.discount.value,
            seller: this.state.seller.value,
        };
        upload(uploadRequest)
        .then(response => {
            notification.success({
                message: 'Beauty Deals',
                description: "Thank you! You're successfully uploaded",
            });          
            this.props.history.push("/");
        }).catch(error => {
            notification.error({
                message: 'Beauty Deals',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    };
/*
    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }
*/
    
    render() {
        return (
            <Box align="center" justify="center" pad="xlarge" height="large" direction="column" gap="large">
                <Form onSubmit={()=>this.handleSubmit}>
                    <FormField 
                        label="Name"
                        validateStatus={this.state.name.validateStatus}
                        required="true"
                        help={this.state.name.errorMsg}>
                        <TextInput placeholder="Please input the item"  
                            name="name"
                            value={this.state.name.value} 
                            onChange={(event) => this.handleInputChange(event, this.validateName)}
                            />
                    </FormField>
                    <FormField label="Discount" 
                        hasFeedback
                        validateStatus={this.state.discount.validateStatus}
                        help={this.state.discount.errorMsg}>
                            <TextInput placeholder="Please input the discount(e.g. 20=20% off)" 
                            name = "discount"
                            onChange={(event) => this.handleInputChange(event, this.validateDiscount)}
                            value={this.state.discount.value}/>
                    </FormField>
                    <FormField label="Seller"
                        hasFeedback
                        validateStatus={this.state.seller.validateStatus}
                        help={this.state.seller.errorMsg}>
                            <TextInput placeholder="Please input the Seller"
                            name = "seller"
                            value={this.state.seller.value}
                            onChange={(event) => this.handleInputChange(event, this.validateSeller)} />
                    </FormField>
                    <FormField label="Date">
                        <DateInput format="mm/dd/yyyy" inline={false} />
                    </FormField>
                    <Select options={["option 1","option 2"]} placeholder="Brand" searchPlaceholder="Search for a Brand" />
                    <Select options={["option 1","option 2"]} placeholder="Category" searchPlaceholder="Search for a category" />
            </Form>
            <Button label="Upload" size="large" color="graph-1" type="submit"/>
            </Box>
        );
    }

    validateName = (name) => {
        if(name.length <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `Name may not be empty`
            }
        }
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    validateDiscount = (discount) => {
        if(!isNaN(discount)) {
            return {
                validateStatus: 'error',
                errorMsg: `Please input a proper number`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
    validateSeller = (seller) => {
        if(seller.length <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `Seller may not be empty`
            }
        }
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
}

export default UploadForm;
