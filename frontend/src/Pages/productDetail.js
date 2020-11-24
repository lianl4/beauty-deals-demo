import React, { Component } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Main,
    Box,
    List,
    Grommet,
    Image,
} from "grommet";
import { Favorite, ShareOption } from 'grommet-icons'
import {getProductById} from "../util/API";
import { theme } from "../Constants";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        getProductById(id)
            .then(response => {
                this.setState({
                    product: response.data,
                });
            });
    }

    render() {
        const product = this.state.product;
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex="grow" overflow="auto">
                    <Box align="center" justify="start" pad="xlarge" height="large">
                        <Card>
                            <CardHeader pad="medium">Product Description {this.props.match.params.id}</CardHeader>
                            <CardBody pad="medium" direction="row-responsive" justify="center" align="stretch" gap="medium">
                                <Image src={product.image_link} />
                                <List
                                    primaryKey="attribute"
                                    secondaryKey="value"
                                    data={[
                                        { attribute: 'Name', value: product.name },
                                        { attribute: 'Brand', value: product.brand },
                                        { attribute: 'Category', value: product.product_type },
                                        { attribute: 'Suggest Price', value: "$" + product.price },
                                    ]}
                                />
                            </CardBody>
                            <CardFooter pad={{horizontal: "small"}} background="light-2">
                                <Button
                                    icon={<Favorite color="red" />}
                                    hoverIndicator
                                />
                                <Button icon={<ShareOption color="plain" />} hoverIndicator />
                            </CardFooter>
                        </Card>
                    </Box>
                </Main>
            </Grommet>

        );
    }
}

export default ProductDetail;