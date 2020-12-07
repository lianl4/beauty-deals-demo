import React, { Component } from 'react';
import { upload } from '../util/API';
import { POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../Constants';
import './Upload.css';
import {Form, Input, Button, Icon, Select, notification, DatePicker, InputNumber } from 'antd';
import { Box } from "grommet";
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
                days: 7, // let's set the productLength by default to 7 for now
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
                this.props.history.push(`/product/${this.props.location.data.productDescription}`);
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
        <Box>
            <Box direction="row" pad="small">
                <Box direction="column" pad="small">
                    <FormItem className="poll-form-row">
                        <Box direction="row">
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
                        </Box>


                    </FormItem>
                    <FormItem  className="poll-form-row">
                        <h4>Seller</h4>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a seller"
                            optionFilterProp="children"
                            onChange={(selectValue) => {
                                const event = {
                                    target: {
                                        name: "seller",
                                        value: selectValue,
                                    }
                                };
                                props.handleChoiceChange(event, props.choiceNumber);
                            }}
                        >
                            <Option value="Nordstrom">NordStrom</Option>
                            <Option value="Sephora">Sephora</Option>
                            <Option value="Target">Target</Option>
                            <Option value="Ulta">Ulta</Option>
                            <Option value="Dermstore">Dermstore</Option>
                        </Select>
                    </FormItem>
                    <FormItem  className="poll-form-row">
                        <h4>Discount</h4>
                        <InputNumber
                            defaultValue={30}
                            min={0}
                            max={100}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={(number) => {
                                const event = {
                                    target: {
                                        name: "discount",
                                        value: number,
                                    }
                                };
                                props.handleChoiceChange(event, props.choiceNumber);
                            }}
                        />

                    </FormItem>
                </Box>
                <Box direction="column" pad="small">
                    <FormItem  className="poll-form-row">
                        <h4>Discount Price</h4>
                        <InputNumber
                            defaultValue={50}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={(number) => {
                                const event = {
                                    target: {
                                        name: "discountPrice",
                                        value: number,
                                    }
                                };
                                props.handleChoiceChange(event, props.choiceNumber);
                            }}
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
                </Box>
            </Box>
        </Box>
    );
}

export default Upload;
