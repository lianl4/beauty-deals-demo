import React, { Component } from "react";
import {
    Button,
    DataTable,
    Text,
    Image,
    Box,
    Grommet, Main, Nav, TextInput,
    Anchor,
    Header,
  } from "grommet";
import { Favorite,Login,Home } from "grommet-icons";
import {getSearchResult} from "../util/API";

const theme = {
  "global": {
    "colors": {
      "background": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "font": {
      "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
    }
  },
  "button": {
    "extend": [
      null
    ]
  }
}

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
        const brand = this.props.location.data.brand;
        const category = this.props.location.data.category;
        getSearchResult(brand, category)
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