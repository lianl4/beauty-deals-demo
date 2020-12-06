import React, { Component } from "react";
import {
    DataTable,
    Text,
    Image,
    Box,
    Grommet,
    Main,
  } from "grommet";
import {getSearchResult} from "../util/API";
import ProductCell from "../Components/productCell";
import { theme } from "../Constants";

const columns = [
    {
        property: 'image',
        header: <Text>Product</Text>,
        render: data => (
            <Image
                src={data.image_link}
                fit="cover"
            />
        ),
        size: "medium",
    },
    {
        property: 'name',
        header: <Text>Name</Text>,
        primary: true,
        render: data => (
            <ProductCell
                product={data}
            />
        )
    },
    {
        property: 'brand',
        header: <Text>Brand</Text>,
    },
    {
        property: 'product_type',
        header: <Text>Category</Text>,
    },
    {
        property: 'description',
        header: <Text>Description</Text>,
        render: data => (
            <Text size="small">{data.description}
            </Text>
        )
    },
];

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        const newBrand = this.props.location.pathname.split(":")[1];
        const newCategory = this.props.location.pathname.split(":")[3];
        getSearchResult(newBrand, newCategory)
            .then(response => {
                this.setState({
                    products: response.data,
                });
            });
    }

    render() {
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex="grow" overflow="auto">
                    <Box align="center" justify="start" pad="xlarge" height="large">
                        <DataTable
                            columns={columns}
                            data={this.state.products}
                        >
                        </DataTable>
                    </Box>
                </Main>
            </Grommet>
        )
    }
}
export default SearchResult;