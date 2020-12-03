import React, { Component } from "react";
import {
    DataTable,
    Text,
    Box,
    Grommet,
    Main,
    Card,
    CardBody,
    CardHeader
  } from "grommet";
import { getFavorite } from "../util/API";
import { theme } from "../Constants";

function AddData(props){
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
  return(

    <DataTable
          columns={columns}
          data={props.datas}
          gap = "large"
      >
    </DataTable>

  )
}
class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDescription: []
        }
    }

    componentDidMount() {
        const userId = this.props.currentUser.username;
       let productName = [];
        getFavorite(userId)
            .then(response => {
                this.setState({
                    products: response.data,
                })
        });
  
    }
    render() {
      if(this.state.products.content){
      const data = this.state.products.content;
      const datas = []
      this.state.products.content.forEach(
        deal=>{datas.push(deal.deals[0])
      
          })
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex="grow" overflow="auto">
                <Box align="center" justify="start" pad="xlarge" height="large">
                <Card>
                    <CardHeader pad="medium" align = 'center' justify="center" background="light-2">
                              <h2>Favorite Deals</h2>
                    </CardHeader>
                    <CardBody pad="medium" direction="column" align="stretch" gap="large" overflow = "scroll">
                    <Box align="center" justify="start" height="large" direction = "row">
                        <AddData datas = {datas}/>
                    </Box>
                    </CardBody>
                    </Card>
                  </Box>
                </Main>
            </Grommet>
        )}
        else{
          return (
            <Grommet full theme={theme}>
            <Main fill="vertical" flex="grow" overflow="auto">
                <Box align="center" justify="start" pad="xlarge" height="large">
                    You have no favorite deals!
                </Box>
            </Main>
        </Grommet>
          )
        }
    }
}
export default Favorites;