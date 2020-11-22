import React, { Component } from 'react';
import { upload } from '../util/API';
import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../Constants';
import './Upload.css';  
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDescription: {
                text: ''
            },
            deals: [{
                dealDescription: ''
            }, {
                dealDescription: ''
            },{
                dealDescription: ''
            },],
            productLength: {
                days: 1,
                hours: 0
            }
        };
        this.addChoice = this.addChoice.bind(this);
        this.removeChoice = this.removeChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handlePollDaysChange = this.handlePollDaysChange.bind(this);
        this.handlePollHoursChange = this.handlePollHoursChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    addChoice(event) {
        const deals = this.state.deals.slice();        
        this.setState({
            deals: deals.concat([{
                dealDescription: ''
            }])
        });
    }

    removeChoice(choiceNumber) {
        const deals = this.state.deals.slice();
        this.setState({
            deals: [...deals.slice(0, choiceNumber), ...deals.slice(choiceNumber+1)]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const pollData = {
            productDescription: this.state.productDescription.text,
            deals: this.state.deals.map(choice => {
                return {dealDescription: choice.dealDescription} 
            }),
            productLength: this.state.productLength
        };

        upload(pollData)
        .then(response => {
            notification.success({
                message: 'Beauty Deals',
                description: "Thank you! You have successfully uploaded",
            });          
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');    
            } else {
                notification.error({
                    message: 'Beauty Deals',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }

    validateQuestion = (productDescriptionText) => {
        if(productDescriptionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your productDescription!'
            }
        } else if (productDescriptionText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Description is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleQuestionChange(event) {
        const value = event.target.value;
        this.setState({
            productDescription: {
                text: value,
                ...this.validateQuestion(value)
            }
        });
    }

    validateChoice = (choiceText) => {
        if(choiceText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a Deal!'
            }
        } else if (choiceText.length > POLL_CHOICE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Deals is too long (Maximum ${POLL_CHOICE_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleChoiceChange(event, index) {
        const deals = this.state.deals.slice();
        const value = event.target.value;

        deals[index] = {
            dealDescription: value,
            ...this.validateChoice(value)
        }

        this.setState({
            deals: deals
        });
    }


    handlePollDaysChange(value) {
        const productLength = Object.assign(this.state.productLength, {days: value});
        this.setState({
            productLength: productLength
        });
    }

    handlePollHoursChange(value) {
        const productLength = Object.assign(this.state.productLength, {hours: value});
        this.setState({
            productLength: productLength
        });
    }

    isFormInvalid() {
        if(this.state.productDescription.validateStatus !== 'success') {
            return true;
        }
    
        for(let i = 0; i < this.state.deals.length; i++) {
            const choice = this.state.deals[i];            
            if(choice.validateStatus !== 'success') {
                return true;
            }
        }
    }

    render() {
        const choiceViews = [];
        this.state.deals.forEach((choice, index) => {
            choiceViews.push(<PollChoice key={index} choice={choice} choiceNumber={index} removeChoice={this.removeChoice} handleChoiceChange={this.handleChoiceChange}/>);
        });

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Upload New Deals!</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.productDescription.validateStatus}
                            help={this.state.productDescription.errorMsg} className="poll-form-row">
                        <h3>Product Description</h3>
                        <TextArea 
                            title = "Product Description"
                            placeholder="Enter your productDescription"
                            style = {{ fontSize: '16px' }} 
                            autosize={{ minRows: 3, maxRows: 6 }} 
                            name = "productDescription"
                            value = {this.state.productDescription.text}
                            onChange = {this.handleQuestionChange} />
                        </FormItem>
                        {choiceViews}
                        <FormItem className="poll-form-row">
                            <Col xs={24} sm={6}>
                                Product length: 
                            </Col>
                            <Col xs={24} sm={17}>    
                                <span style = {{ marginRight: '18px' }}>
                                    <Select 
                                        name="days"
                                        defaultValue="1" 
                                        onChange={this.handlePollDaysChange}
                                        value={this.state.productLength.days}
                                        style={{ width: 60 }} >
                                        {
                                            Array.from(Array(8).keys()).map(i => 
                                                <Option key={i}>{i}</Option>                                        
                                            )
                                        }
                                    </Select> &nbsp;Days
                                </span>
                                <span>
                                    <Select 
                                        name="hours"
                                        defaultValue="0" 
                                        onChange={this.handlePollHoursChange}
                                        value={this.state.productLength.hours}
                                        style={{ width: 60 }} >
                                        {
                                            Array.from(Array(24).keys()).map(i => 
                                                <Option key={i}>{i}</Option>                                        
                                            )
                                        }
                                    </Select> &nbsp;Hours
                                </span>
                            </Col>
                        </FormItem>
                        <FormItem>
             
             <span style = {{ marginRight: '18px' }}>
                         <Select 
                             name="Brand"
                             showSearch
                             placeholder="Brand"
                             style={{ width: 200 }} >
                             
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                             
                         </Select>
                     </span>
                     <span>
                         <Select 
                             name="Category"
                             showSearch
                             placeholder="Category"
                             style={{ width: 200 }} >
                             
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                             
                         </Select>
                     </span>
                    
             </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Upload</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

function PollChoice(props) {
    return (
        <FormItem validateStatus={props.choice.validateStatus}
        help={props.choice.errorMsg} className="poll-form-row">
            <Input 
                placeholder = {'Deal Description ' + (props.choiceNumber + 1)}
                size="large"
                value={props.choice.dealDescription} 
                className={ props.choiceNumber > 1 ? "optional-choice": null}
                onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)} />
        </FormItem>
    );
}


export default Upload;