import React, { Component } from "react";
import {Anchor} from "grommet";
import { withRouter } from 'react-router-dom';

class ProductCell extends Component {
    constructor(props) {
        super(props);
        this.props = {
            product: null,
        };
    }

    handleClick() {
        this.props.history.push({
            pathname: `/product/${this.props.product.id}`,
            data: {
                product: this.props.product,
            }
        });
    }

    render() {
        return (
            <Anchor
                label={this.props.product.name}
                onClick={this.handleClick.bind(this)}
            />
        );
    }

}

export default withRouter(ProductCell);