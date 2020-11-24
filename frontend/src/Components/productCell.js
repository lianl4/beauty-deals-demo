import React, { Component } from "react";
import {Anchor} from "grommet";

class ProductCell extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props = {
            product: null,
            key: null,
        };
    }

    render() {
        return (
            <Anchor
                href={`https://beauty-deals.herokuapp.com/product/${this.props.product.id}`}
                label={this.props.product.name}
                onClick={
                    () => {
                        this.props.history.push({
                            pathname: `/product/${this.props.product.id}`,
                            data: {
                                product: this.props.product,
                            }
                        });
                    }
                }
            />
        );
    }

}

export default ProductCell;
