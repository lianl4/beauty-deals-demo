import React, { Component } from 'react';
import { upload } from '../util/API';
import { POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../Constants';
import './Upload.css';
import {Form, Input, Button, Icon, Select, Col, notification, DatePicker } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {

            productDescription:{
                text:''
            },

            deals: [{
                dealDescription: '',
                seller: '',
                discount: '',
                discountPrice:'',
                startDate:'',
                expireDate:''
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

            productDescription: this.props.location.data.productDescription,
            deals: this.state.deals.map(choice => {
                return {dealDescription: choice.dealDescription,
                    seller: choice.seller,
                    discount:choice.discount,
                    discountPrice:choice.discountPrice,
                    startDate:choice.startDate,
                    expireDate:choice.expireDate
                }
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
        const inputName = event.target.name
        const value = event.target.value;
        console.log( inputName +  ": " + value);
        deals[index] = {
            dealDescription: deals[index]['dealDescription'],
            seller: deals[index]['seller'],
            discount: deals[index]['discount'],
            discountPrice: deals[index]['discountPrice'],
            startDate: deals[index]['startDate'],
            expireDate: deals[index]['expireDate'],
            [inputName]:value,
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

                        {choiceViews}
                        <FormItem className="poll-form-row">
                            <Button type="dashed" onClick={this.addChoice} disabled={this.state.deals.length === 10}>
                                <Icon type="plus" /> Add a choice
                            </Button>
                        </FormItem>
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
        <FormItem className="poll-form-row">

            <FormItem className="poll-form-row">
                <h4>Deal Description</h4>
                <TextArea
                    title = "Deal Description"
                    placeholder="Please enter your deal description"
                    style = {{ fontSize: '16px' }}
                    autosize={{ minRows: 3, maxRows: 6 }}
                    name = "dealDescription"
                    value = {props.choice.dealDescription}
                    onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)}
                />

            </FormItem>
            <FormItem  className="poll-form-row">
                <h4>Seller</h4>
                <TextArea
                    title = "Seller"
                    placeholder="Please enter the seller"
                    style = {{ fontSize: '16px' }}
                    autosize={{ minRows: 3, maxRows: 6 }}
                    name = "seller"
                    value = {props.choice.seller}
                    onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)}
                />

            </FormItem>
            <FormItem  className="poll-form-row">
                <h4>Discount</h4>
                <TextArea
                    title = "Discount"
                    placeholder="Please enter the discount"
                    style = {{ fontSize: '16px' }}
                    autosize={{ minRows: 3, maxRows: 6 }}
                    name = "discount"
                    value = {props.choice.discount}
                    onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)}
                />

            </FormItem>
            <FormItem  className="poll-form-row">
                <h4>Discount Price</h4>
                <TextArea
                    title = "Discount Price"
                    placeholder="Please enter the discount price"
                    style = {{ fontSize: '16px' }}
                    autosize={{ minRows: 3, maxRows: 6 }}
                    name = "discountPrice"
                    value = {props.choice.discountPrice}
                    onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)}
                />

            </FormItem>
            <FormItem  className="poll-form-row">
                <h4>Start Date</h4>
                <DatePicker onChange={(event, dateString) => {
                    event.target = {
                        name: "startDate",
                        value: dateString,
                    };
                    props.handleChoiceChange(event, props.choiceNumber);
                }}
                />
            </FormItem>
            <FormItem  className="poll-form-row">
                <h4>Expire Date</h4>
                <DatePicker onChange={(event, dateString) => {
                    event.target = {
                        name: "expireDate",
                        value: dateString,
                    };
                    props.handleChoiceChange(event, props.choiceNumber);
                }}
                />
            </FormItem>
            {
                props.choiceNumber > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="close"
                        disabled={props.choiceNumber <= 1}
                        onClick={() => props.removeChoice(props.choiceNumber)}
                    /> ): null
            }
        </FormItem>
    );
}


export default Upload;
