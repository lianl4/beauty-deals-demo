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
    Text,
    DataTable
} from "grommet";
import { Favorite, ShareOption,UploadOption} from 'grommet-icons'
import {getProductById,getDeals} from "../util/API";
import { theme } from "../Constants";
import Upload from "../Components/uploadForm"

const columns = [
    
    {
        property: 'dealDescription',
        header: <Text>Deal Description</Text>,
        render: data => (
            <Text size="medium">{data.dealDescription}
            </Text>
        )
    },
    {
        property: 'seller',
        header: <Text>Seller</Text>,
        render: data => (
            <Text size="medium">{data.seller}
            </Text>
        )
    },
    {
        property: 'discountPrice',
        header: <Text>Discount Price</Text>,
        render: data => (
            <Text size="medium">{data.discountPrice}
            </Text>
        )
    },
    {
        property: 'discount',
        header: <Text>Discount</Text>,
        render: data => (
            <Text size="medium">{data.discount}
            </Text>
        )
    },
    {
        property: 'startDate',
        header: <Text>Start Date</Text>,
        render: data => (
            <Text size="medium">{data.startDate}
            </Text>
        )
    },
    {
        property: 'expireDate',
        header: <Text>Expire Date</Text>,
        render: data => (
            <Text size="medium">{data.expireDate}
            </Text>
        )
    },
];

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            deals: [],
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
        
        getDeals().then(response => {
            this.setState({
                deals: response.data,
            });
        });
        
    }

    render() {
       
        const product = this.state.product;
        const deal = this.state.deals;
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex="grow" overflow="auto">
                    <Box align="center" justify="start" pad="xlarge" height="large">
                        <Card>
                            <CardHeader pad="medium">Product Description {this.props.match.params.id}</CardHeader>
                            <CardBody pad="medium" direction="column" justify="center" align="stretch" gap="large">
                            <Box align="center" justify="start" direction="row" height="large" gap = "large">
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
                            </Box>
                         <Box align="center" justify="start" height="large">
                        
                        <DataTable
                            columns={columns}
                            data={deal.deals}
                            align='center'
                        >
                            
                        </DataTable>
                   </Box>
                            </CardBody>
                            <CardFooter pad={{horizontal: "small"}} background="light-2">
                                <Button
                                    icon={<Favorite color="red" />}
                                    hoverIndicator
                                />
                                <Button icon={<UploadOption color="plain" />} hoverIndicator
                                
                                onClick={(props)=>{ 
                                
                                    this.props.history.push({
                                        pathname: `/upload`,
                                        data: {
                                            productDescription: this.props.match.params.id,
                                        }
                                    })} } />
                            </CardFooter>
                        </Card>
                    </Box>
                </Main>
            </Grommet>

        );
    }

};

export default ProductDetail;